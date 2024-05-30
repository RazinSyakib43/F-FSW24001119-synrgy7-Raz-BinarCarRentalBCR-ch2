import { Request, Response } from 'express';
import fs from 'fs';
import { UploadApiResponse, UploadApiErrorResponse } from 'cloudinary';
import cloudinary from '../../config/cloudinary';

const booksDataPath: string = "Server/data/books.json";

async function getBooks(req: Request, res: Response) {
  const books: string = fs.readFileSync(booksDataPath, "utf8");
  if (books.length === 0) {
    res.status(404).send({
      code: 404,
      status: "fail",
      message: "Books not found",
    });
  } else {
    res.status(200).send({
      code: 200,
      status: "success",
      data: JSON.parse(books),
    });
  }

  console.log("getBooks : ", books);
}

async function searchBooks(req: Request, res: Response) {
  const { title }: { title: string } = req.query as { title: string };
  const books: any = JSON.parse(fs.readFileSync(booksDataPath, "utf8"));
  const filteredBooks: any = books.filter((book: { title: string; }) =>
    book.title.toLowerCase().includes(title.toLowerCase())
  );

  if (!title) {
    res.status(400).send({
      code: 400,
      status: "fail",
      message: "Please provide a title",
    });
  } else if (filteredBooks.length === 0) {
    res.status(404).send({
      code: 404,
      status: "fail",
      message: "Books not found",
    });
  } else {
    res.status(200).send({
      code: 200,
      status: "success",
      data: filteredBooks,
    });
  }

  console.log("searchBooks : ", filteredBooks);
}

async function getBookById(req: Request, res: Response) {
  const { id }: { id: string } = req.params as { id: string };
  const books: any = JSON.parse(fs.readFileSync(booksDataPath, "utf8"));
  const book: any | undefined = books.find((book: { id: number; }) => book.id === parseInt(id));

  if (!book || isNaN(parseInt(id)) || book.id.toString() !== id) {
    res.status(404).send({
      code: 404,
      status: "fail",
      message: "Book not found",
    });
  } else {
    res.status(200).send({
      code: 200,
      status: "success",
      data: book,
    });
  }

  console.log("getBookById : ", book);
}

async function addBook(req: Request, res: Response) {
  const { title, isbn, price, author }: { title: string; isbn: string; price: number; author: string } = req.body;
  const books: any = JSON.parse(fs.readFileSync(booksDataPath, "utf8"));

  const fileBase64: string = req.file?.buffer.toString("base64") || ""; // berfungsi untuk convert file buffer menjadi base64, supaya bisa dibaca dan dikembalikan ke client
  const file: string = req.file ? `data:${req.file.mimetype};base64,${fileBase64}` : ""; // membuat url image yang bisa diakses oleh client, dengan format data:image/jpeg;base64,base64String

  cloudinary.uploader.upload(file, (error: any, result: any) => {
    if (error) {
      res.status(400).send({
        code: 400,
        status: "fail",
        message: error.message,
      });
    } else if (!title || !isbn || !price || !author) {
      res.status(400).send({
        code: 400,
        status: "fail",
        message: "Please fill all required fields",
      });
    } else {
      const book: any = {
        id: books.length + 1,
        title,
        isbn,
        price,
        author,
        cover: result.secure_url,
      };

      books.push(book);
      fs.writeFileSync(booksDataPath, JSON.stringify(books, null, 2));

      res.status(201).send({
        code: 201,
        status: "success",
        message: "Book added successfully",
        data: book,
      });
    }
  });
}

async function editBookById(req: Request, res: Response) {
  const { id }: { id: string } = req.params as { id: string };
  const books: any = JSON.parse(fs.readFileSync(booksDataPath, "utf8"));
  const bookId: number = books.findIndex((book: { id: number; }) => book.id === parseInt(id));

  if (!bookId || isNaN(parseInt(id)) || books[bookId].id.toString() !== id) {
    res.status(404).send({
      code: 404,
      status: "fail",
      message: "Book not found",
    });
  } else {
    const { title, isbn, price, author }: { title?: string; isbn?: string; price?: number; author?: string } = req.body;
    const fileBase64: string = req.file?.buffer.toString("base64") || ""; // berfungsi untuk convert file buffer menjadi base64, supaya bisa dibaca dan dikembalikan ke client
    const file: string = req.file ? `data:${req.file.mimetype};base64,${fileBase64}` : ""; // membuat url image yang bisa diakses oleh client, dengan format data:image/jpeg;base64,base64String

    cloudinary.uploader.upload(file, async function(error: UploadApiErrorResponse, result: UploadApiResponse) {
      const updatedBook: any = {
        id: parseInt(id),
        title: title || books[bookId].title,
        isbn: isbn || books[bookId].isbn,
        price: price || books[bookId].price,
        author: author || books[bookId].author,
        cover: file ? result.secure_url : books[bookId].cover,
      };

      books[bookId] = updatedBook;

      fs.writeFileSync(booksDataPath, JSON.stringify(books, null, 2));

      res.status(200).send({
        code: 200,
        status: "success",
        message: "Book updated successfully",
        data: updatedBook,
      });

      console.log("editBookById : ", updatedBook);
    });
  }
}

async function deleteBookById(req: Request, res: Response) {
  const { id }: { id: string } = req.params as { id: string };
  const books: any = JSON.parse(fs.readFileSync(booksDataPath, "utf8"));
  const book: any | undefined = books.find((book: { id: number; }) => book.id === parseInt(id));

  if (!book || isNaN(parseInt(id)) || book.id.toString() !== id) {
    res.status(404).send({
      code: 404,
      status: "fail",
      message: "Book not found",
    });
  } else {
    const updatedBooks: any = books.filter((book: { id: number; }) => book.id !== parseInt(id));
    fs.writeFileSync(booksDataPath, JSON.stringify(updatedBooks, null, 2));

    res.status(200).send({
      code: 200,
      status: "success",
      message: "Book deleted successfully",
    });
  }

  console.log("deleteBookById : ", book);
}

export {
  getBooks,
  searchBooks,
  getBookById,
  addBook,
  editBookById,
  deleteBookById,
};