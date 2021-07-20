'use strict';

class CategoryService {
  constructor(articles) {
    this.articles = articles;
  }

  findAll() {
    const categories = this.articles.reduce((acc, articles) => {
      articles.category.forEach((category) => acc.add(category));
      return acc;
    }, new Set());

    return [...categories];
  }
}

module.exports = CategoryService;
