import { S3Client, ListObjectsCommand, PutObjectCommand, GetObjectCommand, ListObjectsV2Command } from "@aws-sdk/client-s3"
import { getSignedUrl } from "@aws-sdk/s3-request-presigner"
import ffmpegCommand from "fluent-ffmpeg"
import fs from "fs"
import path from "path"
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
                Bucket: "tempvideobucket",
                Key: imageName,
                Body: imageContent,
                ContentDisposition: "inline",
                ContentType: image?.mimetype,
                ACL: "public-read"
            })
        )

        if (storeImageTos3.$metadata.httpStatusCode === 200) {
            const url = `https://tempvideobucket.s3.tebi.io/${imageName}`
            return url
        }


    } catch (error) {
        console.log(error);
    } finally {
        fs.unlinkSync(image)
    }
}

async function uploadVideosToBucket(video) {
    console.log(video);

    try {
        const videoName = path.basename(video)
        const videoContent = fs.createReadStream(video)

        const storeVideoTos3 = await s3client.send(
            new PutObjectCommand({
                Bucket: "tempvideobucket",
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

async function listFolderContents({folderName}) {
    const listParams = {
        Bucket: "hls-bucket", 
        Prefix: `${folderName}/`,
        Delimiter: "/",
    };

    console.log('list params',listParams);
    

    try {
        const data = await s3client.send(new ListObjectsV2Command(listParams));
        const masterUrlFileKey = data.Contents[0]?.Key
        // console.log('masterKey',masterUrlFileKey);
        

        const url = [
            `https://s3.tebi.io/${listParams.Bucket}/${masterUrlFileKey}`
        ]
        return url
    } catch (err) {
        console.error("Error listing folder contents:", err);
    }
}

export {
    uploadImagesToBucket,
    uploadVideosToBucket,
    // getVideo,
    listFolderContents
}