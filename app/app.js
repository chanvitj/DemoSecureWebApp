const express = require('express');
const multer = require('multer');
const cors = require('cors');
const bodyParser = require('body-parser');
const fs = require('fs'); // Import the 'fs' (filesystem) module
const path = require('path');

const app = express();
const port = 8000;

app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));

// File storage configuration (Multer)
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads/'); // Create an 'uploads' folder
    },
    filename: function (req, file, cb) {
        cb(null, file.originalname); // Use original file name
        console.log('file saved');
    }
});

const upload = multer({ storage: storage });

app.use(express.static('uploads'));

app.post('/upload', upload.single('file'), (req, res) => {
    if (!req.file) {
        return res.status(400).send('No file uploaded.');
    }

    // Get list of files in 'uploads' folder
    fs.readdir('uploads', (err, files) => {
        if (err) {
            console.error('Error reading uploads folder:', err);
            return res.status(500).send('Error listing files.');
        }

        const fileListHTML = files.map(file => `<li>${file}</li>`).join('');
        const responseHTML = `
            <!DOCTYPE html>
            <html>
            <body>
                <h1>File uploaded successfully!</h1>
                <h2>Files in uploads Folder:</h2>
                <ul>${fileListHTML}</ul>
            </body>
            </html>
        `;

        res.send(responseHTML); // Send the HTML response with file list
    });
});

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}/`);
});
