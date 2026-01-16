Params: GET http://localhost:3000/api/users?page=1

Body (JSON): POST http://localhost:3000/api/users (Select Body -> raw -> JSON).

Auth: GET http://localhost:3000/api/auth/basic (Select Auth -> Basic Auth).

Headers: GET http://localhost:3000/api/headers (Add x-api-key: secret123 in Headers tab).

Files: POST http://localhost:3000/api/upload (Body -> form-data -> Key: file -> Change 'Text' dropdown to 'File').

Timeouts: GET http://localhost:3000/api/delay/5 (Test your Postman timeout settings).

7. Cookie Handling
Postman automatically manages cookies like a browser.

Request 1: GET http://localhost:3000/api/cookie/set

Observation: Look at the "Cookies" link (blue text) under the Send button. It should show session_id.

Request 2: GET http://localhost:3000/api/cookie/check

Observation: It passes (200 OK) because Postman automatically attached the cookie from Step 1.

8. Redirects
Request: GET http://localhost:3000/api/redirect

Default Behavior: Postman will automatically follow the link and show you the result of /api/users.

Test: Go to Settings (Gear Icon on right) -> General -> Automatically follow redirects -> OFF. Send again. You will now see status 302 Found.

9. Rate Limiting (429 Status)
Request: GET http://localhost:3000/api/spam-me

Test: Click "Send" quickly 4 or 5 times.

Observation: The first 3 return "200 OK". The 4th will return "429 Too Many Requests". This tests how your frontend handles server rejection.

10. PATCH Request
Request: PATCH http://localhost:3000/api/users/50

Body (JSON): { "email": "newemail@test.com" }

Observation: Notice the response only acknowledges the email change. This distinguishes it from PUT (which would expect the name, role, etc. as well).

11. Request Chaining (The "Pro" Feature)
This tests your ability to extract data from Request A and use it in Request B automatically.

Step A (Get the ID):

Create a Request: GET http://localhost:3000/api/challenge/start

Go to the Tests tab (next to Body).

Paste this script:

JavaScript

// Parse the JSON response
var jsonData = pm.response.json();
// Save the 'secret_id' into a Global Variable
pm.globals.set("my_secret_id", jsonData.secret_id);
console.log("Saved ID: " + jsonData.secret_id);
Click Send.

Step B (Use the ID):

Create a New Request: POST http://localhost:3000/api/challenge/complete

Go to Body -> raw -> JSON.

Enter this body (using the variable syntax {{...}}):

JSON

{
    "secret_id": {{my_secret_id}}
}
Click Send.

Result: It should work perfectly because Postman auto-filled the ID from the previous request!
