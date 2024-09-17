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
}
);

// 5. Create HTTP Server
const server = createServer((req, res) => { //create a server that listens for incoming requests
    if (req.method === 'POST') { // POST - sending data to the server
        let body = '';

        req.on('data', chunk => { //collect data and append it to the body variable
            body += chunk.toString();
        });

        req.on('end', () => { // end of data. then all data is received, the server parses the data and then passes it the run() function
            const parsedBody = JSON.parse(body);
            run(parsedBody).then(function (id) { //run() asynchronous function that inserts the data into MongoDB.
                res.writeHead(201, { 'Content-Type': 'application/json' });
                res.end(JSON.stringify({ destination: id })); //the server responds with the document's ID
            }).catch(error => { //error handling
                res.writeHead(500, { 'Content-Type': 'application/json' });
                res.end(JSON.stringify({ error: 'Database operation failed', details: error }));
            });
        });
    } else {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'text/plain');
        res.end('Hello World');
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
  
