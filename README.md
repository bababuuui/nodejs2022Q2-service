# Home Library Service

## Prerequisites

- Git - [Download & Install Git](https://git-scm.com/downloads).
- Node.js - [Download & Install Node.js](https://nodejs.org/en/download/) and the npm package manager.

## Downloading

```
git clone https://github.com/bababuuui/nodejs2022Q2-service.git
```

## Installing NPM modules

```
npm install
```

## Running application

```
npm start
```
## Running application in dev mode

```
npm start:dev
```
After starting the app on port (4000 as default) you can open
in your browser OpenAPI documentation by typing http://localhost:4000/doc/.
For more information about OpenAPI/Swagger please visit https://swagger.io/.

## Testing

After application running open new terminal and enter:

To run all tests without authorization

```
npm run test
```

To run only one of all test suites

```
npm run test -- <path to suite>
```

To run all test with authorization

```
npm run test:auth
```

To run only specific test suite with authorization

```
npm run test:auth -- <path to suite>
```

### Auto-fix and format

```
npm run lint
```

```
npm run format
```

### Debugging in VSCode

Press <kbd>F5</kbd> to debug.

For more information, visit: https://code.visualstudio.com/docs/editor/debugging



###Docker



+20 Readme.md has instruction how to run application
**+30 user-defined bridge is created and configured**
_+30 container auto restart after crash_
+20 application is restarting upon changes implemented into src folder
_+30 database files and logs to be stored in volumes instead of container_
Advanced Scope

+20 Final size of the Docker image with application is less than 300 MB
+10 Implemented npm script for vulnerabilities scanning (free solution)
+20 Your built image is pushed to DockerHub
Forfeits

-30% of total task score Commits after deadline (except commits that affect only Readme.md, .gitignore, etc.)
-20 Missing PR
-10 PR description is incorrect
-20 No separate development branch
-20 docker-compose.yml contains hardcoded variables
-20 In case specific image is not used (it is required to use images like postgres and node, but not ubuntu with installation of node or postgres)
**-20 Postgres container is not configured as dependency for application container**