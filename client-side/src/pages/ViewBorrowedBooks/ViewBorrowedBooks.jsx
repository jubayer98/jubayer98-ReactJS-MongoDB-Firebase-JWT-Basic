import { useLoaderData } from "react-router-dom";

const ViewBorrowedBooks = () => {

    const borrowedBooks = useLoaderData();

    return (
        <div>
            <h2 className="font-semibold text-2xl text-slate-600 text-center">Borrower's Information</h2>
            <div className="overflow-x-auto">
                <table className="table">
                    {/* head */}
                    <thead>
                        <tr>
                            <th>No.</th>
                            <th>Borrower's Email</th>
                            <th>Borrowed Date</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            borrowedBooks.map((borrowBook, index) => <tr key={borrowBook._id}>
                                <td>{index + 1}</td>
                                <td>{borrowBook.email}</td>
                                <td>{borrowBook.date}</td>
                            </tr>)
                        }
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default ViewBorrowedBooks;