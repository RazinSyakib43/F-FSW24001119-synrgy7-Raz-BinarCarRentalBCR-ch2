import dotenv from "dotenv";
dotenv.config(); // Load .env file

// Initialize Express
import express, { Express, Request, Response, NextFunction } from "express";
import path from "path"; // For file paths

// Import CORS
import cors from 'cors';

import swaggerUi from 'swagger-ui-express';
import swaggerDocument from './openapi.json';

// Import the router module
import router from "./routes";

const app = express();

// Set static folder
app.set("views", path.join(__dirname, "/views"));
// Set EJS as templating engine
app.set("view engine", "ejs");

// Enable CORS for all requests, so that any frontend can make requests to this server
app.use(cors());

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(router);

// Port
const PORT = process.env.PORT || 8080;

// Hello World Route
app.get("/", (req: express.Request, res: express.Response) => {
  res.render("index", {
    title: "BCR Car Management Dashboard - Hello World!",
    name: req.query.name || "Guest",
  });
});

// Swagger UI
app.use('/api-docs', swaggerUi.serve);
app.get('/api-docs', swaggerUi.setup(swaggerDocument));

// Server Listening
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT} | http://localhost:${PORT}`);
});

export default app;