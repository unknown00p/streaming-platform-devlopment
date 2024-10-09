import { S3Client, ListBucketsCommand, PutObjectCommand, GetObjectCommand } from "@aws-sdk/client-s3"
import { getSignedUrl } from "@aws-sdk/s3-request-presigner"
import dotenv from "dotenv"
import { Worker } from "bullmq"
import ffmpeg from "fluent-ffmpeg"
import path from "path"
import { fileURLToPath } from "url"
import {v4 as uuidv4} from 'uuid'
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
        console.log(videoKey);


        const get_cmd = new GetObjectCommand({
            Bucket: "tempvideobucket",
            Key: videoKey,
            ResponseContentDisposition: "inline",
        })

        const url = await getSignedUrl(s3Client, get_cmd)
        console.log(url);

        if (!url) {
            throw new Error('Failed to get signed URL');
        }

        const location = uuidv4()
        const outputDir = `./output/${videoKey}`
        if (!fs.existsSync(outputDir)) {
            fs.mkdirSync(outputDir,{ recursive: true });
        }
        const outputPath = `${outputDir}/1080_index.m3u8`

        async function convertFunc() {
            await ffmpeg(url)
                .output(outputPath)
                .videoCodec('libx264')
                .audioCodec('aac')
                .addOption('-hls_time', 4)
                .addOption('-hls_playlist_type', 'vod')
                .size('854x480')
                .audioBitrate('96k')
                .videoBitrate('1400k')
                .outputOptions('-hls_segment_filename',`${outputDir}/${location}_1080p_%03d.ts`)
                .on('end', function () {
                    console.log('1080p stream created');
                })
                .on('error', function (err) {
                    console.error('Error during FFmpeg conversion:', err);
                })
                .run()
        }

        convertFunc()
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
