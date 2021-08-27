'use strict';

const {HttpCode} = require(`../../constants`);

const articlesKeys = [`title`, `announce`, `fullText`, `createdDate`, `category`, `fdf`];

module.exports = (req, res, next) => {
  const newArticle = req.body;
  const keys = Object.keys(newArticle);
  const keysExists = articlesKeys.every((key) => keys.includes(key));

  if (!keysExists) {
    return res.status(HttpCode.BAD_REQUEST)
      .send(`Bad request`);
  }

  next();
};
