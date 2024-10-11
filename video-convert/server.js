import { S3Client, ListBucketsCommand, PutObjectCommand, GetObjectCommand } from "@aws-sdk/client-s3"
import { getSignedUrl } from "@aws-sdk/s3-request-presigner"
import dotenv from "dotenv"
import { Worker } from "bullmq"
import ffmpeg from "fluent-ffmpeg"
import path from "path"
import { v4 as uuidv4 } from 'uuid'
import fs from 'fs'
// optional-to-do: use engineX for load balancing

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
    try {
        const videoKey = job.data.key;

        const get_cmd = new GetObjectCommand({
            Bucket: "tempvideobucket",
            Key: videoKey,
            ResponseContentDisposition: "inline",
        })

        const url = await getSignedUrl(s3Client, get_cmd)

        if (!url) {
            throw new Error('Failed to get signed URL');
        }

        const location = uuidv4()
        const outputDir = `./output/${videoKey}`
        const output1080pDir = `${outputDir}/1080p`
        const output720pDir = `${outputDir}/720p`

        if (!fs.existsSync(output1080pDir)) {
            fs.mkdirSync(output1080pDir, { recursive: true });
        }

        if (!fs.existsSync(output720pDir)) {
            fs.mkdirSync(output720pDir, { recursive: true });
        }

        async function ffmpegPromise(videoUrl, outPutPath, hlsTime, size, audioBitrate, videoBitrate, segments) {
            return new Promise((resolve, reject) => {
                ffmpeg(videoUrl)
                    .output(outPutPath)
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
            }
            )
        }

        const response = await Promise.all([
            ffmpegPromise(url, `${output1080pDir}/1080p_index.m3u8`, 7, '1920x1080', '192k', '3000k', `${output1080pDir}/${location}1080p_segment%03d.ts`),

            ffmpegPromise(url, `${output720pDir}/720_index.m3u8`, 6, '1280x720', '96k', '1400k', `${output720pDir}/${location}720p_segment%03d.ts`),

        ])

        if (response) {
            console.log("Conversion completed");
            console.log(response);
            // fs.readFile(`${output1080pDir}`, (err, data) => {
            //     if (err) {
            //         console.log(err);
            //         throw new Error(err)
            //     }

            //     console.log('andar',data);                
            // })
        }

    } catch (error) {
        console.log(error);
        throw new Error(error)
    }

}, {
    connection: {
        host: 'localhost',
        port: 6379
    }
})

const directory = path.resolve('C:/full stack journey/full stack/youtube-app/video-convert/output/6 second video.mp4/1080p')

// const absolutePath = 

fs.readdir(directory, (err, data) => {
    console.log('hello');
    
    if (err) {
        console.log(err);
        throw new Error(err)
    }

    console.log('bahar',data);                
})