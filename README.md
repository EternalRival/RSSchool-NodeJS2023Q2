# CRUD API

API to store hobby information

## Setup

- Use 18 LTS version of Node.js
- Clone this repo: `$ git clone https://github.com/EternalRival/node-CRUD-API.git`
- Go to project directory: `$ cd node-CRUD-API`
- Install dependencies: `$ npm install`
- Create `.env` file with `SERVER_PORT=3000` variable in the project root directory. You can set the server port to any available value (default is `3000`)
- Start server: `$ npm run start:prod`
- When the server is started, you can send requests to the address `http://127.0.0.1:3000`

## Usage

- Users CRUD
  - [Get Users](#get-users)
  - [Get User](#get-user)
  - [Create User](#create-user)
  - [Update User](#update-user)
  - [Delete User](#delete-user)
- Common Errors
  - [NOT FOUND](#not-found)
  - [INTERNAL SERVER ERROR](#internal-server-error)

## Get Users

Get a list of users in JSON format

|          |              |
| -------- | ------------ |
| Endpoint | `/api/users` |
| Method   | `GET`        |
| Body     |              |

```bash
# Request Example
curl -L '127.0.0.1:3000/api/users'
```

```ts
/** Success Response */
Code: 200
Body: { id: uuid, username: string, age: number, hobbies: string[] }[]
```

## Get User

Get data about a specific user in JSON format

|          |                    |
| -------- | ------------------ |
| Endpoint | `/api/users/:uuid` |
| Method   | `GET`              |
| Body     |                    |

```bash
# Request Example
curl -L '127.0.0.1:3000/api/users/82cafeaa-47bd-475b-82b1-e499e7e8d2a1'
```

```ts
/** Success Response */
Code: 200
Body: { id: uuid, username: string, age: number, hobbies: string[] }

/** Error Response */
Code: 400
Body: "Invalid ID. Provide the correct UUID"

/** Error Response */
Code: 404
Body: "User doesn't exist"
```

## Create User

Create and add user to the database

|          |                                                        |
| -------- | ------------------------------------------------------ |
| Endpoint | `/api/users`                                           |
| Method   | `POST`                                                 |
| Body     | `{ username: string, age: number, hobbies: string[] }` |

```bash
# Request Example
curl -L '127.0.0.1:3000/api/users' -H 'Content-Type: application/json' -d '{"username":"John","age":33,"hobbies":["diving","snowboarding"]}'
```

```ts
/** Success Response */
Code: 201
Body: { id: uuid, username: string, age: number, hobbies: string[] }

/** Error Response */
Code: 400
Body: "Request body does not contain required fields. Provide object with proper types: { username: string, age: number, hobbies: string[] }"
```

## Update User

Change the data about the user in the database

|          |                                                        |
| -------- | ------------------------------------------------------ |
| Endpoint | `/api/users/:uuid`                                     |
| Method   | `PUT`                                                  |
| Body     | `{ username: string, age: number, hobbies: string[] }` |

```bash
# Request Example
curl -L -X PUT '127.0.0.1:3000/api/users/82cafeaa-47bd-475b-82b1-e499e7e8d2a1' -H 'Content-Type: application/json' -d '{"username":"Jane","age":33,"hobbies":["diving","snowboarding"]}'
```

```ts
/** Success Response */
Code: 200
Body: {id:uuid, username:string, age:number, hobbies: string[]}

/** Error Response */
Code: 400
Body: "Invalid ID. Provide the correct UUID"

/** Error Response */
Code: 404
Body: "User doesn't exist"
```

## Delete User

Delete user from a database

|          |                    |
| -------- | ------------------ |
| Endpoint | `/api/users/:uuid` |
| Method   | `DELETE`           |
| Body     |                    |

```bash
# Request Example
curl -L -X DELETE '127.0.0.1:3000/api/users/82cafeaa-47bd-475b-82b1-e499e7e8d2a1'
```

```ts
/** Success Response */
Code: 204
Body:

/** Error Response */
Code: 400
Body: "Invalid ID. Provide the correct UUID"

/** Error Response */
Code: 404
Body: "User doesn't exist"
```

## NOT FOUND

Non-existent endpoint

```ts
/** Error Response */
Code: 404
Body: "Invalid endpoint/url"
```

## INTERNAL SERVER ERROR

Internal server error

```ts
/** Error Response */
Code: 500
Body: "INTERNAL SERVER ERROR"
```
