'use strict';

const {Router} = require(`express`);

const articlesRoutes = new Router();

articlesRoutes.get(`/add`, (req, res) => res.send(`/articles/add`));
articlesRoutes.get(`/category/:id`, (req, res) => res.send(`/articles/category/:id`));
articlesRoutes.get(`/:id`, (req, res) => res.send(`/articles/:id`));
articlesRoutes.get(`/edit/:id`, (req, res) => res.send(`/articles/edit/:id`));


module.exports = articlesRoutes;
