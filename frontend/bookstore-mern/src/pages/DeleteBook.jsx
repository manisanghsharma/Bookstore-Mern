import BackButton from "../components/BackButton";
import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import Spinner from "../components/Spinner";

const DeleteBook = () => {
  const [loading, setLoading] = useState(false);
  const { id } = useParams();
  const navigate = useNavigate();
  const apiUrl = `http://localhost:5555/books/${id}`;
  const handleDelete = async () => {
    try {
      setLoading(true);
      await axios.delete(apiUrl);
      navigate("/");
    } catch (err) {
      console.log(err.message);
      alert("An error occured. Please check in the console");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-5">
      <BackButton />
      <h1 className="text-2xl my-5">Delete Book</h1>
      {loading ? (<Spinner />) : (
        <div className="flex flex-col gap-5 justify-center p-7 border-2 border-sky-800 rounded-xl mx-auto w-fit">
        <p className="text-2xl">Are you sure you want to delete this book?</p>
        <button
          onClick={handleDelete}
          className="bg-red-500 text-white text-lg outline-none rounded-lg mx-8 py-2"
        >
          Confirm Delete
        </button>
      </div>
      )}
    </div>
  );
};
export default DeleteBook;
