const express = require('express');
const multer = require('multer'); // For testing file uploads
const path = require('path');

const app = express();
const PORT = 3000;

// Middleware to parse JSON bodies and URL-encoded data
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Storage setup for file upload testing
const storage = multer.diskStorage({
    destination: (req, file, cb) => cb(null, 'uploads/'),
    filename: (req, file, cb) => cb(null, Date.now() + '-' + file.originalname)
});
const upload = multer({ dest: 'os-temp/' }); // We use temp to avoid creating folders

// Logger middleware to see requests in console
app.use((req, res, next) => {
    console.log(`[${new Date().toISOString()}] ${req.method} ${req.url}`);
    next();
});

//Root
app.get('/', (req, res) => {
    res.json({ message: "Postman Test Server is Running! 🚀", version: "2026.1.0" });
});

// ==========================================
// 1. BASIC METHODS & DATA (GET, POST, PUT, DELETE)
// ==========================================

// GET: Query Parameters
// Test URL: http://localhost:3000/api/users?page=2&sort=asc
app.get('/api/users', (req, res) => {
    const { page, sort } = req.query;
    res.json({
        message: "Fetched users successfully",
        queryParams: { page, sort },
        data: [
            { id: 1, name: "Alice", role: "Admin" },
            { id: 2, name: "Bob", role: "User" }
        ]
    });
});

// POST: Sending JSON Body
// Body: { "name": "Charlie", "role": "Dev" }
app.post('/api/users', (req, res) => {
    const newUser = req.body;
    res.status(201).json({
        message: "User created successfully",
        receivedData: newUser,
        id: Math.floor(Math.random() * 1000)
    });
});

// PUT: Updating Data (Path Variables)
// URL: http://localhost:3000/api/users/101
app.put('/api/users/:id', (req, res) => {
    res.json({
        message: `User with ID ${req.params.id} updated`,
        updates: req.body
    });
});

// DELETE: Removing Data
app.delete('/api/users/:id', (req, res) => {
    res.json({ message: `User with ID ${req.params.id} deleted` });
});

// ==========================================
// 2. HEADERS & CONTENT NEGOTIATION
// ==========================================

// Checks for custom headers
// Header: x-api-key: secret123
app.get('/api/headers', (req, res) => {
    const apiKey = req.headers['x-api-key'];
    if (apiKey === 'secret123') {
        res.json({ status: "Access Granted", headers: req.headers });
    } else {
        res.status(403).json({ status: "Forbidden", message: "Missing or invalid x-api-key header" });
    }
});

// ==========================================
// 3. AUTHORIZATION
// ==========================================

// Basic Auth
// Auth Type: Basic Auth -> Username: admin, Password: password
app.get('/api/auth/basic', (req, res) => {
    const authHeader = req.headers.authorization;
    if (!authHeader) return res.status(401).send('Authentication required');

    const auth = new Buffer.from(authHeader.split(' ')[1], 'base64').toString().split(':');
    const user = auth[0];
    const pass = auth[1];

    if (user === 'admin' && pass === 'password') {
        res.json({ message: "Basic Auth Successful!" });
    } else {
        res.status(401).send('Invalid Credentials');
    }
});

// Bearer Token
// Auth Type: Bearer Token -> Token: my-secret-token
app.get('/api/auth/bearer', (req, res) => {
    const authHeader = req.headers.authorization;
    if (authHeader && authHeader.startsWith("Bearer my-secret-token")) {
        res.json({ message: "Bearer Token Validated!" });
    } else {
        res.status(401).json({ message: "Invalid or missing Bearer token" });
    }
});

// ==========================================
// 4. ADVANCED: FILE UPLOAD (multipart/form-data)
// ==========================================

// Body: form-data -> Key: 'file' (Type: File)
app.post('/api/upload', upload.single('file'), (req, res) => {
    if (!req.file) {
        return res.status(400).json({ message: "No file uploaded" });
    }
    res.json({
        message: "File uploaded successfully",
        fileInfo: {
            originalName: req.file.originalname,
            size: req.file.size,
            mimetype: req.file.mimetype
        }
    });
});

// ==========================================
// 5. TESTING DELAYS & TIMEOUTS
// ==========================================

// URL: http://localhost:3000/api/delay/5
// Set Postman timeout to 3000ms to fail, or 6000ms to pass
app.get('/api/delay/:seconds', (req, res) => {
    const delay = parseInt(req.params.seconds) * 1000;
    setTimeout(() => {
        res.json({ message: `Response delayed by ${req.params.seconds} seconds` });
    }, delay);
});

// ==========================================
// 6. ERROR SIMULATION
// ==========================================

app.get('/api/error/500', (req, res) => {
    res.status(500).json({ error: "Internal Server Error Simulation" });
});

app.get('/api/error/400', (req, res) => {
    res.status(400).json({ error: "Bad Request Simulation" });
});

// Start Server
app.listen(PORT, () => {
    console.log(`\nLocal Host Server running on http://localhost:${PORT}`);
    console.log(`Ready for Postman testing...`);
});
