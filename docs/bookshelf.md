# Bookshelf API Spec

### Kriteria 1: Aplikasi menggunakan port 9000

### Kriteria 2: Aplikasi dijalankan dengan perintah npm run start

### Kriteria 3: API dapat menyimpan buku
Endpoint: POST /books

Request Body:
```json
{
    "name": string,
    "year": number,
    "author": string,
    "summary": string,
    "publisher": string,
    "pageCount": number,
    "readPage": number,
    "reading": boolean
}
```

Response Success:
- Status Code: 201
- Response Body:
  ```json
  {
      "status": "success",
      "message": "Buku berhasil ditambahkan",
      "data": {
          "bookId": "1L7ZtDUFeGs7VlEt"
      }
  }
  ```

  ```json
  {
      "id": "Qbax5Oy7L8WKf74l",
      "name": "Buku A",
      "year": 2010,
      "author": "John Doe",
      "summary": "Lorem ipsum dolor sit amet",
      "publisher": "Dicoding Indonesia",
      "pageCount": 100,
      "readPage": 25,
      "finished": false,
      "reading": false,
      "insertedAt": "2021-03-04T09:11:44.598Z",
      "updatedAt": "2021-03-04T09:11:44.598Z"
  }
  ```
- id: nanoid versi 3
- finished: nilai finished didapatkan dari observasi pageCount === readPage.
- insertedAt: gunakan new Date().toISOString() untuk menghasilkan nilainya.
- updatedAt: new Date().toISOString()

Response Error:
- Client tidak melampirkan properti namepada request body. Bila hal ini terjadi, maka server akan merespons dengan:
  - Status Code: 400
  - Response Body:
  ```json
  {
    "status": "fail",
    "message": "Gagal menambahkan buku. Mohon isi nama buku"
  }
  ```
- Client melampirkan nilai properti readPage yang lebih besar dari nilai properti pageCount. Bila hal ini terjadi, maka server akan merespons dengan:
  - Status Code: 400
  - Response Body: 
  ```json
  {
    "status": "fail",
    "message": "Gagal menambahkan buku. readPage tidak boleh lebih besar dari pageCount"
  }
  ```

### Kriteria 4 : API dapat menampilkan seluruh buku
Endpoint: GET /books

- Status Code: 200
- Response Body:
  ```json
  {
    "status": "success",
    "data": {
        "books": [
            {
                "id": "Qbax5Oy7L8WKf74l",
                "name": "Buku A",
                "publisher": "Dicoding Indonesia"
            },
            {
                "id": "1L7ZtDUFeGs7VlEt",
                "name": "Buku B",
                "publisher": "Dicoding Indonesia"
            },
            {
                "id": "K8DZbfI-t3LrY7lD",
                "name": "Buku C",
                "publisher": "Dicoding Indonesia"
            }
        ]
    }
  }
  ```
  ```json
  {
    "status": "success",
    "data": {
        "books": []
    }
  }
  ```

### Kriteria 5 : API dapat menampilkan detail buku
Endpoint: GET /books/{bookId}

Response Success:
- Status Code: 200
- Response Body:
  ```json
  {
    "status": "success",
    "data": {
        "book": {
            "id": "aWZBUW3JN_VBE-9I",
            "name": "Buku A Revisi",
            "year": 2011,
            "author": "Jane Doe",
            "summary": "Lorem Dolor sit Amet",
            "publisher": "Dicoding",
            "pageCount": 200,
            "readPage": 26,
            "finished": false,
            "reading": false,
            "insertedAt": "2021-03-05T06:14:28.930Z",
            "updatedAt": "2021-03-05T06:14:30.718Z"
        }
    }
  }
  ```

Response Error:
- Status Code: 404
- Response Body:
  ```json
  {
    "status": "fail",
    "message": "Buku tidak ditemukan"
  }
  ```

### Kriteria 6 : API dapat mengubah data buku
Endpoint: PUT /books/{bookId}

Request Body:
```json
{
    "name": string,
    "year": number,
    "author": string,
    "summary": string,
    "publisher": string,
    "pageCount": number,
    "readPage": number,
    "reading": boolean
}
```

Response Success:
- Status Code: 200
- Response Body:
  ```json
  {
    "status": "success",
    "message": "Buku berhasil diperbarui"
  }
  ```

Response Error:
- Client tidak melampirkan properti name pada request body. Bila hal ini terjadi, maka server akan merespons dengan:
  - Status Code: 400
  - Response Body:
  ```json
  {
    "status": "fail",
    "message": "Gagal memperbarui buku. Mohon isi nama buku"
  }
  ```
- Client melampirkan nilai properti readPage yang lebih besar dari nilai properti pageCount. Bila hal ini terjadi, maka server akan merespons dengan:
  - Status Code: 400
  - Response Body:
  ```json
  {
    "status": "fail",
    "message": "Gagal memperbarui buku. readPage tidak boleh lebih besar dari pageCount"
  }
  ```
- Id yang dilampirkan oleh client tidak ditemukkan oleh server. Bila hal ini terjadi, maka server akan merespons dengan:
  - Status Code: 404
  - Response Body:
  ```json
  {
    "status": "fail",
    "message": "Gagal memperbarui buku. Id tidak ditemukan"
  }
  ```

### Kriteria 7 : API dapat menghapus buku
Endpoint: DELETE /books/{bookId}

Response Success:
- Status Code: 200
- Response Body:
  ```json
  {
    "status": "success",
    "message": "Buku berhasil dihapus"
  }
  ```

Response Error:
- Status Code: 404
- Response Body:
  ```json
  {
    "status": "fail",
    "message": "Buku gagal dihapus. Id tidak ditemukan"
  }
  ```