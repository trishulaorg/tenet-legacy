# Tenet

Tenet is a meta-internet service.

## Technology Overview

Tenet is consisted of three servers: RDBMS, Next.js server, and Apollo server. Next.js handles HTTP requests, and all SSR things with React. Apollo is an API server, does GraphQL things; parsing queries, checking types, respond certain data to queries.

In each test environment, all servers above can be automatically set up and managed by **docker-compose**. For more detailed information, you can see `docker-compose.yml` and `Dockerfile`. Only things you have to do is cloning this repo and configuring environmental variables, and `sudo docker-compose up`.

## Authors

This software is written and maintained by @minamorl.

### Contributors

@mouroutai

## License

All rights reserved.
