import BackButton from "../components/BackButton";
import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import Spinner from "../components/Spinner";
import { useSnackbar } from "notistack";

const DeleteBook = () => {
  const [loading, setLoading] = useState(false);
  const { id } = useParams();
  const navigate = useNavigate();
  const apiUrl = `https://bookstore-mern-2tp3.onrender.com/books/${id}`;
  const { enqueueSnackbar } = useSnackbar();
  const handleDelete = async () => {
    try {
      setLoading(true);
      await axios.delete(apiUrl);
      navigate("/");
      enqueueSnackbar("Book Deleted Successfully", {
        variant: "success",
      });
    } catch (err) {
      console.log(err.message);
      enqueueSnackbar(`Error: ${err.message}`, { variant: "error" });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-5">
      <BackButton />
      <h1 className="my-5 text-2xl">Delete Book</h1>
      {loading ? (
        <Spinner />
      ) : (
        <div className="flex flex-col justify-center gap-5 mx-auto border-2 p-7 border-sky-800 rounded-xl w-fit">
          <p className="text-2xl">Are you sure you want to delete this book?</p>
          <button
            onClick={handleDelete}
            className="py-2 mx-8 text-lg text-white bg-red-500 rounded-lg outline-none"
          >
            Confirm Delete
          </button>
        </div>
      )}
    </div>
  );
};
export default DeleteBook;
