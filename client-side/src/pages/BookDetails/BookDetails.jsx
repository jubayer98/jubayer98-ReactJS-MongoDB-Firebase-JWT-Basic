import { Link, useLoaderData } from "react-router-dom";

const BookDetails = () => {

    const { _id, Image, Name, AuthorName, Category, Quantity, Rating } = useLoaderData();

    return (
        <div className="hero bg-slate-100 min-h-screen">
            <div className="hero-content flex-col lg:flex-row">
                <img
                    src={Image}
                    alt="Book Image"
                    className="max-w-sm rounded-lg shadow-2xl" />
                <div className="space-y-2">
                    <h1 className="text-5xl font-bold">{Name}</h1>
                    <p><span className="font-bold">Author: </span>{AuthorName}</p>
                    <p><span className="font-bold">Category: </span>{Category}</p>
                    <p><span className="font-bold">Quantity: </span>{Quantity}</p>
                    <p><span className="font-bold">Rating: </span>{Rating}</p>
                    <Link to={Quantity > 0 ? `/borrowBook/${_id}` : "#"}>
                        <button
                            className={`btn mt-2 font-bold ${Quantity === 0 ? 'bg-gray-400 cursor-not-allowed' : 'bg-red-600 text-white'}`}
                        >
                            Borrow Now
                        </button>
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default BookDetails;