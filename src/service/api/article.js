'use strict';

const {Router} = require(`express`);
const {HttpCode} = require(`../../constants`);
const articleValidator = require(`../middlewares/articlesValidator`);
const articleExist = require(`../middlewares/articleExist`);

const route = new Router();

module.exports = (app, service) => {
  app.use(`/articles`, route);

  route.get(`/:articleId`, (req, res) => {
    const {articleId} = req.params;
    const article = service.findOne(articleId);

    if (!article) {
      return res.status(HttpCode.NOT_FOUND)
        .send(`Not found with ${articleId}`);
    }

    return res.status(HttpCode.OK)
      .json(article);
  });

  route.post(`/`, articleValidator, (req, res) => {
    const offer = service.create(req.body);

    return res.status(HttpCode.CREATED)
      .json(offer);
  });

  route.get(`/:articleId/comments`, articleExist(service), (req, res) => {
    const {article} = res.locals;
  });

};
