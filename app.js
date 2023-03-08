const express = require('express');
const multer = require('multer');
const cors = require('cors');
const fs = require('fs');


const app = express();
app.use(cors({
  origin: '*'
}));//http://127.0.0.1:3000/

const upload = multer({ dest: 'uploads/'});

app.post('/subscribe-webhook', upload.single('Video_keyword'), (req, res) => {
    console.log(req);
     const filePath = req.file.path;
  const extension = '.mp4';

  // Construct the new file name with the extension
  const newFilePath = `${filePath}.${extension}`;

  // Rename the uploaded file with the new file name and extension
  fs.rename(filePath, newFilePath, err => {
    if (err) {
      console.error(err);
      res.status(500).send('Failed to rename uploaded file');
    } else {
      console.log(`Renamed ${filePath} to ${newFilePath}`);
      res.send('Video uploaded successfully');
    }
  });
});

app.get('/helo', (req, res) => {
    console.log(req);
  res.send('Hello, world!');

});

app.listen(8000, () => {
  console.log('Server started on port 8000');
});