const express = require('express');
const multer = require('multer');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();
const port = 8000; // Choose your preferred port

app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));

// File storage configuration (Multer)
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads/'); // Create an 'uploads' folder
    },
    filename: function (req, file, cb) {
        cb(null, file.originalname); // Use original file name
    }
});

const upload = multer({ storage: storage });

// Serve static files (CSS, images, etc.)
app.use(express.static('public'));

// Upload route
app.post('/upload', upload.single('file'), (req, res) => {
    if (!req.file) {
        return res.status(400).send('No file uploaded.');
    }
    res.status(200).send('File uploaded successfully.');
});

// Start the server
app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}/`);
});
