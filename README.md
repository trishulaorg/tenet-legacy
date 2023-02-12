# Tenet

Tenet is a meta-internet service.

## Technology Overview

Tenet is consisted of three servers: RDBMS, Next.js server, and Apollo server. Next.js handles HTTP requests, and all SSR things with React. Apollo is an API server, does GraphQL things; parsing queries, checking types, respond certain data to queries.

In each test environment, all servers above can be automatically set up and managed by **docker-compose**. For more detailed information, you can see `docker-compose.yml` and `Dockerfile`.

## Community

Join to our [Discord server](https://discord.gg/FFbNc55Hxf)!

## Development Steps

### Note

**Since the back end has not yet reached the stage of working, we need to confirm that it works with Mock.**

1. At first, you have to clone this repo
2. Execute `npm i`
3. Set NEXT_PUBLIC_API_MOCKING=enabled.
4. `npm run dev`

## Examples

`.env.local`:

```
# Enable API mocking
NEXT_PUBLIC_API_MOCKING=enabled
```

## Authors

This software is written and maintained by @minamorl.

## License

See `LICENSE` in this repo.
