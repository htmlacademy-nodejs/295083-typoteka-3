'use strict';

const chalk = require(`chalk`);

const fs = require(`fs`).promises;
const {getRandomInt, shuffle, randomDate} = require(`./utils`);

const DEFAULT_COUNT = 1;
const EXIT_ERROR_CODE = 1;
const MAX_COUNT = 1000;
const FILE_SENTENCES_PATH = `./src/data/sentences.txt`;
const FILE_TITLES_PATH = `./src/data/titles.txt`;
const FILE_CATEGORIES_PATH = `./src/data/categories.txt`;
const FILE_NAME = `mocks.json`;

const readContent = async (filePath) => {
  try {
    const content = await fs.readFile(filePath, `utf8`);
    return content.split(`\n`);
  } catch (err) {
    console.error(chalk.red(err));
    return [];
  }
};

const generateOffers = (count, titles, announce, categories) => (
  Array(count).fill({}).map(() => ({
    title: titles[getRandomInt(0, titles.length - 1)],
    announce: shuffle(announce).slice(1, getRandomInt(2, 6)).join(` `),
    fullText: shuffle(announce).slice(1, getRandomInt(2, announce.length)).join(` `),
    createdDate: randomDate(),
    category: shuffle(categories).slice(1, getRandomInt(2, categories.length))
  }))
);

module.exports = {
  name: `--generate`,
  run: async (count) => {
    const announce = await readContent(FILE_SENTENCES_PATH);
    const titles = await readContent(FILE_TITLES_PATH);
    const categories = await readContent(FILE_CATEGORIES_PATH);

    const countOffer = Number.parseInt(count, 10) || DEFAULT_COUNT;
    if (countOffer > MAX_COUNT) {
      console.error(chalk.red(`Не больше 1000 публикаций`));
      process.exit(EXIT_ERROR_CODE);
    }
    const content = JSON.stringify(generateOffers(countOffer, titles, announce, categories));
    try {
      await fs.writeFile(FILE_NAME, content);
      console.info(chalk.green(`Operation success. File created.`));
    } catch (err) {
      console.error(chalk.red(`Can't write data to file.`));
    }
  }
};

