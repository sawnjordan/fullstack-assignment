# Book Selling E-commerce Platform

This repository contains the backend and frontend code for the **Book Selling E-commerce Platform** project. It is built with Node.js and Express.js.

## Installation for backend

1. Clone the repository: `git clone https://github.com/sawnjordan/fullstack-assignment.git`
2. Navigate to backend project directory: `cd fullstack-assignment/backend`
3. Install the dependencies: `npm install`

## Configuration

1. Create a `.env` file in the `./backend` directory of the project.
2. Define the following environment variables in the `.env` file:

MONGODB_URL=mongodb://127.0.0.1:27017/
MONGODB_DB=bookecommerce

JWT_SECRET_KEY=secret-key-ecommmerce
JWT_EXPIRES_IN=7d

COOKIE_EXPIRES_IN=7

Adjust the values as per your requirements.

## Usage

1. Start the server: `npm start`
2. The server will be running at `http://localhost:5000`

## API Endpoints

The following API endpoints are available:

- `POST /api/v1/register`: Register a users.
- `POST /api/v1/login`: Login a user.
- `GET /api/v1/logout`: Logout a user.

- `GET /api/v1/books/` : Get All Books
- `POST /api/v1/books/new` : Create New Book
- `PUT /api/v1/book/:id`: Update a Book
- `DELETE /api/v1/book/:id`: Delete a Book
- `GET /api/v1/book/:id`: Get a Book
