import express from "express";
import {Book} from "../models/bookModel.js";

const router = express.Router();

//* Route for creating a book

router.post("/", async (request, response) => {
    try {
        if (
            !request.body.title ||
            !request.body.author ||
            !request.body.publishYear
        ) {
            return response.status(400).send({
                message:
                    "State all the required fields: title, author & publishing year",
            });
        }

        const newBook = {
            title: request.body.title,
            author: request.body.author,
            publishYear: request.body.publishYear,
        };

        const book = await Book.create(newBook);

        return response.status(201).send(book);
    } catch (err) {
        console.log(err.message);
        response.status(500).send({
            message: err.message,
        });
    }
});

//* Route for getting all books

router.get("/", async (request, response) => {
    try {
        const books = await Book.find({});
        return response.status(200).json({
            count: books.length,
            data: books,
        });
    } catch (err) {
        console.log(err.message);
        response.status(500).send({ message: err.message });
    }
});

//* Route for getting single book - by id

router.get("/:id", async (request, response) => {
    try {
        const { id } = request.params;

        const book = await Book.findById(id);
        return response.status(200).json(book);
    } catch (err) {
        console.log(err.message);
        response.status(500).send({ message: err.message });
    }
});

//*Route for Updating a book

router.put("/:id", async (request, response) => {
    //? Checking id the request contains title, author and publish year

    try {
        if (
            !request.body.title ||
            !request.body.author ||
            !request.body.publishYear
        ) {
            return response.status(500).send({
                message:
                    "Send all required fields: title, author and publish year",
            });
        }

        const { id } = request.params;

        //? findByIdAndUpdate is a mongoose function to update a thing

        const result = await Book.findByIdAndUpdate(id, request.body);

        if (!result) {
            return response.status(404).send({ message: "Book not found" });
        }

        return response
            .status(200)
            .json({ message: "Book updated successfully" });
    } catch (err) {
        console.log(err.message);
        response.status(500).send({ message: err.message });
    }
});

//* Route for deleting a book

router.delete("/:id", async (request, response) => {
    try {
        const { id } = request.params;
        const result = await Book.findByIdAndDelete(id);

        if (!result) {
            return response.status(404).send({ message: "Book not found" });
        }

        return response
            .status(200)
            .send({ message: "Book deleted successfully" });
    } catch (err) {
        console.log(err.message);
        response.status(500).send({ message: err.message });
    }
});


export default router;