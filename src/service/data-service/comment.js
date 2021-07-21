'use strict';

const {nanoid} = require(`nanoid`);
const {MAX_ID_LENGTH} = require(`../../constants`);

class CommentService {

  create(article, comment) {
    const newComment = Object
      .assign({id: nanoid(MAX_ID_LENGTH)}, comment);

    article.comments.push(newComment);
    return newComment;
  }

  drop(article, commentId) {
    const {comments = []} = article;

    const comment = comments.find((item) => item.id === commentId);

    if (!comment) {
      return null;
    }

    return comments.filter((item) => item.id !== commentId);
  }

  findAll(article) {
    return article.comments;
  }

}
module.exports = CommentService;
