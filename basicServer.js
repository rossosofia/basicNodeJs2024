// 1. Import Required Modules
const { createServer } = require('node:http');
const { MongoClient, ServerApiVersion } = require("mongodb");

// 2. Define Hostname and Port
const hostname = '127.0.0.1';
const port = 3000;

// 3. MongoDB URI Setup
const uri = "mongodb://localhost:27017/"; //default mongodb

// 4. Create MongoClient
const client = new MongoClient(uri,  {
    serverApi: {
        version: ServerApiVersion.v1,
        strict: true,
        deprecationErrors: true,
    }
});

// 5. Create HTTP Server
const server = createServer(async (req, res) => { // Make the request handler async
    console.log(`Received ${req.method} request`)
    try {
        if (req.method === 'POST') { // POST - sending data to the server
            console.log('Handling POST request');
            let body = '';

            req.on('data', chunk => { // Collect data and append it to the body variable
                body += chunk.toString();
            });

            req.on('end', async () => { // End of data. Parse and handle it
                console.log('Data received:', body);
                const parsedBody = JSON.parse(body);
                try {
                    const id = await run(parsedBody); // Use await for the async run function
                    res.writeHead(201, { 'Content-Type': 'application/json' });
                    res.end(JSON.stringify({ destination: id }));
                } catch (error) {
                    res.writeHead(500, { 'Content-Type': 'application/json' });
                    res.end(JSON.stringify({ error: 'Database operation failed', details: error.message }));
                }
            });
        } else if (req.method === 'GET') { // GET - retrieving data from the server
            console.log('Handling GET request');
            await client.connect();
            const myDB = client.db("myDB");
            const myColl = myDB.collection("pizzaMenu");

            // Fetch all documents from the collection
            const cursor = myColl.find({});
            const data = await cursor.toArray();

            // Set response headers and send data as JSON
            res.writeHead(200, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify(data));
        } else {
            console.log('Default response for other methods');
            res.statusCode = 200;
            res.setHeader('Content-Type', 'text/plain');
            res.end('Hello World');
        }
    } catch (error) {
        console.error('Server error:', error);
        res.writeHead(500, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ error: 'Server error', details: error.message }));
    } finally {
        // Ensure that the client will close when finished
        await client.close();
    }
});

// 6. The run() Function
async function run(data) {
    try {
        // Connect the client to the MongoDB server
        await client.connect();

        // Access the database and collection
        const myDB = client.db("myDB");
        const myColl = myDB.collection("pizzaMenu");

        // Insert the received data
        const result = await myColl.insertOne(data);

        // Return the inserted document's ID
        return result.insertedId;
    } finally {
        // Ensures that the client will close when you finish/error
        await client.close();
    }
}

// 7. Start the Server
server.listen(port, hostname, () => {
    console.log(`Server running at http://${hostname}:${port}/`);
});
