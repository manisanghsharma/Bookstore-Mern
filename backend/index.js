import express from "express";
import { PORT, mongodbURL } from "./config.js";
import mongoose from "mongoose";
import booksRoute from "./routes/booksRoute.js";
import cors from "cors";

const app = express();

//* Middleware for parsing json body
app.use(express.json());

//* Configuring cors
app.use(cors( ));

app.get("/", (request, response) => {
    console.log(request);
    return response.status(234).send("My first routing Haribol!!");
});

//* The books route
app.use("/books", booksRoute);

mongoose
    .connect(mongodbURL)
    .then(() => {
        console.log("App connected to database");

        app.listen(PORT, () => {
            console.log(`App is listening on port ${PORT}`);
        });
    })
    .catch((error) => console.log(error));
