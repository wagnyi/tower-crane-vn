import { S3Storage } from 'coze-coding-dev-sdk';
import * as fs from 'fs';
import * as path from 'path';

const storage = new S3Storage({
  endpointUrl: process.env.COZE_BUCKET_ENDPOINT_URL,
  accessKey: '',
  secretKey: '',
  bucketName: process.env.COZE_BUCKET_NAME,
  region: 'cn-beijing',
});

async function uploadImages() {
  const imageDir = '/tmp/塔吊';
  const imageFiles = ['1.webp', '2.jpg', '3.jpg', '4.jpg', '5.jpg', '6.jpg'];
  
  const uploadedUrls: string[] = [];
  
  for (const fileName of imageFiles) {
    const filePath = path.join(imageDir, fileName);
    const fileContent = fs.readFileSync(filePath);
    
    const contentType = fileName.endsWith('.webp') ? 'image/webp' : 'image/jpeg';
    
    const key = await storage.uploadFile({
      fileContent,
      fileName: `tower-crane/${fileName}`,
      contentType,
    });
    
    // 生成有效期很长的签名URL (10年)
    const url = await storage.generatePresignedUrl({
      key,
      expireTime: 315360000, // 10年
    });
    
    console.log(`Uploaded ${fileName}: ${url}`);
    uploadedUrls.push(url);
  }
  
  return uploadedUrls;
}

uploadImages().then(urls => {
  console.log('\nAll uploaded URLs:');
  urls.forEach((url, i) => {
    console.log(`Image ${i + 1}: ${url}`);
  });
}).catch(err => {
  console.error('Error:', err);
  process.exit(1);
});
