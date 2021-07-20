'use strict';

const {nanoid} = require(`nanoid`);
const {MAX_ID_LENGTH} = require(`../../constants`);

class ArticleService {
  constructor(articles) {
    this._articles = articles;
  }

  create(offer) {
    const newOffer = Object
      .assign({id: nanoid(MAX_ID_LENGTH), comments: []}, offer);

    this._articles.push(newOffer);
    return newOffer;
  }

  drop(id) {
    const offer = this._articles.find((item) => item.id === id);

    if (!offer) {
      return null;
    }

    this._articles = this._articles.filter((item) => item.id !== id);
    return offer;
  }

  findAll() {
    return this._articles;
  }

  findOne(id) {
    return this._articles.find((item) => item.id === id);
  }

  update(id, article) {
    const oldArticle = this._articles
      .find((item) => item.id === id);

    return Object.assign(oldArticle, article);
  }

}
module.exports = ArticleService;
