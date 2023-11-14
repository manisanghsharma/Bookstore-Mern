import { Link } from "react-router-dom";
import { PiBookOpenTextLight } from "react-icons/pi";
import { BiUserCircle } from "react-icons/bi";
import { AiOutlineEdit } from "react-icons/ai";
import { BsInfoCircle } from "react-icons/bs";
import { MdOutlineDelete } from "react-icons/md";

const SingleCard = ({ book }) => {
  return (
    <div
      key={book._id}
      className="border-2 border-gray-500 rounded-lg px-4 py-2 m-4 hover:shadow-xl relative"
    >
      <h2 className="px-2 py-1 bg-red-300 absolute right-2 top-2 rounded-md">
        {book.publishYear}
      </h2>
      <h4 className="text-gray-500 text-base mt-3">{book._id}</h4>
      <div className="flex justify-left items-center gap-3 my-1">
        <PiBookOpenTextLight className="text-red-500 text-2xl" />
        <h2 className="text-lg my-2">{book.title}</h2>
      </div>
      <div className="flex justify-left items-center gap-3">
        <BiUserCircle className="text-red-400 text-2xl" />
        <h2 className="text-lg my-2">{book.author}</h2>
      </div>
      <div className="flex justify-between items-center p-3">
        <Link to={`/books/details/${book._id}`}>
          <BsInfoCircle className="text-2xl text-green-800" />
        </Link>

        <Link to={`/books/edit/${book._id}`}>
          <AiOutlineEdit className="text-2xl text-yellow-600" />
        </Link>

        <Link to={`/books/delete/${book._id}`}>
          <MdOutlineDelete className="text-2xl text-red-600" />
        </Link>
      </div>
    </div>
  );
};
export default SingleCard;
