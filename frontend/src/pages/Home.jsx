import { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { MdOutlineAddBox} from "react-icons/md";
import Spinner from "../components/Spinner";
import BooksCard from "../home/BooksCard";
import BooksTable from "../home/BooksTable";

const Home = () => {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(false);
  const [showType, setShowType] = useState(JSON.parse(localStorage.getItem('displayType')) || "table");

  const apiUrl = `${import.meta.env.VITE_API_URL}/books`;

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
        <div className="flex items-center justify-center p-4">
          <button
            onClick={() => {
              setShowType("table");
              localStorage.setItem("displayType", JSON.stringify('table'));
            }}
            className="px-6 py-1 mx-2 text-xl text-white rounded-md bg-sky-600 hover:bg-sky-700"
          >
            Table
          </button>
          <button
            onClick={() => {
              setShowType("card");
              localStorage.setItem("displayType", JSON.stringify('card'));
            }}
            className="px-6 py-1 mx-2 text-xl text-white rounded-md bg-sky-600 hover:bg-sky-700"
          >
            Card
          </button>
        </div>
        <h1 className="my-8 text-3xl">Book List</h1>
        <Link to="/books/create">
          <MdOutlineAddBox className="text-4xl text-sky-800" />
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
