# Bookstore API

## Overview

The Bookstore API is designed to manage books, authors, and user shopping carts. It provides endpoints for authentication, book operations, and author operations.

## Table of Contents

- [Authentication](#authentication)
- [Middleware](#middleware)
- [Book Operations](#book-operations)
- [Author Operations](#author-operations)

## Authentication

The API uses token-based authentication. To access protected endpoints, include the authentication token in the request headers.

### Endpoints:

- `POST /api/auth/register`: Register a new user.
- `POST /api/auth/login`: Log in and receive an authentication token.

## Middleware

Middleware is used to perform specific operations before reaching the endpoint handlers. It includes:

- **Authentication Middleware**: Verifies the user's authentication token.
- **Logger Middleware**: Logs information about incoming requests.
- **Error Handling Middleware**: Handles errors and returns appropriate responses.

## Book Operations

### Endpoints:

- `GET /api/books`: Retrieve a list of all books.
- `GET /api/books/:id`: Retrieve details of a specific book.
- `POST /api/books`: Create a new book.
- `PUT /api/books/:id`: Update details of a specific book.
- `DELETE /api/books/:id`: Delete a book.

## Cart Operations

### Endpoints:

- `GET /api/cart`: Retrieve the user's shopping cart.
- `POST /api/cart/add/:bookId`: Add a book to the shopping cart.
- `POST /api/cart/remove/:bookId`: Remove a book from the shopping cart.


## Author Operations

### Endpoints:

- `GET /api/authors`: Retrieve a list of all authors.
- `GET /api/authors/:id`: Retrieve details of a specific author.
- `POST /api/authors`: Create a new author.
- `PUT /api/authors/:id`: Update details of a specific author.
- `DELETE /api/authors/:id`: Delete an author.

## Getting Started

1. Clone the repository.
2. Install dependencies using `npm install`.
3. Create a `.env` file with necessary configurations.
4. Run the server using `npm start`.
5. Access the API at `http://localhost:3000/api`.

## Contributing

Feel free to contribute to the development of the Bookstore API. Please follow the [contribution guidelines](CONTRIBUTING.md) before submitting a pull request.

## License

This project is licensed under the MIT License - see the [LICENSE.md](LICENSE.md) file for details.
