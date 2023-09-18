# Home Library Service: Containerization, Docker and Database & ORM

1. Link to the task: [REST service: Containerization, Docker and Database & ORM](https://github.com/AlreadyBored/nodejs-assignments/blob/main/assignments/containerization-database-orm/assignment.md)
2. Deadline date: 2023-08-15 03:00 (UTC +03:00)
3. Self-check with a preliminary assessment (360/360)

## Scoring: REST service: Containerization and Database (PostgreSQL) & ORM

### Basic Scope

#### 1) Containerization, Docker

- [x] **+20** `Readme.md` has instruction how to run application
- [x] **+30** `user-defined bridge` is created and configured
- [x] **+30**  container auto restart after crash
- [x] **+20** application [is restarting](https://i.imgur.com/eGUN42M.mp4) upon changes implemented into `src` folder ([video](https://i.imgur.com/eGUN42M.mp4))
  > some Windows users have problems with hot reloading the project. trying to reproduce the bug on my WSL2 Arch linux, but so far without success, so I added a link to the video
- [x] **+30** database files and logs to be stored in volumes instead of container

#### 2) Database (PostgreSQL) & ORM

- [x] **+20** `Users` data is stored in **PostgreSQL** database and `typeorm` / `prisma`  interacts with the database to manipulate data.  
- [x] **+20** `Artists` data is stored in **PostgreSQL** database and `typeorm` / `prisma`  interacts with the database to manipulate data.
- [x] **+20** `Albums` data is stored in **PostgreSQL** database and `typeorm` / `prisma`  interacts with the database to manipulate data.
- [x] **+20** `Tracks` data is stored in **PostgreSQL** database and `typeorm` / `prisma`  interacts with the database to manipulate data.
- [x] **+20** `Favorites` data is stored in **PostgreSQL** database and `typeorm` / `prisma`  interacts with the database to manipulate data.

### Advanced Scope

#### 1) Containerization, Docker

- [x] **+20** Final size of the Docker image with application is less than 500 MB
- [x] **+10** Implemented npm script for vulnerabilities scanning (free solution)
- [x] **+20** Your built image is [pushed to DockerHub](https://hub.docker.com/r/eternalrival/home-library-service/tags)
![image](https://github.com/EternalRival/nodejs2023Q2-service/assets/59611223/2cebdd52-576b-4863-94be-e5fe8e05adb7)

#### 2) Database & ORM

- [x] **+30** Migrations are used to create database entities
- [x] **+10** Variables used for connection to database to be stored in `.env`
- [x] **+10** `typeorm` [decorators](https://typeorm.io/#/relations) or `prisma` relations create relations between entities
- [x] **+30** Local **PostgreSQL** installation is not required for task check, connection is implemented to database stored in `docker` container  (on the basis of the previous task)

### Forfeits

- [ ] **-20** In case specific image is not used (it is required to use images like `postgres` and `node`, but not `ubuntu` with installation of `node` or `postgres`)
- [ ] **-20** Postgres container is not configured as dependency for application container
- [ ] **-10** for each failing test with `npm run test`
- [ ] **-20** `docker-compose.yml` contains hardcoded variables
- [ ] **-30% of total task score** Commits after deadline, except commits that affect only Readme.md, .gitignore, etc.
- [ ] **-40** No Pull Request created  
- [ ] **-20** PR description is incorrect
- [ ] **-40** No separate development branch
- [ ] **-10** for each failing test with `npm run test`
- [ ] **-20** Less than 3 commits in the development branch, not taking into account commits, making changes only in `Readme.md` or similar files (`tsconfig.json`, `.gitignore`, `.prettierrc.json`, etc.)
- [ ] **-10 points** for each error either on `npm run lint` on the basis of the **local config** or for compilation errors on the basis of the **local tsconfig** (`errors` not `warnings`).
