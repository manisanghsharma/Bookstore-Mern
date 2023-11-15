import { useState, useEffect } from "react";
import BackButton from "../components/BackButton";
import { useParams } from "react-router-dom";
import axios from "axios";
import Spinner from "../components/Spinner";

const ShowBook = () => {
  const [book, setBook] = useState({});
  const [loading, setLoading] = useState(false);
  const { id } = useParams();

  const apiUrl = `${import.meta.env.VITE_API_URL}/books/${id}`;

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
      <h1 className="my-4 text-3xl">Show Book</h1>
      {loading ? (
        <Spinner />
      ) : (
        <div className="flex flex-col p-4 m-auto border-2 border-sky-400 rounded-xl w-fit">
          <div className="my-4"> 
            <span className="mr-4 text-xl text-gray-500">Id</span>
            <span>{book._id}</span>
          </div>
          <div className="my-4">
            <span className="mr-4 text-xl text-gray-500">Title</span>
            <span>{book.title}</span>
          </div>
          <div className="my-4">
            <span className="mr-4 text-xl text-gray-500">Author</span>
            <span>{book.author}</span>
          </div>
          <div className="my-4">
            <span className="mr-4 text-xl text-gray-500">Publish Year</span>
            <span>{book.publishYear}</span>
          </div>
          <div className="my-4">
            <span className="mr-4 text-xl text-gray-500">Create Time</span>
            <span>{new Date(book.createdAt).toString()}</span>
          </div>
          <div className="my-4">
            <span className="mr-4 text-xl text-gray-500">Last Update Time</span>
            <span>{new Date(book.updatedAt).toString()}</span>
          </div>
        </div>
      )}
    </div>
  );
};
export default ShowBook;
