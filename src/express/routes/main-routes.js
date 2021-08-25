'use strict';

const {Router} = require(`express`);
const api = require(`../api`).getAPI();

const mainRoutes = new Router();

mainRoutes.get(`/`, async (req, res) => {
  const articles = await api.getArticles();
  res.render(`main`, {articles});
});
mainRoutes.get(`/register`, (req, res) => res.render(`sign-up`));
mainRoutes.get(`/login`, (req, res) => res.render(`login`));

mainRoutes.get(`/search`, async (req, res) => {
  const {search} = req.query;
  try {
    const results = search ? await api.search(search) : [];

    res.render(`search`, {results});
  } catch (error) {
    res.render(`search`, {results: []});
  }
});

mainRoutes.get(`/categories`, (req, res) => res.render(`all-categories`));

module.exports = mainRoutes;
