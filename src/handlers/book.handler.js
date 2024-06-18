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
    const response = h.response({
      status: 'fail',
      message:
        'Gagal menambahkan buku. readPage tidak boleh lebih besar dari pageCount',
    });
    response.code(400);
    return response;
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
    const response = h.response({
      status: 'success',
      message: 'Buku berhasil ditambahkan',
      data: {
        bookId: id,
      },
    });
    response.code(201);
    return response;
  }
};

const getAllBooks = (request, h) => {
  return nanoid(16).length;
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
