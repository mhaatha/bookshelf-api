const { addBookToBookshelf, getAllBooks, getBookById, updateBook, deleteBook } = require('../handlers/book.handler');
const { bookshelfSchema, bookshelfQuerySchema } = require('../validations/book.validate');
const { postBookErrorHandler, putBookErrorHandler, getQueryErrorHandler } = require('../errors/book.error');

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
    options: {
      validate: {
        query: bookshelfQuerySchema,
        failAction: getQueryErrorHandler,
      }
    }
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
    options: {
      validate: {
        payload: bookshelfSchema,
        failAction: putBookErrorHandler,
      }
    }
  },
  {
    method: 'DELETE',
    path: '/books/{bookId}',
    handler: deleteBook,
  },
];
