import { S3Client, ListBucketsCommand, PutObjectCommand, GetObjectCommand } from "@aws-sdk/client-s3"
import { getSignedUrl } from "@aws-sdk/s3-request-presigner"
import dotenv from "dotenv"
import { Worker } from "bullmq"

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

console.log("runing");


const myQueue = new Worker("comunication", async(job)=>{

    console.log(job.data);

    // const get_cmd = new GetObjectCommand({
    //     Bucket: "tempvideobucket",
    //     Key: job.data.key,
    //     ResponseContentDisposition: "inline",
    // })
    
    // async function getUrl(params) {
    //     const url = await getSignedUrl(s3Client, get_cmd)
    //     console.log(url);
    // }
    
    // getUrl()

},{
    connection:{
        host: 'localhost',
        port: 6379
    }
})
