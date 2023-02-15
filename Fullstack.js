const express = require('express');
const multer = require('multer');
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


app.post('/upload', upload.fields([
  { name: 'videos', maxCount: 3 },
  { name: 'json', maxCount: 1 }
]), (req, res) => {
  
  const videos = req.files['videos'];
  videos.forEach(video => {
    console.log(`Received video file: ${video.originalname}`);
    
  });

  //
  const json = req.files['json'][0];
  console.log(`Received JSON file: ${json.originalname}`);
  const jsonObject = JSON.parse(fs.readFileSync(json.path));
  // Do something with the JSON object, such as saving it to a database

  res.send('Files uploaded successfully');
});

// Start the server
app.listen(3000, () => {
  console.log('Server started on port 3000');
});