'use strict';
const express = require(`express`);
const fs = require(`fs`).promises;

const DEFAULT_PORT = 3000;
const FILENAME = `./mocks1.json`;

const HttpCode = {
  OK: 200,
  CREATED: 201,
  NOT_FOUND: 404,
  INTERNAL_SERVER_ERROR: 500,
  FORBIDDEN: 403,
  UNAUTHORIZED: 401,
  BAD_REQUEST: 400,
};

const app = express();
app.use(express.json());

app.get(`/posts`, async (req, res) => {
  try {
    const fileContent = await fs.readFile(FILENAME);
    const mocks = JSON.parse(fileContent);
    res.json(mocks);
  } catch (err) {
    res.json([]);
  }
});

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


