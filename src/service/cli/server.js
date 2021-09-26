'use strict';
const express = require(`express`);
const {getLogger} = require(`../lib/logger`);

const {HttpCode, API_PREFIX} = require(`../../constants`);
const routes = require(`../api`);
const sequelize = require(`../lib/sequelize`);

const DEFAULT_PORT = 3000;

const app = express();
const logger = getLogger({name: `api`});
app.use(express.json());

app.use((req, res, next) => {
  logger.info(`Request on route ${req.url}`);
  res.on(`finish`, () => {
    logger.info(`Response status code ${res.statusCode}`);
  });
  next();
});

app.use(API_PREFIX, routes);

app.use((req, res) => {
  res.status(HttpCode.NOT_FOUND)
  .send(`Not found`);
  logger.error(`Route not found: ${req.url}`);
});

app.use((err, _req, _res, _next) => {
  logger.error(`An error occurred on processing request: ${err.message}`);
});

module.exports = {
  name: `--server`,
  async run(portFromUser) {
    const port = Number.parseInt(portFromUser, 10) || DEFAULT_PORT;
    try {
      logger.info(`Trying to connect to database...`);
      await sequelize.authenticate();
      app.listen(port, (err) => {
        if (err) {
          return logger.error(`An error occurred on server creation: ${err.message}`);
        }
        return logger.info(`Listening to connections on ${port}`);
      });
    } catch (err) {
      logger.error(`An error occurred: ${err.message}`);
      process.exit(1);
    }
    logger.info(`Connection to database established`);
  }
};


