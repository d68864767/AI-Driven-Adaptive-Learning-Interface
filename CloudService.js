import AWS from 'aws-sdk';

class CloudService {
  constructor() {
    AWS.config.update({
      region: process.env.AWS_REGION,
      accessKeyId: process.env.AWS_ACCESS_KEY,
      secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY
    });

    this.s3 = new AWS.S3();
  }

  async uploadFile(fileName, filePath) {
    const fileContent = require('fs').readFileSync(filePath);

    const params = {
      Bucket: process.env.AWS_BUCKET_NAME,
      Key: fileName,
      Body: fileContent
    };

    try {
      const data = await this.s3.upload(params).promise();
      console.log(`File uploaded successfully at ${data.Location}`);
    } catch (error) {
      console.error('Error uploading file:', error);
      throw error;
    }
  }

  async downloadFile(fileName, downloadPath) {
    const params = {
      Bucket: process.env.AWS_BUCKET_NAME,
      Key: fileName
    };

    try {
      const data = await this.s3.getObject(params).promise();
      require('fs').writeFileSync(downloadPath, data.Body);
      console.log(`File downloaded successfully at ${downloadPath}`);
    } catch (error) {
      console.error('Error downloading file:', error);
      throw error;
    }
  }
}

export default new CloudService();
