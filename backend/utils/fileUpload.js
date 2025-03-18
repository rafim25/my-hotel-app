const AWS = require('aws-sdk');
const { v4: uuidv4 } = require('uuid');
const config = require('../config/config');

const s3 = new AWS.S3({
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  region: process.env.AWS_REGION
});

exports.uploadToS3 = async (file) => {
  const fileExtension = file.originalname.split('.').pop();
  const fileName = `${uuidv4()}.${fileExtension}`;

  const params = {
    Bucket: process.env.AWS_BUCKET_NAME,
    Key: `rooms/${fileName}`,
    Body: file.buffer,
    ContentType: file.mimetype,
    ACL: 'public-read'
  };

  const result = await s3.upload(params).promise();
  return result.Location;
};

exports.deleteFromS3 = async (fileUrl) => {
  const key = fileUrl.split('/').pop();
  
  const params = {
    Bucket: process.env.AWS_BUCKET_NAME,
    Key: `rooms/${key}`
  };

  await s3.deleteObject(params).promise();
}; 