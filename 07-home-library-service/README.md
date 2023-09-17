# Home Library Service

## Table of Contents

1. [Prerequisites](#prerequisites)
2. [Git & NodeJS](#git--nodejs)
    1. [Notes](#notes)
    2. [Downloading](#downloading)
    3. [Installing NPM modules](#installing-npm-modules)
    4. [Setting server variables](#setting-server-variables)
3. [Docker](#docker)
    1. [Notes](#notes)
    2. [Running application](#running-application)
    3. [Other useful scripts](#other-useful-scripts)
4. [Documentation](#documentation)
    1. [Swagger (OpenAPI)](#swagger-openapi)

## Prerequisites

- Git - [Download & Install Git](https://git-scm.com/downloads).
- Node.js - [Download & Install Node.js](https://nodejs.org/en/download/) and the npm package manager.
- Docker - [Download & Install Docker Desktop](https://docs.docker.com/engine/install/) (Docker + Docker Compose)

## Git & NodeJS

### Notes

> Use 18 LTS version of Node.js

### Downloading

```sh
git clone {repository URL}
```

### Installing NPM modules

```sh
npm install
```

### Setting server variables

```sh
# use `env:generate` npm script to generate `.env` file with REPL
# (leave blank by pressing Enter to use the default values)
npm run env:generate

# or just copy .env file from example
cp .env.example .env
```

```sh
# .env notes
PGHOST=localhost
PGPORT=5432 # valid port (0 <= n <= 65535)
PGDATABASE=hls-db
PGUSER=hls-user
PGPASSWORD=hls-password
PORT=4000 # valid port (0 <= n <= 65535)
LOGGING_LEVEL=5 # valid logging level (0 <= n <= 5) where 0===`no logs` and 5===`all logs`
MAX_FILE_SIZE=10240 # max log file size in bytes
ENABLE_LOGS_FILES=1 # 0 for `off` / 1 for `on` (logs are stored in the `/logs` dir)
CRYPT_SALT=10
JWT_SECRET_KEY=secret123123
JWT_SECRET_REFRESH_KEY=secret123123
TOKEN_EXPIRE_TIME=1h
TOKEN_REFRESH_EXPIRE_TIME=24h
```

## Docker

### Notes

> NB! Make sure you are not running any third-party containers/applications that may conflict with the current application (busy ports, etc.)
>
> - App logs are written in the `./logs:/usr/app/logs` volume (`/logs` dir in app root)
> - Database logs are written in the `db-logs:/var/log/postgresql` volume
> - Database data is written to `db-data:/var/lib/postgresql/data` volume

### Running application

```sh
# create and start containers
npm run docker:up
```

### Other useful scripts

```sh
# launch tests
npm run test:auth

# stop and remove docker containers, networks
npm run docker:down

# vulnerability scan
npm run docker:scout

# create empty migration file
npm run typeorm:create --name=MigrationName

# generate migration file from code
npm run typeorm:generate --name=MigrationName

# lint with --fix and format
npm run lintf
```

## Documentation

### Swagger (OpenAPI)

link for `localhost:4000` server: [http://localhost:4000/doc](http://localhost:4000/doc)

All endpoints (except `auth/signup`, `auth/login`, `/doc` and `/`) are protected with JWT authentication
You should provide JWT token in `Authorization: Bearer <jwt_token>` request header

1. Sign Up (if you haven't done it before) via `auth/signup`
2. Login with your `login` and `password` and get tokens via `auth/login`
3. Press `Authorize` button and use your `accessToken`
![Authorization](https://github.com/EternalRival/nodejs2023Q2-service/assets/59611223/22d81d77-efe9-41cb-9e4e-20358ee9fe4f)
