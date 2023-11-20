var AWS = require('aws-sdk');

// AWS.config.update({
//     accessKeyId: process.env.AWS_ACCESS_KEY_ID,
//     secretAccessKey: process.env.SECRET_ACCESS_KEY,
//     region: process.env.REGION,
//     endpoint: process.env.ENDPOINT
// });

AWS.config.update({
  region: "local",
  endpoint: "http://localhost:8000"
});

const db = new AWS.DynamoDB.DocumentClient();

module.exports = db;