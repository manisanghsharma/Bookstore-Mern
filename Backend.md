Let us get started with the backend.

# Mongo DB

- In the MERN Stack, M stands for Mongo DB: a NoSQL database, implying that the data within the database is stored in the form of something other than tables.

- It can be key value pairs, objects etc, just not tables.

- Most big scale applications still prefer SQL Databases.

# Express.js

- Express is a web framework for servers

# Node.js

- Nodejs is a backend javascript runtime environment

# Setup a backend

## 1. Initializing the Backend

Create a backend folder

Perform these steps to create a `package.json` file

```bash
cd backend
npm init -y
```

Run the following command to install the node modules, express, nodemon and cors

```js
npm i express nodemon cors
```

Inside the `package.json` file, add this command, this will allow us to use the import and the export commands

```json
"type": "module"
```

Add the following scripts to enable to run the server with the command `npm run dev`

```json
"scripts": {
    "start": "node index.js",
    "dev": "nodemon index.js"
    }
```

## 2. Starting Our Server

Create a new file `index.js`

First of all we import the express module, and initialize a variable to use express

```js
import express from "express";
const app = express();
```

Now we have to define a port, where we listen for requests, let us take `PORT = 5555` here.

Now we can listen on the port with the `app.listen()` function. We can also pass a function which will log `Listening on the port: 5555` when the code executes.

```js
const PORT = 5555;

app.listen(PORT, () => {
  console.log(`App is listening on port ${PORT}`);
});
```

To start the server, simply write `npm run dev` in the terminal and server will be started on `localhost:5555`


## 3. Setting up the first http Route

The `localhost:5555` currently will show `Cannot get /`

![cannotget/](https://i.imgur.com/8OZKtGn.png)

This is because, `/` is the default route of ther server, and we have not configured it yet. To configure it, we use `app.get()` function

the `app.get()` function configures the get request by recieving a route, and then a `(request, response)` 

We can log the request and `return` any response we like by using `response.status().send()` function

Inside the status, we can send different [status codes](https://restfulapi.net/http-status-codes/) 

![statuscode](https://i.imgur.com/m0jBwyX.png)

```js
app.get('/', (request, response) => {
    console.log(request)
    return.status(234).send("My First Routing!")
})
```

A response code starting with 2 generally means the request has been successful.

Now the `localhost:5555` page will show the message: My First Routing!

## 4. Installing MongoDB 

Let us now integrate a MongoDB database into our project

First install the MongoDB package by the following command
```bash
npm i mongodb
```

Now to go the MongoDB Atlas website and generate a new database with username and password, copy the code in the driver section

![mongodb](https://i.imgur.com/x6q6iRE.png)

Replace the `<password>` with your password

Now copy and save the url, preferrably in a `.env` file

In the `index.js` file, use the `mongoose` command to connect to the database. If the connection is established, we can run the server otherwise log the error.

```js
const connectDatabase = async() => {
    try{
        await mongoose.connect(mongodbURL);
        console.log("Connected To Database");

        app.listen(PORT, () => {
            console.log(`App is Listening on Port: ${PORT}`);
        })

    } catch(err){
        console.log(err.message);
    }
}
connectDatabase();
```

Run the `index.js`. After successful connection, you will see the following message.

![connected](https://i.imgur.com/J9dzxMg.png)

## 5. Creating a Model in MongoDB

Now we will create a model in MongoDB, which will be used to store the data in the database.

To get started, create a new folder `models` and create a new file `userModel.js`

In the `userModel.js` file, import the mongoose module 

```js
import mongoose from "mongoose";
```

Now create a new schema, which will be used to define the structure of the data in the database, here we take the example of a book. For that we use the `mongoose.Schema()` function

Here we define the field and the type of the field, and whether it is required or not.

```js
const bookSchema = mongoose.Schema(
    {
        title: {
            type: String,
            required: true,
        },
        author: {
            type: String,
            required: true,
        },
        publishYear: {
            type: String,
            required: true,
        },
    },
    {
        timestamps: true,
    }
);
```
We do not need to define the `id` field, as it is automatically generated by MongoDB when we create a new entry.

We will now export the model, by using the `mongoose.model()` function, which takes in the name of the model, and the schema of the model.

```js
const Book = mongoose.model("Book", bookSchema);
export default Book;
```

## 6. Backend CRUD Operations with MongoDB

Now we will create the backend CRUD operations for the MongoDB database.

Inside the `index.js` file, we will create the routes for the CRUD operations.

### 6.1 Save a New Book (POST)

We will use the `app.post()` function to create a new book in the database.

We should be able to send a request to `/books` and send a new book object in the body of the request, consisting of the title, author and the publish year.

Here we use `async()` as the code is asynchronous 

In the `try` block, if the body of the request does not contain the required fields, we return a status code of 400, and a message stating that `State all the required fields: title, author & publishing year`

If the body of the request contains the required fields, we create a new book object, and save it in the database using the `Book.create()` function.

If the book is successfully created, we return a status code of 201, and the book object.

If there is an error, we log the error in the `catch` block and return a status code of 500, and the error message.

```js
app.post('/books', async(request, response) => {
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
```