# Tenet

Tenet is a meta-internet service.

## Technology Overview

Tenet is consisted of three servers: RDBMS, Next.js server, and Apollo server. Next.js handles HTTP requests, and all SSR things with React. Apollo is an API server, does GraphQL things; parsing queries, checking types, respond certain data to queries.

In each test environment, all servers above can be automatically set up and managed by **docker-compose**. For more detailed information, you can see `docker-compose.yml` and `Dockerfile`.

## Community

Join to our [Discord server](https://discord.gg/FFbNc55Hxf)!

## Development Steps

1. At first, you have to clone this repo
2. Execute `npm i --legacy-peer-deps` and `cp .env.example .env`
3. `.env` file. Ask config for admin.
4. Run `npm run docker:start-testdb`
5. Run `npm run migrate:test`
6. Run `npm run seed:test`
7. Run `npm run dev:docker-db`

## Examples

`.env.local`:

```
# Plane Scale develop branch
DATABASE_URL=YOUR_DB_URL
# Enable API mocking
NEXT_PUBLIC_API_MOCKING=enabled
```

`.env`:
```
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

See `LICENSE` in this repo.
