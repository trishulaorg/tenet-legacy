# Tenet

Tenet is a meta-internet service.

## Technology Overview

Tenet is consisted of three servers: RDBMS, Next.js server, and Apollo server. Next.js handles HTTP requests, and all SSR things with React. Apollo is an API server, does GraphQL things; parsing queries, checking types, respond certain data to queries.

In each test environment, all servers above can be automatically set up and managed by **docker-compose**. For more detailed information, you can see `docker-compose.yml` and `Dockerfile`.

## Development Steps

1. At first, you have to clone this repo
2. Execute `npm install` and `cp .env.example .env`
3. Add auth0 config to `.env` file. Ask config for Iwata or use your own from [Auth0 Dashboard](https://manage.auth0.com) > Applications > YourAppName > Quick Start > Regular Web App > Next.js
4. Confirm you have already installed docker and docker-compose. then `docker compose build`
5. `docker compose up` to make docker images work.
6. After testing, you have to do `docker compose down` to clean up the environment.
7. Access to `localhost:8080`

During developping this software, you might repeat step 3 to 5. If there's a problem let me know. I've only tested on my Ubuntu environment.

## Authors

This software is written and maintained by @minamorl.

## License

All rights reserved.
