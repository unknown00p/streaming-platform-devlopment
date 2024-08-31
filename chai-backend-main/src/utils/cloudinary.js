import { v2 as cloudinary } from "cloudinary"
import fs from "fs"


cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET
});

const uploadVideoOnCloudinary = async (localFilePath) => {
    try {
        if (!localFilePath) return null
        const response = await cloudinary.uploader.upload(localFilePath, {
            resource_type: "video",
            eager: [
                {
                    streaming_profile: "full_hd",
                    format: "m3u8",
                    transformation: [
                        {
                            width: 1920,
                            height: 1080,
                            crop: "limit", // Prevents upscaling
                            video_codec:"h265",
                            bit_rate: "3000k"
                        },
                    ]
                },
                {
                    streaming_profile: "hd",
                    format: "m3u8",
                    transformation: [
                        {
                            width: 1280,
                            height: 720,
                            crop: "limit",
                            video_codec: "h264",
                            bit_rate: "1500k"
                        },
                        
                    ]
                },
                {
                    streaming_profile: "sd",
                    format: "m3u8",
                    transformation: [
                         {
                        width: 854,
                        height: 480,
                        crop: "limit",
                        video_codec: "h264",
                        bit_rate: "800k"
                    },
                    
                ]
                },

            ],

            eager_async: true,
        })
        console.log("response cloudinary", response);
        fs.unlinkSync(localFilePath)
        return response;

    } catch (error) {
        fs.unlinkSync(localFilePath) // remove the locally saved temporary file as the upload operation got failed
        return null;
    }
}

const uploadImagesOnCloudinary = async (localFilePath) => {
    try {
        if (!localFilePath) return null
        const response = await cloudinary.uploader.upload(localFilePath, {
            resource_type: "image",
        })
        fs.unlinkSync(localFilePath)
        return response;

    } catch (error) {
        fs.unlinkSync(localFilePath) // remove the locally saved temporary file as the upload operation got failed
        return null;
    }
}

const deletePreviousFile = async (previousFileId, type = "image",) => {
    try {

        if (!previousFileId) return null
        return await cloudinary.uploader.destroy(previousFileId, { resource_type: type })

    } catch (error) {
        console.log(error);
        throw error
    }
}



export { uploadVideoOnCloudinary, deletePreviousFile, uploadImagesOnCloudinary }