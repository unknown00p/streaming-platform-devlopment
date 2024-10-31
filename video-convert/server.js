import { S3Client, ListBucketsCommand, PutObjectCommand, GetObjectCommand } from "@aws-sdk/client-s3"
import { Upload } from '@aws-sdk/lib-storage'
import { getSignedUrl } from "@aws-sdk/s3-request-presigner"
import dotenv from "dotenv"
import { Worker } from "bullmq"
import ffmpeg from "fluent-ffmpeg"
import path from "path"
import { v4 as uuidv4 } from 'uuid'
import fs from 'fs/promises'
import { createReadStream, existsSync, createWriteStream } from 'fs'
import { PassThrough } from 'stream'
import { fileURLToPath } from 'url';
// console.log(numCors);

dotenv.config({
    path: ".env"
})

const credentials = {
    accessKeyId: process.env.TEBI_ACCESSKEY_ID,
    secretAccessKey: process.env.TEBI_SECRET_ACCESSKEY_ID,
}

const s3Client = new S3Client({
    endpoint: "https://s3.tebi.io",
    credentials: credentials,
    region: "global"
})

console.log("running...");

const myQueue = new Worker("comunication", async (job) => {
    let outputDir;
    try {
        const videoKey = job.data.key;

        const get_cmd = new GetObjectCommand({
            Bucket: process.env.TEBI_TEMPORARY_BUCKET_NAME,
            Key: videoKey,
            ResponseContentDisposition: "inline",
        })

        const url = await getSignedUrl(s3Client, get_cmd)

        if (!url) {
            throw new Error('Failed to get signed URL');
        }

        const location = uuidv4()
        outputDir = `./output/${videoKey}`

        const output1080pDir = `${outputDir}/1080p`
        const output720pDir = `${outputDir}/720p`
        const output480pDir = `${outputDir}/480p`
        const output320pDir = `${outputDir}/320p`

        function makeFiles(DirPath) {
            if (!existsSync(DirPath)) {
                fs.mkdir(DirPath, { recursive: true })
            }
        }

        makeFiles(output1080pDir)
        makeFiles(output720pDir)
        makeFiles(output480pDir)
        makeFiles(output320pDir)

        async function ffmpegPromise(videoUrl, outputDir, hlsTime, size, audioBitrate, videoBitrate, segments) {

            return new Promise((resolve, reject) => {
                ffmpeg(videoUrl)
                    .output(outputDir)
                    .format('hls')
                    .videoCodec('libx264')
                    .audioCodec('aac')
                    .addOption('-hls_time', hlsTime)
                    .addOption('-hls_playlist_type', 'vod')
                    .size(size)
                    .audioBitrate(audioBitrate)
                    .videoBitrate(videoBitrate)
                    .outputOptions('-hls_segment_filename', segments)
                    .on('end', function () {
                        console.log(`Stream for ${size} created successfully.`);
                        resolve(`Success: ${size}`);
                    })
                    .on('error', function (err) {
                        console.error('Error during 1080p FFmpeg conversion:', err);
                        throw new Error(err)
                    })
                    .run()

            })

        }

        const allQualities = [
            {
                outputDir: `${output1080pDir}/1080p_index.m3u8`, hlsTime: 4, size: '1920x1080', audioBitrate: '192k', videoBitrate: '3000k', segments: `${output1080pDir}/${location}_1080p_segment%03d.ts`
            },
            {
                outputDir: `${output720pDir}/720p_index.m3u8`, hlsTime: 6, size: '1280x720', audioBitrate: '120k', videoBitrate: '1600k', segments: `${output720pDir}/${location}_720p_segment%03d.ts`
            },
            {
                outputDir: `${output480pDir}/480p_index.m3u8`, hlsTime: 8, size: '854x480', audioBitrate: '96k', videoBitrate: '1000k', segments: `${output480pDir}/${location}_480p_segment%03d.ts`
            },
            {
                outputDir: `${output320pDir}/320p_index.m3u8`, hlsTime: 10, size: '480x320', audioBitrate: '64k', videoBitrate: '500k', segments: `${output320pDir}/${location}_320p_segment%03d.ts`
            }
        ];

        const response = await Promise.all(
            allQualities.map(quality =>
                ffmpegPromise(url, quality.outputDir, quality.hlsTime, quality.size, quality.audioBitrate, quality.videoBitrate, quality.segments
                )
            ))

        if (response) {
            console.log('completed');
            console.log(response);
        }

        const __filename = fileURLToPath(import.meta.url);
        const __dirname = path.dirname(__filename);

        async function createMasterPlaylist() {
            const masterPlaylistContent =
                `
                        #EXTM3U
                        #EXT-X-VERSION:3
                        #EXT-X-TARGETDURATION:10
                        #EXT-X-MEDIA-SEQUENCE:0

                        # 1080p Stream
                        #EXT-X-STREAM-INF:BANDWIDTH=3000000,RESOLUTION=1920x1080
                        1080p/1080p_index.m3u8

                        # 720p Stream
                        #EXT-X-STREAM-INF:BANDWIDTH=1600000,RESOLUTION=1280x720
                        720p/720p_index.m3u8

                        # 480p Stream
                        #EXT-X-STREAM-INF:BANDWIDTH=1000000,RESOLUTION=854x480
                        480p/480p_index.m3u8

                        # 320p Stream
                        #EXT-X-STREAM-INF:BANDWIDTH=500000,RESOLUTION=480x320
                        320p/320p_index.m3u8

                `

            const masterPlaylistPath = path.join(outputDir, 'master.m3u8')

            await fs.writeFile(masterPlaylistPath, masterPlaylistContent.trim())
        }

        await createMasterPlaylist()

        async function uploadFileToS3(filePath, s3Key) {
            try {
                const fileStream = createReadStream(filePath);

                const contentType = filePath.endsWith('.m3u8') ? 'application/x-mpegURL' : 'video/MP2T';

                const upload = new Upload({
                    client: s3Client,
                    params: {
                        Bucket: process.env.TEBI_HLS_BUCKET_NAME,
                        Key: s3Key,
                        Body: fileStream,
                        ContentType: contentType,
                        ACL: 'public-read'
                    }
                });

                await upload.done();
                console.log(`Upload for ${filePath} completed`);
            } catch (err) {
                console.error(`Error uploading file ${s3Key}:`, err);
            }
        }

        async function uploadAllHLSFiles(videoFileName, secondOutputDir, qualityFolder) {
            const pathType = await fs.stat(secondOutputDir)

            if (pathType.isDirectory()) {
                try {
                    const files = await fs.readdir(secondOutputDir)

                    const uploadPromise = files.map(async (file) => {
                        const filePath = path.join(secondOutputDir, file);
                        const s3Key = `${videoFileName}/${qualityFolder}/${file}`;
                        await uploadFileToS3(filePath, s3Key);
                    })

                    await Promise.all(uploadPromise)

                } catch (error) {
                    console.log(error);
                    return false
                }
            } else if (pathType.isFile() && path.extname(secondOutputDir) === '.m3u8') {
                const s3Key = `${videoFileName}/${videoKey}_master.m3u8`;
                await uploadFileToS3(secondOutputDir, s3Key)
            }

        }

        const secondOutputDir = `${__dirname}/output/${videoKey}`;
        const folder = await fs.readdir(secondOutputDir)

        for (const qualityFolder of folder) {
            await uploadAllHLSFiles(videoKey, `${secondOutputDir}/${qualityFolder}`, qualityFolder);
        }

    }
    catch (error) {
        console.log(error);
        throw new Error(error)
    }
    finally {
        try {
            if (existsSync(outputDir)) {
                console.log(`Removing directory: ${outputDir}`);
                await fs.rm(outputDir, { recursive: true, force: true });
                console.log('Directory removed successfully.');
            } else {
                console.log(`Directory does not exist: ${outputDir}`);
            }
        } catch (error) {
            console.log(`Failed to remove directory ${outputDir}:`, error);
        }
    }

}, {
    connection: {
        host: 'localhost',
        port: 6379
    }
})