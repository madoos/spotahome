# Spotahome Challenge

- [Requirements](#Requirements)
- [Implemented challenges](#Implemented-challenges)
- [How to launch the app?](#How-to-launch-the-app)
- [How use the app?](#How-use-the-app)
- [Development approach](#Development-approach)
- [Development context](#Development-context)

## Requirements

- node ^8.11.1
- npm ^6.1.0
- docker ^18.09.0
- docker-compose ^1.23.1

## Implemented challenges

- [x] [basic] Step 1: Expose the properties collection and detailed info in a custom API
- [x] [BASIC] Step 1: Expose the properties collection and detailed info in a custom API
- [x] [ADVANCED 1] Cache markers and homecards information
- [x] [ADVANCED 1 BONUS] cache/store
- [x] [ADVANCED 2] Show the number of active users in the current listing (Real time approach)

## How to launch the app?

- Docker
- Easy way
- Manual

**Docker**

Not ready for production (front use webpack-dev-server).
IMPORTANT: `build and launch apps but API and socket connection is unstable` (only occurred in containers)

```bash
# in root folder
docker-compose up

```

**Easy way:**

```bash
# in root folder
npm start

```

The command executes:

- Run redis with docker.
- Install dependencies on root, back and front.
- Run front and back test.
- Launch with pm2 Client, API, client coverage, back coverage servers.
- Open in browser client app (2 windows), api docs, client coverage and back coverage if it is supported

To tears down the servers and cache use:

```bash
# in root folder
npm run stop
```

**Manual**

```bash
# in root folder
docker-compose up -d cache
npm install
npm --prefix back install
npm --prefix front install
npm --prefix back test
npm --prefix front test
npm --prefix back run serve:coverage
npm --prefix front run serve:coverage
npm --prefix back start
npm --prefix front run build:dev
```

## How use the app?

- Open in browser (2 windows) `http://<HOST>:9000`.
- See the home page.
- Select a house and click on the detail button.
- To return to the home page click on back button of the browser.

**See users viewing a property in real time**

- Open in browser (2 windows or more for many users) `http://<HOST>:9000`.
- Select the same property in each window
- See the notification on page.
- Close tab or return to home page.

**IMPORTANT**

- Every time you see the house detail
  you are considered a new user (because the app is without authentication)
- If you open `http://<HOST>:9000/detail/<ID>` does not work because the app is rendered in client.

## Development approach

- Application developed in "monorepo style"
- developed with TDD approach, to pass tests while developing use the command `npm run tdd` inside each project
- The unit tests are located on the same route of source file with extension `*.spec.js`
- The e2e tests are located in the`__tests__` folder.
- Include commit style validation with [commitlint standard](https://github.com/marionebl/commitlint/tree/master/%40commitlint/config-conventional#type-enum)
- Include code style with eslint
- Include Automatic code format with prettier-eslint
- Include Automatic changelog creation `npm run changelog`

## Development context

Important development decisions are in the README.md in each project folder (back and front).
