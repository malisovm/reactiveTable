# Reactive Table

This is a sample app I wrote as a test assignment. It is a sortable table with a filter and pagination, written from scratch without any ready-made components. The data is stored in a PostgreSQL database.

### Stack

- TypeScript
- React
- Node.js / Express
- PostgreSQL

### Live version

A deployed version is available here [here](https://reactive-table.cyclic.app).

### Building

The [/dev](https://github.com/malisovm/reactive_table) branch can be launched with `cd widget && npm run start` + `cd server && node server.js`. If you want to run build, remove the proxy line from package.json. The compiled version is in the [/deploy](https://github.com/malisovm/reactive_table/tree/deploy) branch.