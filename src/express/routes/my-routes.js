'use strict';

const {Router} = require(`express`);
const api = require(`../api`).getAPI();
const myRoutes = new Router();

myRoutes.get(`/`, async (req, res) => {
  const articles = await api.getArticles();
  res.render(`my`, {articles});
});

myRoutes.get(`/comments`, async (req, res) => {
  const articles = await api.getArticles();
  res.render(`comments`, {articles});
});

module.exports = myRoutes;

