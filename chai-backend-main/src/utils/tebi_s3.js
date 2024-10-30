import { S3Client, ListObjectsCommand, PutObjectCommand, GetObjectCommand, ListObjectsV2Command } from "@aws-sdk/client-s3"
import { getSignedUrl } from "@aws-sdk/s3-request-presigner"
import ffmpegCommand from "fluent-ffmpeg"
import fs from "fs"
import path, { delimiter } from "path"
import { Queue } from "bullmq"

const credentials = {
    accessKeyId: process.env.TEBI_ACCESSKEY_ID,
    secretAccessKey: process.env.TEBI_SECRET_ACCESSKEY_ID,
}

const s3client = new S3Client({
    endpoint: "https://s3.tebi.io",
    credentials: credentials,
    region: "global"
})

async function uploadImagesToBucket(image) {
    try {
        const imageName = path.basename(image)
        const imageContent = fs.createReadStream(image)        

        const storeImageTos3 = await s3client.send(
            new PutObjectCommand({
                Bucket: process.env.TEBI_TEMPORARY_BUCKET_NAME,
                Key: imageName,
                Body: imageContent,
                ContentDisposition: "inline",
                ContentType: image?.mimetype,
                ACL: "public-read"
            })
        )

        if (storeImageTos3.$metadata.httpStatusCode === 200) {
            const url = `https://${process.env.TEBI_TEMPORARY_BUCKET_NAME}.s3.tebi.io/${imageName}`
            return url
        }


    } catch (error) {
        console.log(error);
    } finally {
        fs.unlinkSync(image)
    }
}

async function uploadVideosToBucket(video) {
    console.log('video', video);

    try {
        const videoName = path.basename(video)
        const videoContent = fs.createReadStream(video)

        const storeVideoTos3 = await s3client.send(
            new PutObjectCommand({
                Bucket: process.env.TEBI_TEMPORARY_BUCKET_NAME,
                Key: videoName,
                Body: videoContent,
                ContentType: video?.mimetype,
                ContentDisposition: "inline",
            })
        )

        if (storeVideoTos3.$metadata.httpStatusCode === 200) {

            const myQueue = new Queue("comunication", {
                connection: {
                    host: 'localhost',
                    port: 6379
                }
            })

            await myQueue.add("videoKey", { key: videoName })

            ffmpegCommand.setFfprobePath("C:/ffmpeg/ffmpeg-2024-10-02-git-358fdf3083-full_build/ffmpeg-2024-10-02-git-358fdf3083-full_build/bin/ffprobe.exe");


            const metaData = await new Promise((resolve, reject) => {
                ffmpegCommand.ffprobe(video, (err, metaData) => {
                    if (err) {
                        console.log(err);
                        return reject(err)
                    } else {
                        resolve(metaData)
                    }
                })
            })

            const duration = metaData?.format?.duration

            const videoUrlId = videoName
            return { videoUrlId, duration }
        }


    }
    catch (error) {
        console.log(error);
        throw error
    } finally {
        fs.unlinkSync(video)
    }
}

async function listFolderContents({ folderName }) {

    const bucketName = process.env.TEBI_HLS_BUCKET_NAME;


    // const listParams = {
    //     Bucket: process.env.TEBI_HLS_BUCKET_NAME,
    //     Prefix: `${folderName}/`,
    //     Delimiter: '/'
    // }

    // const dataCommand = new ListObjectsV2Command(listParams)
    // const folders = await s3client.send(dataCommand)
    // console.log('folders',folders.Contents[0]?.Key); 
    
    try {
        const incodedFolderName = encodeURIComponent(folderName)        
        const url = {
            auto: `https://s3.tebi.io/${bucketName}/${incodedFolderName}/${incodedFolderName}_master.m3u8`,
            quality1080p: `https://s3.tebi.io/${bucketName}/${incodedFolderName}/1080p/1080p_index.m3u8`,
            quality720p: `https://s3.tebi.io/${bucketName}/${incodedFolderName}/720p/720p_index.m3u8`,
            quality480p: `https://s3.tebi.io/${bucketName}/${incodedFolderName}/480p/480p_index.m3u8`,
            quality320p: `https://s3.tebi.io/${bucketName}/${incodedFolderName}/320p/320p_index.m3u8`
        }
        return url
    } catch (err) {
        console.error("Error listing folder contents:", err);
    }
}

export {
    uploadImagesToBucket,
    uploadVideosToBucket,
    listFolderContents
}