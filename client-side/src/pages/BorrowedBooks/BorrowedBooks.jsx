import { useEffect, useState } from "react";
import useAuth from "../../hooks/useAuth";
import Swal from "sweetalert2";
import axios from "axios";
import useAxiosSecure from "../../hooks/useAxiosSecure";

const BorrowedBooks = () => {

    const { user } = useAuth();
    const [books, setBooks] = useState([]);

    const axiosSecure = useAxiosSecure();

    useEffect(() => {
        // fetch(`https://library-management-server-two-opal.vercel.app/borrowed-books?email=${user.email}`)
        //     .then(res => res.json())
        //     .then(data => setBooks(data))

        // axios.get(`https://library-management-server-two-opal.vercel.app/borrowed-books?email=${user.email}`, {withCredentials: true})
        //     .then(res => setBooks(res.data))

        axiosSecure.get(`/borrowed-books?email=${user.email}`)
            .then(res => setBooks(res.data));

    }, [user.email])

    const handleReturnBook = (id) => {
        Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, return it!"
        }).then((result) => {
            if (result.isConfirmed) {
                fetch(`https://library-management-server-two-opal.vercel.app/borrowed-books/${id}`, {
                    method: 'DELETE'
                })
                    .then((res) => res.json())
                    .then((data) => {
                        if (data.deletedCount > 0) {
                            Swal.fire({
                                position: "top-end",
                                icon: "success",
                                title: "Your book has been returned",
                                showConfirmButton: false,
                                timer: 1500
                            });
                            // Filter out the deleted book and update state
                            const remainingBooks = books.filter((book) => book._id !== id);
                            setBooks(remainingBooks);
                        }
                    })
                    .catch((error) => {
                        console.error("Error returning book:", error);
                        Swal.fire({
                            icon: "error",
                            title: "Oops...",
                            text: "Something went wrong while returning the book!"
                        });
                    });
            }
        });
    };

    return (
        <div>
            <h2 className="font-semibold text-2xl text-slate-600 text-center">Borrowed Books: {books.length}</h2>
            <div className="overflow-x-auto">
                <table className="table">
                    {/* head */}
                    <thead>
                        <tr>
                            <th>Books/Authors</th>
                            <th>Borrowed Date</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            books.map(book => <tr key={book._id}>
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
                                <td>{book.date}</td>
                                <td>
                                    <button onClick={() => handleReturnBook(book._id)} className="btn-xs bg-red-100 text-red-600 border-red-500 border font-semibold rounded">Return</button>
                                </td>
                            </tr>)
                        }
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default BorrowedBooks;