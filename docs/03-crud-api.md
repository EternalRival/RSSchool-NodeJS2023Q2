# CRUD API

1. Link to the task: [Simple CRUD-API](https://github.com/AlreadyBored/nodejs-assignments/blob/main/assignments/crud-api/assignment.md)
2. Deadline date: 2023-07-04 03:00 (UTC +03:00)
3. Self-check with a preliminary assessment (139/222)

## Notes

- Use 18 LTS version of Node.js
- `dotenv`, `typescript`, `ts-node-dev`, `eslint` and its plugins, `webpack-cli`, `webpack` and its plugins, `prettier`, `uuid`, `@types/*` are allowed and used.
- **NB!** The last force push was done only to undo the commit that removes `jest` from the project. (in this commit the jest was removed in a bad way). In fact, there are no commits after the deadline

-----------------

## Scoring: CRUD API

### Basic Scope

- [x] **+10** The repository with the application contains a `Readme.md` file containing detailed instructions for installing, running and using the application
- [x] **+10** **GET** `api/users` implemented properly
- [x] **+10** **GET** `api/users/{userId}` implemented properly
- [x] **+10** **POST** `api/users` implemented properly
- [x] **+10** **PUT** `api/users/{userId}` implemented properly
- [x] **+10** **DELETE** `api/users/{userId}` implemented properly
- [x] **+6** Users are stored in the form described in the technical requirements
- [-] **+6** Value of `port` on which application is running is stored in `.env` file
  - [x] `port` is stored in `.env` file and [read properly](https://github.com/EternalRival/node-CRUD-API/blob/dev/src/index.ts#L1C1-L6)
  - [ ] `port` is correctly applied by the server to start
    > There is some bug with port in `.env`. Application [read port from `.env` correctly](https://github.com/EternalRival/node-CRUD-API/blob/dev/src/index.ts#L1C1-L6), but ignore it. There is a [fix](https://github.com/EternalRival/node-CRUD-API/assets/59611223/e748d996-ebe0-4a85-bd70-e367b5799732) (unmerged, cuz `3 points` not worth `-30% forfeit`)
    >
### Advanced Scope

- [x] **+30** Task implemented on Typescript
- [x] **+10** Processing of requests to non-existing endpoints implemented properly
- [x] **+10** Errors on the server side that occur during the processing of a request should be handled and processed properly
- [x] **+10** Development mode: `npm` script `start:dev` implemented properly
- [x] **+10** Production mode: `npm` script `start:prod` implemented properly

### Hacker Scope

- [ ] **+30** There are tests for API (not less than **3** scenarios)
- [ ] **+50** There is horizontal scaling for application with a **load balancer**

### Forfeits

- [ ] **-95% of total task score** any external tools except `nodemon`, `dotenv`, `cross-env`, `typescript`, `ts-node`, `ts-node-dev`, `eslint` and its plugins, `webpack` and its plugins, `prettier` and it's plugins, `uuid`, `@types/*` as well as libraries used for testing
- [ ] **-30% of total task score** Commits after deadline (except commits that affect only Readme.md, .gitignore, etc.)
- [ ] **-20** Missing PR or its description is incorrect
- [ ] **-20** No separate development branch
- [ ] **-20** Less than 3 commits in the development branch, not including commits that make changes only to `Readme.md` or similar files (`tsconfig.json`, `.gitignore`, `.prettierrc.json`, etc.)
