import { S3Client, ListBucketsCommand, PutObjectCommand, GetObjectCommand } from "@aws-sdk/client-s3"
import { getSignedUrl } from "@aws-sdk/s3-request-presigner"
import dotenv from "dotenv"

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

const get_cmd = new GetObjectCommand({
    Bucket: "tempvideobucket",
    Key: "videoplayback (1).mp4",
    ResponseContentDisposition: "inline",
})

async function getUrl(params) {
    const url = await getSignedUrl(s3Client,get_cmd)
    console.log(url);
}

getUrl()