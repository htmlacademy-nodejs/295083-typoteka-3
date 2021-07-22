'use strict';
const express = require(`express`);

const {HttpCode, API_PREFIX} = require(`../../constants`);
const routes = require(`../api`);

const DEFAULT_PORT = 3000;

const app = express();
app.use(express.json());
app.use(API_PREFIX, routes);

app.use((req, res) => res
  .status(HttpCode.NOT_FOUND)
  .send(`Not found`));

module.exports = {
  name: `--server`,
  run(portFromUser) {
    const port = Number.parseInt(portFromUser, 10) || DEFAULT_PORT;
    try {
      app.listen(port, () => console.info(`listening port ${port}`));
    } catch (err) {
      process.exit(1);
    }
  }
};


