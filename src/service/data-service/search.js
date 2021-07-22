'use strict';

class SearchService {
  constructor(articles) {
    this._articles = articles;
  }

  search(query) {
    return this._articles.filter((item) => item.title.includes(query));
  }
}

module.exports = SearchService;
