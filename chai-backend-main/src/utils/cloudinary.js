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

import { S3Client, ListObjectsCommand, PutObjectCommand } from "@aws-sdk/client-s3"
import fs from "fs"
import path from "path"

const credentials = {
    accessKeyId: process.env.TEBI_ACCESSKEY_ID,
    secretAccessKey: process.env.TEBI_SECRET_ACCESSKEY_ID,
}

const s3client = new S3Client({
    endpoint: "https://s3.tebi.io",
    credentials: credentials,
    region: "global"
})

async function sendImagesToBucket(image) {
    try {
        const imageName = path.basename(image)
        const imageContent = fs.createReadStream(image)

        const storeImageTos3 = await s3client.send(
            new PutObjectCommand({
                Bucket: "tempvideobucket",
                Key: imageName,
                Body: imageContent,
                ContentDisposition: "inline",
                ContentType: image?.mimetype
            })
        )

        console.log(storeImageTos3);
        return storeImageTos3
    } catch (error) {
        console.log(error);
    }
}

async function sendVideosToBucket(video) {
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

        console.log(storeVideoTos3);
        return storeVideoTos3
    } catch (error) {
        console.log(error);
        throw error
    }
}

export {
    sendImagesToBucket,
    sendVideosToBucket
}