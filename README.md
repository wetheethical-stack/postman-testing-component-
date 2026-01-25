# API Testing Endpoints

This document outlines the available endpoints and testing procedures for the local API server running on `http://localhost:3000`.

## Basic Request Operations

### Pagination

* **Method:** `GET`
* **URL:** `http://localhost:3000/api/users?page=1`
* **Description:** Retrieves a paginated list of users.

### Create User

* **Method:** `POST`
* **URL:** `http://localhost:3000/api/users`
* **Body Type:** `raw` -> `JSON`

### Partial Update

* **Method:** `PATCH`
* **URL:** `http://localhost:3000/api/users/50`
* **Body:**
```json
{
  "email": "newemail@test.com"
}

```


* **Note:** Only the email field is updated.

---

## Authentication and Security

### Basic Authentication

* **Method:** `GET`
* **URL:** `http://localhost:3000/api/auth/basic`
* **Configuration:** Select **Basic Auth** in the authorization tab.

### Custom Headers

* **Method:** `GET`
* **URL:** `http://localhost:3000/api/headers`
* **Headers:**
* `x-api-key`: `secret123`



---

## Advanced Request Types

### File Upload

* **Method:** `POST`
* **URL:** `http://localhost:3000/api/upload`
* **Body Type:** `form-data`
* **Key:** `file` (Select 'File' from the dropdown menu)

### Timeout Testing

* **Method:** `GET`
* **URL:** `http://localhost:3000/api/delay/5`
* **Description:** Simulates a 5-second server delay to test client timeout settings.

---

## Server Behaviors

### Cookie Management

**1. Set Cookie**

* **Method:** `GET`
* **URL:** `http://localhost:3000/api/cookie/set`
* **Expected Result:** A `session_id` cookie is set.

**2. Check Cookie**

* **Method:** `GET`
* **URL:** `http://localhost:3000/api/cookie/check`
* **Expected Result:** Returns 200 OK if the cookie from step 1 is present.

### Redirects

* **Method:** `GET`
* **URL:** `http://localhost:3000/api/redirect`
* **Behavior:**
* **Default:** Automatically redirects to `/api/users`.
* **Test:** Disable "Automatically follow redirects" in Postman settings to observe the `302 Found` status.



### Rate Limiting

* **Method:** `GET`
* **URL:** `http://localhost:3000/api/spam-me`
* **Limit:** 3 requests per short interval.
* **Behavior:** The 4th request will return `429 Too Many Requests`.

---

## Request Chaining (Postman Automation)

This workflow extracts data from the response of the first request and uses it in the second request automatically.

### Step 1: Start Challenge

* **Method:** `GET`
* **URL:** `http://localhost:3000/api/challenge/start`
* **Test Script:**
Paste the following into the **Tests** tab:
```javascript
// Parse the JSON response
var jsonData = pm.response.json();
// Save the 'secret_id' into a Global Variable
pm.globals.set("my_secret_id", jsonData.secret_id);
console.log("Saved ID: " + jsonData.secret_id);

```



### Step 2: Complete Challenge

* **Method:** `POST`
* **URL:** `http://localhost:3000/api/challenge/complete`
* **Body:**
```json
{
    "secret_id": {{my_secret_id}}
}

```
