import express from "express";
import {mongoose} from "mongoose";
import booksRoute from "./routes/booksRoute.js";
import cors from "cors";
import dotenv from 'dotenv';
dotenv.config();

const app = express();

//* Middleware for parsing json body
app.use(express.json());

//* Configuring cors
app.use(cors());

app.get("/", (request, response) => {
    console.log(request);
    return response.status(234).send("My first routing Haribol!!");
});

//* The books route
app.use("/books", booksRoute);

const connectDatabase = async() => {
    try{
        await mongoose.connect(process.env.mongodbURL);
        console.log("Connected To Database");
        app.listen(process.env.PORT, () => {
          console.log(`App is Listening on Port: ${process.env.PORT}`);
        });
    } catch(err){
        console.log(err.message);
    }
}
connectDatabase();
