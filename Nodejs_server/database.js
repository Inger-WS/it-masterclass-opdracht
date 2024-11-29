const { MongoClient } = require('mongodb');
const uri = "your_connection_string_here"; // Replace with your connection string
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });

async function run() {
    try {
        await client.connect();
        console.log("Connected to MongoDB Atlas!");
        const database = client.db('mydb');
        const collection = database.collection('users');
        // Perform database operations
    } finally {
        await client.close();
    }
}

run().catch(console.dir);