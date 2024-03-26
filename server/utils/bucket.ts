import * as AWS from 'aws-sdk';
import winston from "winston";
import {logger} from "./logger";
import loadEnv from "./loadEnv";

class Bucket {
  private s3: AWS.S3;
  private readonly bucketName: string;
  private logger: winston.Logger;

  constructor() {
    loadEnv();
    this.logger = logger;
    this.bucketName = process.env.AWS_BUCKET_NAME || 'default_bucket';
    this.s3 = new AWS.S3({
        accessKeyId: process.env.AWS_ACCESS_KEY,
        secretAccessKey: process.env.AWS_SECRET_KEY,
    });
  }

  public getBucketName() {
    return this.bucketName;
  }

  public async uploadFile(file: any, name: string) {
    const params = {
      Bucket: this.bucketName,
      Key: name,
      Body: file,
    };

      try {
          const upload = this.s3.upload(params);
          const data = await upload.promise();
          logger.info('File uploaded successfully', data);
          return {status: 200, data: data};
      } catch (err) {
          logger.error("Error from bucket: ", err);
          return {status: 500, data: err};
      }
  }

  public async getFile(name: string) {
    const params = {
      Bucket: this.bucketName,
      Key: name,
    };

    const file = await this.s3.getObject(params).promise();
    logger.info('File downloaded successfully', file);
    if(!file) {
        throw new Error('File not found');
    }
    return file;
  }
}

export default Bucket;