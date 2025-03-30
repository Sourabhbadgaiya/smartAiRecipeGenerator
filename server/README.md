# Authentication API Documentation

## Register User

Creates a new user account in the system.

### Endpoint

```
POST /api/auth/register
```

### Request Body

| Field    | Type   | Required | Validation Rules                                       |
| -------- | ------ | -------- | ------------------------------------------------------ |
| name     | string | Yes      | Must not be empty                                      |
| email    | string | Yes      | Valid email format, 4-32 characters                    |
| password | string | Yes      | Minimum 6 characters, must contain at least one number |

### Example Request

```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "password123"
}
```

### Success Response

**Status Code:** 201 Created

```json
{
  "success": true,
  "message": "User created Successfully",
  "user": {
    "name": "John Doe",
    "email": "john@example.com",
    "_id": "user_id",
    "createdAt": "timestamp",
    "updatedAt": "timestamp"
  }
}
```

### Error Responses

#### Validation Error

**Status Code:** 400 Bad Request

```json
{
  "error": "Password must contain at least 6 characters"
}
```

#### Email Already Exists

**Status Code:** 400 Bad Request

```json
{
  "message": "Email already exists"
}
```

### Status Codes

| Status Code | Description                              |
| ----------- | ---------------------------------------- |
| 201         | User successfully created                |
| 400         | Invalid request body or validation error |
| 500         | Server error                             |

## Login User

Authenticates a user and returns a JWT token.

### Endpoint

```
POST /api/auth/login
```

### Request Body

| Field    | Type   | Required | Validation Rules                                       |
| -------- | ------ | -------- | ------------------------------------------------------ |
| email    | string | Yes      | Valid email format, 4-32 characters                    |
| password | string | Yes      | Minimum 6 characters, must contain at least one number |

### Example Request

```json
{
  "email": "john@example.com",
  "password": "password123"
}
```

### Success Response

**Status Code:** 200 OK

```json
{
  "success": true,
  "message": "User logged in Successfully",
  "user": {
    "name": "John Doe",
    "email": "john@example.com",
    "_id": "user_id",
    "createdAt": "timestamp",
    "updatedAt": "timestamp"
  }
}
```

### Error Responses

#### Invalid Credentials

**Status Code:** 400 Bad Request

```json
{
  "message": "Invalid email or password"
}
```

#### Validation Error

**Status Code:** 400 Bad Request

```json
{
  "error": "Email is required"
}
```

## Logout User

Invalidates the user's JWT token and logs them out.

### Endpoint

```
GET /api/auth/logout
```

### Headers

```
Authorization: Bearer <token>
```

or
Cookie: token=<token>

### Success Response

**Status Code:** 200 OK

```json
{
  "message": "Logged out successfully"
}
```

### Error Responses

#### No Token

**Status Code:** 400 Bad Request

```json
{
  "message": "No token provided"
}
```

#### Invalid Token

**Status Code:** 400 Bad Request

```json
{
  "message": "Invalid token"
}
```

### Status Codes

| Status Code | Description                             |
| ----------- | --------------------------------------- |
| 200         | Success                                 |
| 400         | Invalid request or token                |
| 401         | Unauthorized - Token missing or invalid |
| 500         | Server error                            |

## API Endpoints

### User Management

#### Get Current User

```http
GET /api/user/current-user
```

**Authentication:** Bearer Token required

**Success Response:**

```json
{
  "data": {
    "_id": "user_id",
    "name": "John Doe",
    "email": "john@example.com",
    "profilePicture": "",
    "createdAt": "2024-01-01T00:00:00.000Z",
    "updatedAt": "2024-01-01T00:00:00.000Z"
  },
  "message": "User fetched successfully"
}
```

**Error Response:**

```json
{
  "message": "Unauthorized: No token provided"
}
```

### Recipe Management

#### Generate Recipe

```http
POST /api/recipe/generate
```

**Authentication:** Bearer Token required

**Request Body:**

| Field       | Type     | Required | Description                            |
| ----------- | -------- | -------- | -------------------------------------- |
| ingredients | string[] | Yes      | List of ingredients                    |
| preferences | string[] | No       | Dietary preferences (e.g., vegetarian) |
| cuisine     | string   | No       | Preferred cuisine type                 |

**Example Request:**

```json
{
  "ingredients": ["chicken", "rice", "tomatoes"],
  "preferences": ["low-carb"],
  "cuisine": "italian"
}
```

**Success Response:**

**Status Code:** 200 OK

```json
{
  "title": "Italian Chicken and Rice",
  "ingredients": ["2 chicken breasts", "1 cup rice", "2 tomatoes"],
  "instructions": [
    "Step 1: Prepare the ingredients",
    "Step 2: Cook the chicken",
    "Step 3: Combine with rice"
  ]
}
```

**Error Response:**

**Status Code:** 400 Bad Request

```json
{
  "message": "Ingredients are required."
}
```

#### Save Recipe

```http
POST /api/recipe/save
```

**Authentication:** Bearer Token required

**Request Body:**

| Field         | Type     | Required | Description              |
| ------------- | -------- | -------- | ------------------------ |
| title         | string   | Yes      | Recipe title             |
| ingredients   | string[] | Yes      | List of ingredients      |
| instructions  | string[] | Yes      | Cooking steps            |
| originalQuery | object   | Yes      | Original generation data |

**Example Request:**

```json
{
  "title": "Italian Chicken and Rice",
  "ingredients": ["2 chicken breasts", "1 cup rice", "2 tomatoes"],
  "instructions": ["Step 1", "Step 2", "Step 3"],
  "originalQuery": {
    "ingredients": ["chicken", "rice", "tomatoes"],
    "preferences": ["low-carb"],
    "cuisine": "italian"
  }
}
```

**Success Response:**

**Status Code:** 201 Created

```json
{
  "message": "Recipe saved successfully!"
}
```

**Error Response:**

**Status Code:** 400 Bad Request

```json
{
  "message": "Recipe already saved."
}
```

#### Get Saved Recipes

```http
GET /api/recipe/saved
```

**Authentication:** Bearer Token required

**Success Response:**

**Status Code:** 200 OK

```json
[
  {
    "_id": "recipe_id",
    "title": "Italian Chicken and Rice",
    "ingredients": ["2 chicken breasts", "1 cup rice", "2 tomatoes"],
    "instructions": ["Step 1", "Step 2", "Step 3"],
    "originalQuery": {
      "ingredients": ["chicken", "rice", "tomatoes"],
      "preferences": ["low-carb"],
      "cuisine": "italian"
    },
    "createdAt": "timestamp",
    "updatedAt": "timestamp"
  }
]
```

#### Delete Recipe

```http
DELETE /api/recipe/saved/:id
```

**Authentication:** Bearer Token required

**Parameters:**

- `id`: Recipe ID to delete

**Success Response:**

**Status Code:** 200 OK

```json
{
  "message": "Recipe deleted successfully"
}
```

**Error Response:**

**Status Code:** 404 Not Found

```json
{
  "message": "Recipe not found"
}
```

### Status Codes

| Status Code | Description                             |
| ----------- | --------------------------------------- |
| 200         | Success                                 |
| 201         | Resource created                        |
| 400         | Bad request or validation error         |
| 401         | Unauthorized - Token missing or invalid |
| 404         | Resource not found                      |
| 500         | Server error                            |

To start using the application, run the development server:

```sh
npm install
nodemon run server
```
