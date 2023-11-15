import BackButton from "../components/BackButton";
import { useState} from "react";
import axios from "axios";
import {useNavigate } from "react-router-dom";
import Spinner from "../components/Spinner";
import { useSnackbar } from "notistack";

const CreateBook = () => {
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [publishYear, setPublishYear] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const {enqueueSnackbar} = useSnackbar(); 

  const apiUrl = `${import.meta.env.VITE_API_URL}/books`;
  const data = { title, author, publishYear };
  const handleCreate = async () => {
    try {
      setLoading(true);
      await axios.post(apiUrl, data);
      navigate("/");
      enqueueSnackbar('Book Created Successfully', {variant: 'success'});
    } catch (err) {
      console.log(err.message);
      enqueueSnackbar(`Error: ${err.message}`, { variant: "error" });
    } finally{
      setLoading(false);
    }
  };
  return (
    <div className="p-4">
      <BackButton /> 
      <h1 className="px-2 py-5 text-3xl">Create Book</h1>
      {loading ? (
        <Spinner />
      ) : (
        <div className="p-5 border-2 border-sky-800 rounded-xl w-[600px] mx-auto max-md:w-[400px] max-sm:w-[350px]">
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleCreate();
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
              Submit
            </button>
          </form>
        </div>
      )}
    </div>
    
  );
};
export default CreateBook;
