import express from 'express';
import cors from 'cors';
import multer from 'multer'
import * as dotenv from 'dotenv'
import {S3Client, PutObjectCommand} from "@aws-sdk/client-s3";
const app = express()
const port = 3001
const storage = multer.memoryStorage()
const upload = multer({ storage: storage })

function BucketParams(key, body) {
    this.Bucket = "sociopedia-images-bucket";
    this.Key = key;
    this.Body = body;
}

dotenv.config()

const client = new S3Client({region: 'us-east-1'});
app.use(cors());


const uploadImage = async (image) => {
  const a = new BucketParams(image.originalname, image.buffer);
  const command = new PutObjectCommand(a);
  
  try {
    const data = await client.send(command);
    // process data.
  } catch (error) {
    // error handling.
    console.log(error);
  } finally {
    // finally.

  }
}

app.get('/hello', (req, res) => {
  console.log("Request received at /hello");
  res.status(200).send({message: "Hello World!"})
})

app.post('/upload', upload.single('image'), (req, res) => {
  console.log("Request received at /upload");
  uploadImage(req.file);
  res.status(200).send({message: "Successfully uploaded file"})
})

app.listen(port, () => {
  console.log(`App listening on port ${port}`)
})

