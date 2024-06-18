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
  const { name, reading, finished } = request.query;

  const filteredBooks = bookshelf.filter((book) => {
    if (name && !book.name.toLowerCase().includes(name.toLowerCase())) {
      return false;
    }

    if (reading !== undefined) {
      const readingBool = reading === '1';
      if (book.reading !== readingBool) {
        return false;
      }
    }

    if (finished !== undefined) {
      const finishedBool = finished === '1';  
      if (book.finished !== finishedBool) {
        return false;
      }
    }

    return true;
  });

  const selectedProperties = filteredBooks.map(({ id, name, publisher }) => ({
    id,
    name,
    publisher,
  }));

  return h
    .response({
      status: 'success',
      data: {
        books: selectedProperties,
      },
    })
    .code(200);
};

const getBookById = (request, h) => {
  const { bookId } = request.params;
  const isDataExist = bookshelf.filter((book) => book.id === bookId);

  if (isDataExist.length > 0) {
    return h
      .response({
        status: 'success',
        data: {
          book: isDataExist[0],
        },
      })
      .code(200);
  } else {
    return h
      .response({
        status: 'fail',
        message: 'Buku tidak ditemukan',
      })
      .code(404);
  }
};

const updateBook = (request, h) => {
  const { bookId } = request.params;
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
  const updatedAt = new Date().toISOString();

  // Error validation readPage must not exceed pageCount
  if (readPage > pageCount) {
    return h
      .response({
        status: 'fail',
        message:
          'Gagal memperbarui buku. readPage tidak boleh lebih besar dari pageCount',
      })
      .code(400);
  }

  // Error validation id must exists
  const index = bookshelf.findIndex((book) => book.id === bookId);

  if (index === -1) {
    return h
      .response({
        status: 'fail',
        message: 'Gagal memperbarui buku. Id tidak ditemukan',
      })
      .code(404);
  } else {
    bookshelf[index] = {
      ...bookshelf[index],
      name,
      year,
      author,
      summary,
      publisher,
      pageCount,
      readPage,
      reading,
      updatedAt,
    };

    return h
      .response({
        status: 'success',
        message: 'Buku berhasil diperbarui',
      })
      .code(200);
  }
};

const deleteBook = (request, h) => {
  const { bookId } = request.params;
  const index = bookshelf.findIndex((book) => book.id === bookId);

  if (index === -1) {
    return h
      .response({
        status: 'fail',
        message: 'Buku gagal dihapus. Id tidak ditemukan',
      })
      .code(404);
  } else {
    bookshelf.splice(index, 1);
    return h.response({
      status: 'success',
      message: 'Buku berhasil dihapus',
    });
  }
};

module.exports = {
  addBookToBookshelf,
  getAllBooks,
  getBookById,
  updateBook,
  deleteBook,
};
