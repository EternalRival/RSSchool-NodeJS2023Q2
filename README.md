# Home Library Service

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
LOGGING_LEVEL=5 # valid logging level (0 <= n <= 5)
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
> Database logs are written in the `db-logs:/var/log/postgresql` volume
> Database data is written to `db-data:/var/lib/postgresql/data` volume

### Running application

```sh
# create and start containers
npm run docker:up
```

### Other useful scripts

```sh
# launch tests
npm run docker:test

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
<!-- 
After starting the app on port (4000 as default) you can open
in your browser OpenAPI documentation by typing <http://localhost:4000/doc/>.
For more information about OpenAPI/Swagger please visit <https://swagger.io/>.
>An `application/json` format should be used for request and response body. -->
<!-- 
## Testing

After application running open new terminal and enter:

To run all tests without authorization

```sh
npm run test
```

To run only one of all test suites

```sh
npm run test -- <path to suite>
```

To run all test with authorization

```sh
npm run test:auth
```

To run only specific test suite with authorization

```sh
npm run test:auth -- <path to suite>
```
 -->
### Auto-fix and format

```sh
npm run lint
```

```sh
npm run format
```

### Debugging in VSCode

Press **`F5`** to debug.

For more information, visit: <https://code.visualstudio.com/docs/editor/debugging>
