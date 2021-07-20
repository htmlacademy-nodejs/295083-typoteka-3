'use strict';
const {Router} = require(`express`);
const category = require(`../api/category`);
const article = require(`../api/article`);
const getMockData = require(`../lib/get-mock-data`);

const {
  CategoryService,
  ArticleService
} = require(`../data-service`);

const app = new Router();


(async () => {
  const mockData = await getMockData();
  category(app, new CategoryService(mockData));
  article(app, new ArticleService(mockData));
})();

module.exports = app;
