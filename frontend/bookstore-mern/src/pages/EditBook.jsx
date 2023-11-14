import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import BackButton from "../components/BackButton";
import Spinner from "../components/Spinner";
import axios from "axios";
import { useSnackbar } from "notistack";

const EditBook = () => {
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [publishYear, setPublishYear] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { id } = useParams();
  const {enqueueSnackbar} = useSnackbar();

  const apiUrl = `https://bookstore-mern-2tp3.onrender.com/books/${id}`;
  const data = { title, author, publishYear };

  useEffect(() => {
    const fetchBook = async () => {
      try {
        setLoading(true);
        const response = await axios.get(apiUrl);
        setTitle(response.data.title);
        setAuthor(response.data.author);
        setPublishYear(response.data.publishYear);
      } catch (err) {
        console.log(err.message);
        
      } finally {
        setLoading(false);
      }
    }

    fetchBook();
  }, []);

  const handleEdit = async () => {
    try {
      setLoading(true);
      await axios.put(apiUrl, data);
      navigate("/");
      enqueueSnackbar("Book Edited Successfully", { variant: "success" });
    } catch (err) {
      console.log(err.message);
      enqueueSnackbar(`Error: ${err.message}`, { variant: "error" });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-4">
      <BackButton />
      <h1 className="px-2 py-5 text-3xl">Edit Book</h1>
      {loading ? (
        <Spinner />
      ) : (
        <div className="p-5 border-2 border-sky-800 rounded-xl w-[600px] mx-auto max-md:w-[400px]">
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleEdit();
            }}
            className="flex flex-col"
          >
            <label htmlFor="title" className="text-2xl text-gray-600">
              Title
            </label>
            <input
              id="title"
              type="text"
              placeholder="Enter Title..."
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="p-2 mb-8 text-xl border-2 border-black rounded-md outline-none"
            />
            <label htmlFor="author" className="text-2xl text-gray-600">
              Author
            </label>
            <input
              id="author"
              type="text"
              placeholder="Enter Author..."
              value={author}
              onChange={(e) => setAuthor(e.target.value)}
              className="p-2 mb-8 text-xl border-2 border-black rounded-md outline-none"
            />
            <label htmlFor="publishYear" className="text-2xl text-gray-600">
              Publish Year
            </label>
            <input
              id="publishYear"
              type="text"
              placeholder="Enter Publish Year..."
              value={publishYear}
              onChange={(e) => setPublishYear(e.target.value)}
              className="p-2 mb-8 text-xl border-2 border-black rounded-md outline-none"
            />
            <button className="py-3 mx-8 my-3 text-xl text-white border-2 border-none rounded-md outline-none bg-sky-600">
              Save
            </button>
          </form>
        </div>
      )}
    </div>
  );
};
export default EditBook;
