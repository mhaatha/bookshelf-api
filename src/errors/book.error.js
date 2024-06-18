const postBookErrorHandler = (request, h, error) => {
  const response = h.response({
    status: 'fail',
    message: 'Gagal menambahkan buku. Mohon isi nama buku',
  });
  response.code(400);
  return response;
};

module.exports = { postBookErrorHandler };
