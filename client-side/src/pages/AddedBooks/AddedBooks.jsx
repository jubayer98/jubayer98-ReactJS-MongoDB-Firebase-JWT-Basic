import { useEffect, useState } from "react";
import useAuth from "../../hooks/useAuth";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";

const AddedBooks = () => {
    const [books, setBooks] = useState([]);
    const { user } = useAuth();

    useEffect(() => {
        fetch(`https://library-management-server-two-opal.vercel.app/books?email=${user.email}`)
            .then(res => res.json())
            .then(data => setBooks(data))
    }, [user.email])

    const handleDeleteBook = (id) => {
        Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, delete it!"
        }).then((result) => {
            if (result.isConfirmed) {
                fetch(`https://library-management-server-two-opal.vercel.app/books/${id}`, {
                    method: 'DELETE'
                })
                    .then((res) => res.json())
                    .then((data) => {
                        if (data.deletedCount > 0) {
                            Swal.fire({
                                position: "top-end",
                                icon: "success",
                                title: "Your book has been deleted",
                                showConfirmButton: false,
                                timer: 1500
                            });
                            // Filter out the deleted book and update state
                            const remainingBooks = books.filter((book) => book._id !== id);
                            setBooks(remainingBooks);
                        }
                    })
                    .catch((error) => {
                        console.error("Error deleting book:", error);
                        Swal.fire({
                            icon: "error",
                            title: "Oops...",
                            text: "Something went wrong while deleting the book!"
                        });
                    });
            }
        });
    };

    return (
        <div>
            <h2 className="font-semibold text-2xl text-slate-600 text-center">Added Books: {books.length}</h2>
            <div className="overflow-x-auto">
                <table className="table">
                    {/* head */}
                    <thead>
                        <tr>
                            <th>No.</th>
                            <th>Books/Authors</th>
                            <th>Borrowed Copy</th>
                            <th>Available Copy</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            books.map((book, index) => <tr key={book._id}>
                                <td>{index + 1}</td>
                                <td>
                                    <div className="flex items-center gap-3">
                                        <div className="avatar">
                                            <div className="mask mask-squircle h-12 w-12">
                                                <img
                                                    src={book.Image}
                                                    alt="Book Image" />
                                            </div>
                                        </div>
                                        <div>
                                            <div className="font-bold">{book.Name}</div>
                                            <div className="text-sm opacity-50">{book.AuthorName}</div>
                                        </div>
                                    </div>
                                </td>
                                <td>{book.borrowedBooksCount}</td>
                                <td>{book.Quantity}</td>
                                <td>
                                    <div className="gap-2 flex items-center">
                                        <Link to={`/update-book/${book._id}`}>
                                            <button className="btn-xs bg-slate-100 text-slate-600 border-slate-500 border font-semibold rounded">Update</button>
                                        </Link>
                                        <button onClick={() => handleDeleteBook(book._id)} className="btn-xs bg-red-100 text-red-600 border-red-500 border font-semibold rounded">Delete</button>
                                        <Link to={`/view-borrowed-books/${book._id}`}>
                                            <button className="btn-xs bg-amber-100 text-amber-600 border-amber-500 border font-semibold rounded">Status</button>
                                        </Link>
                                    </div>
                                </td>
                            </tr>)
                        }
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default AddedBooks;