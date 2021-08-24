'use strict';

const chalk = require(`chalk`);
const {nanoid} = require(`nanoid`);
const fs = require(`fs`).promises;
const {MAX_ID_LENGTH} = require(`../../constants`);

const {getRandomInt, shuffle, randomDate} = require(`./utils`);

const DEFAULT_COUNT = 1;
const EXIT_ERROR_CODE = 1;
const MAX_COUNT = 1000;
const FILE_SENTENCES_PATH = `./src/data/sentences.txt`;
const FILE_TITLES_PATH = `./src/data/titles.txt`;
const FILE_CATEGORIES_PATH = `./src/data/categories.txt`;
const FILE_COMMENTS_PATH = `./src/data/comments.txt`;
const FILE_NAME = `mocks.json`;

const MAX_COMMENTS = 4;

const readContent = async (filePath) => {
  try {
    const content = await fs.readFile(filePath, `utf8`);
    const arr = content.split(`\n`);
    arr.pop();
    return arr;
  } catch (err) {
    console.error(chalk.red(err));
    return [];
  }
};

const generateComments = (count, comments) => (
  Array(count).fill({}).map(() => ({
    id: nanoid(MAX_ID_LENGTH),
    text: shuffle(comments)
      .slice(0, getRandomInt(1, 3))
      .join(` `),
  }))
);

const generateOffers = (count, titles, announce, categories, comments) => (
  Array(count).fill({}).map(() => ({
    id: nanoid(MAX_ID_LENGTH),
    title: titles[getRandomInt(0, titles.length - 1)],
    announce: shuffle(announce).slice(0, getRandomInt(2, 6)).join(` `),
    fullText: shuffle(announce).slice(0, getRandomInt(2, announce.length)).join(` `),
    createdDate: randomDate(),
    category: shuffle(categories).slice(0, getRandomInt(2, 4)),
    comments: generateComments(getRandomInt(1, MAX_COMMENTS), comments)
  }))
);

module.exports = {
  name: `--generate`,
  run: async (count) => {
    const announce = await readContent(FILE_SENTENCES_PATH);
    const titles = await readContent(FILE_TITLES_PATH);
    const categories = await readContent(FILE_CATEGORIES_PATH);
    const comments = await readContent(FILE_COMMENTS_PATH);

    const countOffer = Number.parseInt(count, 10) || DEFAULT_COUNT;
    if (countOffer > MAX_COUNT) {
      console.error(chalk.red(`Не больше 1000 публикаций`));
      process.exit(EXIT_ERROR_CODE);
    }
    const content = JSON.stringify(generateOffers(countOffer, titles, announce, categories, comments));
    try {
      await fs.writeFile(FILE_NAME, content);
      console.info(chalk.green(`Operation success. File created.`));
    } catch (err) {
      console.error(chalk.red(`Can't write data to file.`));
    }
  }
};

