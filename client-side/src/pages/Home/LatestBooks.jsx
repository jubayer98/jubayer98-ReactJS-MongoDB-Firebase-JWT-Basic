import { useEffect, useState } from "react";
import LatestBooksCard from "./LatestBooksCard";

const LatestBooks = () => {

    const [books, setBooks] = useState([]);

    useEffect(() => {
        fetch("https://library-management-server-two-opal.vercel.app/books")
            .then(res => res.json())
            .then(data => setBooks(data))
    }, [])

    return (
        <div>
            <h2 className="font-semibold text-2xl text-slate-600 text-center">Recently Added Books</h2>
            <div className="grid grid-cols-1 mt-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                {
                    books.slice(0, 4).map(book => <LatestBooksCard
                        key={book._id}
                        book={book}>
                    </LatestBooksCard>)
                }
            </div>
        </div>
    );
};

export default LatestBooks;