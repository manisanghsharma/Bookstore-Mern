import BackButton from "../components/BackButton";
import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Spinner from "../components/Spinner";

const CreateBook = () => {
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [publishYear, setPublishYear] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const apiUrl = "http://localhost:5555/books";
  const data = { title, author, publishYear };

  const handleCreate = async () => {
    try {
      setLoading(true);
      await axios.post(apiUrl, data);
      navigate("/");
    } catch (err) {
      console.log(err.message);
      alert("An error happened, please check in console");
    } finally{
      setLoading(false);
    }
  };

  return (
    <div className="p-4">
      <BackButton />
      <h1 className="text-3xl py-5 px-2">Create Book</h1>
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
              className="border-2 border-black outline-none p-2 text-xl mb-8 rounded-md"
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
              className="border-2 border-black outline-none p-2 text-xl mb-8 rounded-md"
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
              className="border-2 border-black outline-none p-2 text-xl mb-8 rounded-md"
            />
            <button className="mx-8 my-3 py-3 border-2 bg-sky-600 outline-none border-none rounded-md text-white text-xl">
              Submit
            </button>
          </form>
        </div>
      )}
    </div>
  );
};
export default CreateBook;
