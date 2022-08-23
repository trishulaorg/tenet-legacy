# Tenet

Tenet is a meta-internet service.

## Technology Overview

Tenet is consisted of three servers: RDBMS, Next.js server, and Apollo server. Next.js handles HTTP requests, and all SSR things with React. Apollo is an API server, does GraphQL things; parsing queries, checking types, respond certain data to queries.

In each test environment, all servers above can be automatically set up and managed by **docker-compose**. For more detailed information, you can see `docker-compose.yml` and `Dockerfile`.

## Development Steps

1. At first, you have to clone this repo
2. Execute `npm install` and `cp .env.example .env`
3. Add auth0 config to `.env` file. Ask config for admin or get your own from [Auth0 Dashboard](https://manage.auth0.com) > Applications > YourAppName > Quick Start > Regular Web App > Next.js. Set up pusher and miscs (ask to admin)
4. Run `npm run docker:start-testdb`
5. Run `npm run dev:docker-db` 

## Examples

`.env.local`:

```
# Plane Scale develop branch
DATABASE_URL=YOUR_DB_URL
```

`.env`:
```
API_TOKEN_SECRET=RANDOM_STRING
#
# Auth0 related
#
# A long, secret value used to encrypt the session cookie
AUTH0_SECRET=
# The base url of your application
AUTH0_BASE_URL=
# The url of your Auth0 tenant domain
AUTH0_ISSUER_BASE_URL=
# Your Auth0 application's Client ID
AUTH0_CLIENT_ID=
# Your Auth0 application's Client Secret
AUTH0_CLIENT_SECRET=

STORAGE_ACCESS_KEY_ID=
STORAGE_SECRET_ACCESS_KEY=t
STORAGE_ENDPOINT=
STORAGE_BUCKET_NAME=
STORAGE_REGION=

PUSHER_APP_ID=
PUSHER_KEY=
PUSHER_SECRET=
PUSHER_CLUSTER=
```

## API Test Steps

1. Run `npm install` before all
2. Run `npm run docker:start-testdb`
3. Run `npm run dev:docker-db`
4. Run `npm run test`

During developing this software, you might repeat step 3 to 5. If there's a problem let me know. I've only tested on my Ubuntu environment.

## Authors

This software is written and maintained by @minamorl.

## License

All rights reserved.
