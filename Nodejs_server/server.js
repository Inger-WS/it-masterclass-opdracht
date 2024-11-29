const express = require('express');
const app = express();
const port = 3000;

app.use(express.json());

app.get('/', (req, res) => {
    res.send('Hello, World!');
});

// add backend endpoint
app.post('/submit', (req, res) => {
    const { name } = req.body;
    console.log(`Received name: ${ name }`);
    res.json({ message: `Hello, ${ name }!` });
});

app.listen(port, () => {
    console.log(`Server luistert op http://localhost:${port}`);
});
