const { addBookToBookshelf, getAllBooks, getBookById, updateBook, deleteBook } = require('../handlers/book.handler');

module.exports = [
  {
    method: 'POST',
    path: '/books',
    handler: addBookToBookshelf,
  },
  {
    method: 'GET',
    path: '/books',
    handler: getAllBooks
  },
  {
    method: 'GET',
    path: '/books/{bookId}',
    handler: getBookById
  },
  {
    method: 'PUT',
    path: '/books/{bookId}',
    handler: updateBook
  },
  {
    method: 'DELETE',
    path: '/books/{bookId}',
    handler: deleteBook
  }
];
