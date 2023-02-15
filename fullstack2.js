const express = require('express');
const multer = require('multer');
const AWS = require('aws-sdk');
const fs = require('fs');

const app = express();


const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/');
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  }
});


const upload = multer({ storage: storage });


const s3 = new AWS.S3({
  accessKeyId: 'your-access-key-id',
  secretAccessKey: 'your-secret-access-key'
});


app.post('/upload', upload.single('file'), (req, res) => {
  
  const file = req.file;
  if (file.mimetype.startsWith('video/')) {
    
    const s3Params = {
      Bucket: 'your-bucket-name',
      Key: file.originalname,
      Body: fs.createReadStream(file.path)
    };
    s3.upload(s3Params, (err, data) => {
      if (err) {
        console.error(err);
        res.send('Failed to upload file to S3');
      } else {
        console.log(`File uploaded to S3 at ${data.Location}`);
        res.send('File uploaded successfully');
      }
    });
  } else if (file.mimetype === 'application/json') {
    
    const jsonObject = JSON.parse(fs.readFileSync(file.path));
    console.log(jsonObject);
    res.send('JSON file uploaded and printed to console');
  } else {
    res.send('Unsupported file type');
  }
});

app.listen(3000, () => {
  console.log('Server started on port 3000');
});