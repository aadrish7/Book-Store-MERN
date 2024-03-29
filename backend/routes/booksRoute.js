import express from "express";
import {Book} from "../models/bookModel.js";
const router = express.Router();

//Route for creating a new book
router.post("/", async (req, res) => {
    try {
      if (!req.body.title || !req.body.author || !req.body.publishYear) {
        return res.status(400).send({ message: "Missing required fields" });
      }
      console.log(req.body);
      const newbook = {
        title: req.body.title,
        author: req.body.author,
        publishYear: req.body.publishYear,
      };
      const book = await Book.create(newbook);
      console.log("Book created", book);
      return res.status(201).send(book);
    } catch (err) {
      console.log(err.message);
      res.status(500).send({ message: "Internal Server Error" });
    }
  });
  
  //Route for getting all books
router.get("/", async (req, res) => {
      try {
          const books = await Book.find({});
          return res.status(200).json({
              count: books.length,
              data: books,
          });
      } catch (err) {
          console.log(err.message);
          res.status(500).send({ message: "Internal Server Error" });
      }
      });
  //Route for getting a single book by id
router.get("/:id", async (req, res) => {
      try {
          const book = await Book.findById(req.params.id);
          if (!book) {
              return res.status(404).send({ message: "Book not found" });
          }
          return res.status(200).send(book);
      } catch (err) {
          console.log(err.message);
          res.status(500).send({ message: "Internal Server Error" });
      }
      });
  
  //Route for updating a book by id
router.put("/:id", async (req, res) => {
      try {
    
          if (!req.body.title && !req.body.author && !req.body.publishYear) {
              return res.status(400).send({ message: "Missing required fields" });
          }
          const {id} = req.params;
          const result=await Book.findByIdAndUpdate(id,req.body)
          if (!result) {
              return res.status(404).send({ message: "Book not found" });
          }
          return res.status(200).send({ message: "Book updated" });
      } catch (err) {
          console.log(err.message);
          res.status(500).send({ message: "Internal Server Error" });
      }
      });
  
  //Rappel: Route for deleting a book by id
  
router.delete("/:id", async (req, res) => {
      try {
          const book = await Book.findByIdAndDelete(req.params.id);
          if (!book) {
              return res.status(404).send({ message: "Book not found" });
          }
          return res.status(200).send({ message: "Book deleted" });
      } catch (err) {
          console.log(err.message);
          res.status(500).send({ message: "Internal Server Error" });
      }
      });

export default router;