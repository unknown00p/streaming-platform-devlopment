// import { v2 as cloudinary } from "cloudinary"
// import fs from "fs"

// cloudinary.config({
//     cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
//     api_key: process.env.CLOUDINARY_API_KEY,
//     api_secret: process.env.CLOUDINARY_API_SECRET
// });

// const uploadVideoOnCloudinary = async (localFilePath) => {
//     console.log(localFilePath);
//     try {
//         if (!localFilePath) return null
//         const response = await cloudinary.uploader.upload(localFilePath, {
//             resource_type: "video",
//             eager: [
//                 {
//                     streaming_profile: "full_hd",
//                     format: "m3u8",
//                     transformation: [
//                         {
//                             width: 1920,
//                             height: 1080,
//                             crop: "limit",
//                             video_codec: "h265",
//                             bit_rate: "3000k"
//                         },
//                     ]
//                 },
//                 {
//                     streaming_profile: "hd",
//                     format: "m3u8",
//                     transformation: [
//                         {
//                             width: 1280,
//                             height: 720,
//                             crop: "limit",
//                             video_codec: "h264",
//                             bit_rate: "1500k"
//                         },

//                     ]
//                 },
//                 {
//                     streaming_profile: "sd",
//                     format: "m3u8",
//                     transformation: [
//                         {
//                             width: 854,
//                             height: 480,
//                             crop: "limit",
//                             video_codec: "h264",
//                             bit_rate: "800k"
//                         },

//                     ]
//                 },

//             ],

//             eager_async: true,
//         })
//         fs.unlinkSync(localFilePath)
//         // console.log(response);

//         return response;

//     } catch (error) {
//         fs.unlinkSync(localFilePath) // remove the locally saved temporary file as the upload operation got failed
//         return null;
//     }
// }

// const uploadImagesOnCloudinary = async (localFilePath) => {
//     console.log("clodinary local file path", localFilePath);

//     try {
//         if (!localFilePath) return null
//         const response = await cloudinary.uploader.upload(localFilePath, {
//             resource_type: "image",
//         })
//         fs.unlinkSync(localFilePath)

//         return response;

//     } catch (error) {
//         fs.unlinkSync(localFilePath) // remove the locally saved temporary file as the upload operation got failed
//         return null;
//     }
// }

// const deletePreviousImage = async (FileId, type = "image",) => {
//     try {

//         if (!FileId) return null
//         const deleted = await cloudinary.uploader.destroy(FileId, { resource_type: type })
//         return deleted

//     } catch (error) {
//         console.log(error);
//         throw error
//     }
// }

// const deletePreviousVideo = async (FileId, type = "video") => {
//     // console.log("videoId cloudi",FileId);
//     try {
//         if (!FileId) return null
//         return await cloudinary.uploader.destroy(FileId, { resource_type: type, invalidate: true })
//     } catch (error) {
//         console.log("cloudi error", error);
//         throw error
//     }
// }

// export { uploadVideoOnCloudinary, deletePreviousVideo, uploadImagesOnCloudinary, deletePreviousImage }

// to-do use rabit-mq for sending video for proccssiong

import { S3Client, ListObjectsCommand, PutObjectCommand, GetObjectCommand } from "@aws-sdk/client-s3"
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
    console.log(image);
    
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
    } finally{
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

            const myQueue = new Queue("comunication",{
                connection:{
                    host: 'localhost',
                    port: 6379
                }
            })

            // async function sendQueue() {
               await myQueue.add("videoKey",{key: videoName})
            // }

            // sendQueue()

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
    } finally{
        fs.unlinkSync(video)
    }
}

export {
    uploadImagesToBucket,
    uploadVideosToBucket
}