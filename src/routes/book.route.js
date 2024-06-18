const { addBookToBookshelf, getAllBooks, getBookById, updateBook, deleteBook } = require('../handlers/book.handler');
const { bookshelfSchema } = require('../validations/book.validate');
const { postBookErrorHandler } = require('../errors/book.error');

module.exports = [
  {
    method: 'POST',
    path: '/books',
    handler: addBookToBookshelf,
    options: {
      validate: {
        payload: bookshelfSchema,
        failAction: postBookErrorHandler,
      },
    },
  },
  {
    method: 'GET',
    path: '/books',
    handler: getAllBooks,
  },
  {
    method: 'GET',
    path: '/books/{bookId}',
    handler: getBookById,
  },
  {
    method: 'PUT',
    path: '/books/{bookId}',
    handler: updateBook,
  },
  {
    method: 'DELETE',
    path: '/books/{bookId}',
    handler: deleteBook,
  },
];
