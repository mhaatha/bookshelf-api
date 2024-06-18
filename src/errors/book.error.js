const postBookErrorHandler = (request, h, error) => {
  return h
    .response({
      status: 'fail',
      message: 'Gagal menambahkan buku. Mohon isi nama buku',
    })
    .code(400)
    .takeover(); // takeover method is to stop further processing and immediately return a custom response.
};

const putBookErrorHandler = (request, h, error) => {
  return h
    .response({
      status: 'fail',
      message: 'Gagal memperbarui buku. Mohon isi nama buku',
    })
    .code(400)
    .takeover(); // takeover method is to stop further processing and immediately return a custom response.
}

module.exports = { postBookErrorHandler, putBookErrorHandler };
