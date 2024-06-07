// import dotenv from 'dotenv';
// import AWS from 'aws-sdk';
// dotenv.config();

// const s3 = new AWS.S3({
//     accessKeyId: process.env.AWS_ACCESS_KEY_ID,
//     secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
//     region: process.env.AWS_REGION
// });

// const params = {
//     Bucket: 'visual-english-fp',
//     Key: 'photo_5407056443900816425_y.jpg',
// };

// s3.getSignedUrl('getObject', params, (err, url) => {
//     if (err) {
//         console.error("Get failed URL:", err);
//     } else {
//         console.log("Url got successfully:", url);
//     }
// });