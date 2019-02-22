const fs = require("fs");
const AWS = require("aws-sdk");
const {
  AWS_ACCESS_KEY,
  AWS_SECRET_ACCESS_KEY,
  AWS_BUCKET
} = require("../configs/config");

const s3 = new AWS.S3({
  accessKeyId: AWS_ACCESS_KEY, //"process.env.AWS_ACCESS_KEY",
  secretAccessKey: AWS_SECRET_ACCESS_KEY //process.env.AWS_SECRET_ACCESS_KEY
});

const upload = file => {
  const Key =
    file.filename +
    "." +
    (file.originalname.indexOf(".") > -1
      ? file.originalname.split(".").pop()
      : "");
  return new Promise((resolve, reject) => {
    fs.readFile(file.path, (err, data) => {
      if (err) return reject(err);
      const params = {
        Bucket: AWS_BUCKET, // pass your bucket name
        Key,
        Body: data,
        contentType: file.mimetype
      };
      s3.upload(params, function(s3Err, data) {
        if (s3Err) return reject(err);
        resolve(data.Location);
      });
    });
  });
};

const remove = key => {
  return new Promise((resolve, reject) => {
    var params = {
      Bucket: AWS_BUCKET,
      Key: key
    };
    s3.deleteObject(params, function(err, data) {
      if (err) return reject(err);
      return resolve(data);
    });
  });
};

module.exports = { upload, remove };
