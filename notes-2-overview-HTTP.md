# Overview on HTTP protocols

## HTTP Methods

### 1. GET

- **Description**: Retrieves data from the server. It should only retrieve data and not modify it.
- **Usage**: Fetching a web page or resource.
- **Example**: `GET /users/123`
- **Idempotent**: Yes (repeated requests should have the same effect).

### 2. POST

- **Description**: Submits data to be processed to a specified resource. It can create or update resources and is typically used for submitting form data.
- **Usage**: Creating a new resource or submitting data.
- **Example**: `POST /users` with a body `{ "name": "Alice", "age": 25 }`
- **Idempotent**: No (repeated requests may result in different outcomes).

### 3. PUT

- **Description**: Updates a resource with the provided data. If the resource does not exist, it can create a new one.
- **Usage**: Updating or creating a resource at a specific URL.
- **Example**: `PUT /users/123` with a body `{ "name": "Alice", "age": 26 }`
- **Idempotent**: Yes (repeated requests should have the same effect).

### 4. DELETE

- **Description**: Deletes the specified resource.
- **Usage**: Removing a resource.
- **Example**: `DELETE /users/123`
- **Idempotent**: Yes (repeated requests should have the same effect).

### 5. PATCH

- **Description**: Partially updates a resource. Unlike PUT, which replaces the entire resource, PATCH only changes specified fields.
- **Usage**: Making partial updates to a resource.
- **Example**: `PATCH /users/123` with a body `{ "age": 27 }`
- **Idempotent**: No (repeated requests may result in different outcomes, depending on the changes).

### 6. OPTIONS

- **Description**: Describes the communication options for the target resource. It can be used to check the allowed methods and other options.
- **Usage**: Discovering allowed methods or features of a resource.
- **Example**: `OPTIONS /users`
- **Idempotent**: Yes.

### 7. HEAD

- **Description**: Retrieves the headers of a resource, without the body. It is used to get metadata.
- **Usage**: Checking resource metadata or testing if a resource exists.
- **Example**: `HEAD /users/123`
- **Idempotent**: Yes.

### 8. TRACE

- **Description**: Performs a diagnostic trace of the path taken by the request. It is mainly used for debugging.
- **Usage**: Tracing the path of a request.
- **Example**: `TRACE /users/123`
- **Idempotent**: Yes.

### 9. CONNECT

- **Description**: Establishes a tunnel to the server identified by the target resource. It is used for proxying.
- **Usage**: Setting up a network connection.
- **Example**: `CONNECT www.example.com:443`
- **Idempotent**: No (it establishes a connection rather than modifying or retrieving data).

## Summary

Each HTTP method serves a specific role in the communication between clients and servers. Understanding the semantics and proper use of each method is crucial for designing and interacting with RESTful APIs effectively.

For more detailed information on HTTP methods, refer to the [HTTP/1.1 specification](https://www.rfc-editor.org/info/rfc7231).

## HTTP Headers

HTTP headers are used to provide metadata about HTTP requests and responses. They play a crucial role in communication between clients and servers.

### Request Headers

- **`Accept`**: Specifies the media types that the client is willing to receive.
  - Example: `Accept: application/json`
- **`User-Agent`**: Identifies the client software making the request.
  - Example: `User-Agent: Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/58.0.3029.110 Safari/537.3`
- **`Authorization`**: Contains credentials for authenticating the client to the server.
  - Example: `Authorization: Basic dXNlcjpwYXNz`

### Response Headers

- **`Content-Type`**: Indicates the media type of the resource being sent.
  - Example: `Content-Type: application/json`
- **`Cache-Control`**: Directives for caching mechanisms.
  - Example: `Cache-Control: no-cache`
- **`Location`**: Used in redirection or when a new resource has been created.
  - Example: `Location: https://example.com/new-resource`

### General Headers

- **`Date`**: The date and time the message was sent.
  - Example: `Date: Mon, 01 Jan 2024 12:00:00 GMT`
- **`Connection`**: Controls whether the network connection stays open or closes after the current transaction.
  - Example: `Connection: keep-alive`

## HTTP Status Codes

HTTP status codes are issued by a server in response to a client's request. They indicate whether the request was successful, or if there were issues.

### Informational (100-199)

- **`100 Continue`**: The initial part of a request has been received and the client can continue with the request.
- **`101 Switching Protocols`**: The server is switching protocols as requested by the client.

### Success (200-299)

- **`200 OK`**: The request was successful and the server responded with the requested data.
- **`201 Created`**: The request was successful and a new resource was created.
- **`204 No Content`**: The request was successful but there is no content to send back.

### Redirection (300-399)

- **`301 Moved Permanently`**: The requested resource has been moved to a new URI permanently.
- **`302 Found`**: The requested resource resides temporarily under a different URI.
- **`304 Not Modified`**: The resource has not been modified since the last request.

### Client Error (400-499)

- **`400 Bad Request`**: The server could not understand the request due to invalid syntax.
- **`401 Unauthorized`**: Authentication is required and has failed or has not been provided.
- **`403 Forbidden`**: The server understands the request but refuses to authorize it.
- **`404 Not Found`**: The requested resource could not be found.

### Server Error (500-599)

- **`500 Internal Server Error`**: The server encountered an unexpected condition that prevented it from fulfilling the request.
- **`502 Bad Gateway`**: The server, while acting as a gateway or proxy, received an invalid response from the upstream server.
- **`503 Service Unavailable`**: The server is currently unable to handle the request due to a temporary overload or maintenance.
