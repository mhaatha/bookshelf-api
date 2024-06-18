const bookshelf = require('../databases/bookshelf');
const { nanoid } = require('nanoid');

const addBookToBookshelf = (request, h) => {
  const {
    name,
    year,
    author,
    summary,
    publisher,
    pageCount,
    readPage,
    reading,
  } = request.payload;
  const id = nanoid(16);
  const insertedAt = new Date().toISOString();
  const updatedAt = insertedAt;

  // Error validation readPage must not exceed pageCount
  if (readPage > pageCount) {
    return h
      .response({
        status: 'fail',
        message:
          'Gagal menambahkan buku. readPage tidak boleh lebih besar dari pageCount',
      })
      .code(400);
  }

  const data = {
    id,
    name,
    year,
    author,
    summary,
    publisher,
    pageCount,
    readPage,
    finished: readPage === pageCount,
    reading,
    insertedAt,
    updatedAt,
  };

  // Push data into bookshelf
  bookshelf.push(data);

  // Is book pushed into bookshelf validation
  const isSuccess = bookshelf.filter((book) => book.id === id).length > 0;

  if (isSuccess) {
    return h
      .response({
        status: 'success',
        message: 'Buku berhasil ditambahkan',
        data: {
          bookId: id,
        },
      })
      .code(201);
  }
};

const getAllBooks = (request, h) => {
  const selectedProperties = bookshelf.map(({ id, name, publisher }) => ({
    id, name, publisher
  }));
  
  return h
    .response({
      status: 'success',
      data: {
        books: selectedProperties
      }
    })
    .code(200);
};

const getBookById = (request, h) => {
  return 'under maintenance';
};

const updateBook = (request, h) => {
  return 'under maintenance';
};

const deleteBook = (request, h) => {
  return 'under maintenance';
};

module.exports = {
  addBookToBookshelf,
  getAllBooks,
  getBookById,
  updateBook,
  deleteBook,
};
