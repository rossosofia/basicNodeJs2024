## 1. Core Concepts to Memorize

### A. **Node.js Basics**

- **Creating a Server**: Understand `http.createServer()` and how to handle requests/responses.
- **Asynchronous Code**: Learn to work with `async/await` and Promises.

### B. **MongoDB Basics**

- Know how to connect to MongoDB and perform:
  - **Insert**: `insertOne()`
  - **Read**: `find()`
  - **Update**: `updateOne()`
  - **Delete**: `deleteOne()`

### C. **Error Handling**

- Practice handling errors using `try/catch` blocks in asynchronous code.

## 2. Understand the Flow

Try to get a strong understanding of the overall flow of a backend system:

- A request comes into the server.
- The server processes the request (parses data, queries the database).
- The server sends a response back to the client.

Once you understand this, it will help you make sense of different server setups and APIs.

## 3. Common Patterns to Reuse (Templates)

### A. **Node.js + MongoDB Basic Server Template**

Use this as a starting point for backend projects.

```javascript
const { createServer } = require("node:http");
const { MongoClient } = require("mongodb");

const uri = "mongodb://localhost:27017/";
const client = new MongoClient(uri);

async function runDatabaseOperation(data) {
  try {
    await client.connect();
    const db = client.db("myDB");
    const result = await db.collection("myCollection").insertOne(data);
    return result.insertedId;
  } finally {
    await client.close();
  }
}

const server = createServer((req, res) => {
  if (req.method === "POST") {
    let body = "";
    req.on("data", (chunk) => (body += chunk.toString()));
    req.on("end", async () => {
      try {
        const data = JSON.parse(body);
        const id = await runDatabaseOperation(data);
        res.writeHead(201, { "Content-Type": "application/json" });
        res.end(JSON.stringify({ id }));
      } catch (error) {
        res.writeHead(500, { "Content-Type": "application/json" });
        res.end(JSON.stringify({ error: "Database error" }));
      }
    });
  } else {
    res.writeHead(200, { "Content-Type": "text/plain" });
    res.end("Hello, World!");
  }
});

server.listen(3000, "127.0.0.1", () => {
  console.log("Server running at http://127.0.0.1:3000/");
});
```

**Why Keep This Template?**

- **Connection Logic:** The MongoDB connection setup (MongoClient, client.connect()) is often repetitive, and you don't need to write it from scratch every time.
- **Request Handling:** Setting up a server to handle requests (POST, GET) follows a predictable pattern. The above template has the basic structure for handling requests, so you can modify it for your specific project.

### B. **Basic MongoDB CRUD Operations**

Save this as a template for common database operations.

```javascript
async function createDocument(db, data) {
  return (await db.collection("myCollection").insertOne(data)).insertedId;
}

async function readDocuments(db) {
  return await db.collection("myCollection").find({}).toArray();
}

async function updateDocument(db, filter, updateData) {
  return (
    await db.collection("myCollection").updateOne(filter, { $set: updateData })
  ).modifiedCount;
}

async function deleteDocument(db, filter) {
  return (await db.collection("myCollection").deleteOne(filter)).deletedCount;
}
```

**Why Keep This Template?**

These are common database operations you'll frequently use. Rather than memorizing the exact syntax, save this as a reference and modify it based on the context of your project.

## 4. Common HTTP Status Codes Overview

### 2xx Series (Successful Responses):

- 200 OK: The request was successful, and the server returned the requested data.
- 201 Created: The request was successful, and a new resource was created.
- 204 No Content: The request was successful, but there is no content to return.

### 4xx Series (Client Errors):

- 400 Bad Request: The server could not understand the request due to invalid syntax.
- 404 Not Found: The server could not find the requested resource.
- 401 Unauthorized: Authentication is required and has failed or has not been provided.

### 5xx Series (Server Errors):

- 500 Internal Server Error: The server encountered an unexpected condition that prevented it from fulfilling the request.
- 502 Bad Gateway: The server, while acting as a gateway or proxy, received an invalid response from the upstream server.
- 503 Service Unavailable: The server is currently unable to handle the request due to temporary overload or maintenance.

These status codes help clients understand the result of their requests and handle responses appropriately.

--

## 5. Retrieving All Entities from the Database

### In a typical scenario, you would:

- Query the MongoDB database to retrieve all documents from a collection.
- Convert the result cursor to an array of documents.
- Set the appropriate HTTP headers to indicate the response type.
- sSend the array of documents as a JSON-formatted response.
