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

  // Error validations Status Code = 400
  if (name === undefined || name === '') {
    const response = h.response({
      status: 'fail',
      message: 'Gagal menambahkan buku. Mohon isi nama buku',
    });
    response.code(400);
    return response;
  }
  if (readPage > pageCount) {
    const response = h.response({
      status: 'fail',
      message: 'Gagal menambahkan buku. readPage tidak boleh lebih besar dari pageCount',
    });
    response.code(400);
    return response;
  }

  // Is book has been finished validation
  const isFinished = pageCount === readPage;

  const data = {
    id,
    name,
    year,
    author,
    summary,
    publisher,
    pageCount,
    readPage,
    finished: isFinished,
    reading,
    insertedAt,
    updatedAt,
  };

  // Memasukkan data ke dalam bookshelf
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
