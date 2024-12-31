import { Link } from "react-router-dom";

const LatestBooksCard = ({ book }) => {

    const { _id, Image, Name, AuthorName } = book;

    return (
        <div className="card card-compact bg-base-100 shadow-xl">
            <figure>
                <img
                    src={Image}
                    alt={Name} />
            </figure>
            <div className="card-body">
                <h2 className="card-title">{Name}</h2>
                <p><span className="font-bold">Author:</span> {AuthorName}</p>
                <div className="card-actions bg-slate-600 justify-center flex text-white rounded p-1 font-semibold">
                    <Link to={`/books/${_id}`}>
                        <button>Details</button>
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default LatestBooksCard;