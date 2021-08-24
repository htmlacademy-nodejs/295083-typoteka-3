'use strict';

const {Router} = require(`express`);
const api = require(`../api`).getAPI();


const articlesRoutes = new Router();

articlesRoutes.get(`/add`, (req, res) => res.render(`new-post`));
articlesRoutes.get(`/category/:id`, (req, res) => res.render(`articles-by-category`));
articlesRoutes.get(`/:id`, (req, res) => res.send(`/articles/:id`));


articlesRoutes.get(`/edit/:id`, async (req, res) => {
  const {id} = req.params;
  const [article, categories] = await Promise.all([api.getArticle(id), api.getCategories()]);
  res.render(`edit-post`, {article, categories});
});


module.exports = articlesRoutes;
