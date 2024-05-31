import dotenv from "dotenv";
dotenv.config(); // Load .env file

// Initialize Express
import express, {Express, Request, Response, NextFunction} from "express";
import path from "path"; // For file paths

// Import the multer middleware module
import upload from "./middleware/multer";
// Import the  multer middleware module for memory storage
import uploadOnMemory from "./middleware/multerMemory";

// Import the books function module
import {
  getBooks,
  searchBooks,
  getBookById,
  addBook,
  editBookById,
  deleteBookById,
} from "./controllers/index";

// Middleware
import { handleImageUpload } from "./middleware/errorHandler";
import isAdmin from "./middleware/isAdmin";

const app = express();

// Set static folder
app.set("views", path.join(__dirname, "/views"));
// Set EJS as templating engine
app.set("view engine", "ejs");

app.use(express.json());

// Port
const PORT = process.env.PORT || 3000;

// Hello World Route
app.get("/", (req: express.Request, res: express.Response) => {
  res.render("index", {
    title: "BookLibrary - Hello World!",
    name: req.query.name || "Guest",
  });
});

// Books Route
app.get("/books", isAdmin, getBooks); // menggunakan middleware isAdmin untuk membatasi akses hanya untuk admin
app.get("/books/search", searchBooks);
app.get("/books/:id", getBookById);
app.post("/books", uploadOnMemory.single("cover"), handleImageUpload, addBook); // menggunakan middleware upload.single("cover") untuk menghandle upload file image yang hanya menerima 1 file dengan fieldname "cover" dari form-data
app.put("/books/:id", uploadOnMemory.single("cover"), editBookById);
app.delete("/books/:id", deleteBookById);

// Server Listening
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT} | http://localhost:${PORT}`);
});