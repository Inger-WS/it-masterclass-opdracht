const express = require('express');
const cors = require('cors');
const app = express();
const port = 3000;

const corsOptions = {
    origin: '127.0.0.1:3000', // Specifiek domein toestaan
    methods: ['GET', 'POST'], // Specifieke HTTP-methoden toestaan
    allowedHeaders: ['Content-Type', 'Authorization'], // Specifieke headers toestaan
};

app.use(cors());
    
app.use(express.json());

app.get('/', (req, res) => {
    res.send('Hello, World!');
});

// add backend endpoint
app.post('/submit', (req, res) => {
    const { name, email, phone, rating, bugs, experience, genres } = req.body;
    //console.log(`Received name: ${name}`);
    console.log(`Recieved Data: name: ${ name }, email: ${ email }, phone: ${ phone }, rating: ${ rating}, bugs: ${ bugs }, experience: ${ experience }, genres: ${ genres }`);
    res.json({ message: `Hello, ${name}! mail: ${email}, tel: ${phone}, rating: ${rating}, bugs: ${bugs}, exp: ${experience}, genre: ${genres}` });
});

app.listen(port, () => {
    console.log(`Server luistert op http://localhost:${port}`);
});
