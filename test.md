Params: GET http://localhost:3000/api/users?page=1

Body (JSON): POST http://localhost:3000/api/users (Select Body -> raw -> JSON).

Auth: GET http://localhost:3000/api/auth/basic (Select Auth -> Basic Auth).

Headers: GET http://localhost:3000/api/headers (Add x-api-key: secret123 in Headers tab).

Files: POST http://localhost:3000/api/upload (Body -> form-data -> Key: file -> Change 'Text' dropdown to 'File').

Timeouts: GET http://localhost:3000/api/delay/5 (Test your Postman timeout settings).
