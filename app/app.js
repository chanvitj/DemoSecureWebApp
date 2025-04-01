const express = require('express');
const multer = require('multer');
const cors = require('cors');
const bodyParser = require('body-parser');
const fs = require('fs'); // Import the 'fs' (filesystem) module
const path = require('path');

const app = express();
const port = 8000;

const os = require('os');
const hostname = os.hostname();
const interfaces = os.networkInterfaces();
let ipAddress = '';

for (const interfaceName in interfaces) {
    const addresses = interfaces[interfaceName];
    for (const address of addresses) {
        if (address.family === 'IPv4' && !address.internal) {
            ipAddress = address.address;
            break;
        }
    }
    if (ipAddress) break; // If found, stop searching
}
const hostHostname = process.env.HOST_HOSTNAME;
const hostIPAddress = process.env.HOST_IP;

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

app.get('/', (req, res) => {  // Route to handle the initial page
    res.send(`
        <!DOCTYPE html>
        <html>
        <body>
            <h2>HostnameCCC: ${hostname}</h2>
            <h2>IP Address: ${ipAddress}</h2>
            <h2>Host - Hostname: ${hostHostname}</h2>
            <h2>Host - IP Address: ${hostIPAddress}</h2>

            <form action="/upload" method="POST" enctype="multipart/form-data">
                <input type="file" name="file">
                <button type="submit">Upload</button>
            </form>
        </body>
        </html>
    `);
});

app.use(express.static('public'));

app.post('/upload', upload.single('file'), (req, res) => {
    if (!req.file) {
        return res.status(400).send('No file uploaded.');
    }

    // Get list of files in 'uploads' folder
    fs.readdir('uploads', (err, files) => {
        if (err) {
            console.error('Error reading uploads folder:', err);
            return res.status(500).send('Error listing files.'+hostname+'.'+interfaces);
        }

        const fileListHTML = files.map(file => `<li>${file}</li>`).join('');
        const responseHTML = `
            <!DOCTYPE html>
            <html>
            <body>
                <h1>File uploaded successfully!</h1>
                <h2>Files in uploads Folder:</h2>
                <ul>${fileListHTML}</ul>
                <h2>Hostname: ${hostname}</h2>
                <h2>IP Address: ${ipAddress}</h2>
                <h2>Host - Hostname: ${hostHostname}</h2>
                <h2>Host - IP Address: ${hostIPAddress}</h2>
            </body>
            </html>
        `;

        res.send(responseHTML); // Send the HTML response with file list
    });
});

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}/`);
});
