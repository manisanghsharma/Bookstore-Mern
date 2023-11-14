import { useState, useEffect } from "react";
import axios from "axios";
import { Link, json } from "react-router-dom";
import { MdOutlineAddBox, MdOutlineDelete } from "react-icons/md";
import Spinner from "../components/Spinner";
import BooksCard from "../home/BooksCard";
import BooksTable from "../home/BooksTable";

const Home = () => {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(false);
  const [showType, setShowType] = useState("card");

  const apiUrl = "http://localhost:5555/books";

  useEffect(() => {
    const fetchBooks = async () => {
      try {
        setLoading(true);
        const response = await axios.get(apiUrl);
        setBooks(response.data.data);
      } catch (err) {
        console.log(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchBooks();
  }, []);

  return (
    <div className="p-4">
      <div>
        <div className="flex justify-center items-center p-4">
          <button
            onClick={() => {
               setShowType("table");
               localStorage.setItem('displayType', JSON.stringify(showType));
            }}
            className="bg-sky-600 hover:bg-sky-700 text-white text-xl px-6 py-1 rounded-md mx-2"
          >
            Table
          </button>
          <button
            onClick={() => {
              setShowType("card");
              localStorage.setItem('displayType', JSON.stringify(showType));
            }}
            className="bg-sky-600 hover:bg-sky-700 text-white text-xl px-6 py-1 rounded-md mx-2"
          >
            Card
          </button>
        </div>
        <h1 className="text-3xl my-8">Book List</h1>
        <Link to="/books/create">
          <MdOutlineAddBox className="text-sky-800 text-4xl" />
        </Link>
      </div>

      {loading ? (
        <Spinner />
      ) : showType === "table" ? (
        <BooksTable books={books} />
      ) : (
        <BooksCard books={books} />
      )}
    </div>
  );
};
export default Home;
