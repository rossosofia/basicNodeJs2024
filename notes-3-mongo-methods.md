## MongoDB Methods

MongoDB is a NoSQL database that allows for flexible schema design and querying. Below are some common methods used to interact with MongoDB.

### Basic Operations

- **`db.collection.find(query, projection)`**: Retrieves documents from a collection.
  - Example: `db.users.find({ age: { $gt: 18 } }, { name: 1, age: 1 })`
- **`db.collection.insertOne(document)`**: Inserts a single document into a collection.
  - Example: `db.users.insertOne({ name: "Alice", age: 25 })`
- **`db.collection.updateOne(filter, update, options)`**: Updates a single document that matches the filter.
  - Example: `db.users.updateOne({ name: "Alice" }, { $set: { age: 26 } })`
- **`db.collection.deleteOne(filter)`**: Deletes a single document that matches the filter.
  - Example: `db.users.deleteOne({ name: "Alice" })`

### Aggregation

- **`db.collection.aggregate(pipeline)`**: Performs aggregation operations on a collection.
  - Example:
    ```javascript
    db.sales.aggregate([
      { $match: { status: "completed" } },
      { $group: { _id: "$product", totalSales: { $sum: "$amount" } } },
    ]);
    ```

### Indexing

- **`db.collection.createIndex(keys, options)`**: Creates an index on a collection to improve query performance.
  - Example: `db.users.createIndex({ age: 1 })`

### Database Management

- **`db.createCollection(name, options)`**: Creates a new collection.
  - Example: `db.createCollection("orders")`
- **`db.dropCollection(name)`**: Drops a collection from the database.
  - Example: `db.dropCollection("orders")`

For more details on MongoDB methods, refer to the [official MongoDB documentation](https://docs.mongodb.com/manual/).

---

This overview should give you a solid foundation on HTTP headers, status codes, and MongoDB methods.
