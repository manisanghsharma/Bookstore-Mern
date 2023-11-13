import { useState, useEffect } from "react";
import BackButton from "../components/BackButton";
import { useParams } from "react-router-dom";
import axios from "axios";
import Spinner from "../components/Spinner";

const ShowBook = () => {
  const [book, setBook] = useState({});
  const [loading, setLoading] = useState(false);
  const { id } = useParams();

  const apiUrl = `http://localhost:5555/books/${id}`;

  useEffect(() => {
    const showBook = async () => {
      try {
        setLoading(true);
        const response = await axios.get(apiUrl);
        setBook(response.data);
      } catch (err) {
        console.log(err.message);
      } finally {
        setLoading(false);
      }
    };

    showBook();
  }, []);
  return (
    <div className="p-4">
      <BackButton />
      <h1 className="text-3xl my-4">Show Book</h1>
      {loading ? (
        <Spinner />
      ) : (
        <div className="flex flex-col border-2 border-sky-400 rounded-xl p-4 w-fit">
          <div className="my-4">
            <span className="text-xl text-gray-500 mr-4">Id</span>
            <span>{book._id}</span>
          </div>
          <div className="my-4">
            <span className="text-xl text-gray-500 mr-4">Title</span>
            <span>{book.title}</span>
          </div>
          <div className="my-4">
            <span className="text-xl text-gray-500 mr-4">Author</span>
            <span>{book.author}</span>
          </div>
          <div className="my-4">
            <span className="text-xl text-gray-500 mr-4">Publish Year</span>
            <span>{book.publishYear}</span>
          </div>
          <div className="my-4">
            <span className="text-xl text-gray-500 mr-4">Create Time</span>
            <span>{new Date(book.createdAt).toString()}</span>
          </div>
          <div className="my-4">
            <span className="text-xl text-gray-500 mr-4">Last Update Time</span>
            <span>{new Date(book.updatedAt).toString()}</span>
          </div>
        </div>
      )}
    </div>
  );
};
export default ShowBook;
