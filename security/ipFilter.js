const express = require('express');
const app = express();

// Vervang dit door het toegestane IP-adres
const allowedIP = 'http://localhost:3000';

// Middleware om IP-adres te controleren
function ipFilter(req, res, next) {
    const clientIP = req.ip || req.connection.remoteAddress;
    if (clientIP === allowedIP) {
        next(); // Ga door naar de volgende middleware of route
    } else {
        res.status(403).send('Access denied');
    }
}

// Gebruik de middleware voor alle routes
app.use(ipFilter);

// Voorbeeldroute
app.get('/', (req, res) => {
    res.send('Hello, you have access!');
});

// Start de server
const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});