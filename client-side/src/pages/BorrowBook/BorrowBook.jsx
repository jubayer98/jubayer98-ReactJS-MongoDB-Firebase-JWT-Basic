import { useNavigate, useParams } from "react-router-dom";
import useAuth from "../../hooks/useAuth";
import Swal from "sweetalert2";

const BorrowBook = () => {

    const { id } = useParams();
    const { user } = useAuth();
    const navigate = useNavigate();
    //console.log(id);

    const handleBookNow = e => {
        e.preventDefault();
        const form = e.target;
        const email = form.email.value;
        const date = form.date.value;

        const borrowedBook = {
            book_id: id,
            email,
            date
        }

        fetch('https://library-management-server-two-opal.vercel.app/borrowed-books', {
            method: 'POST',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify(borrowedBook)
        })
            .then(res => res.json())
            .then(data => {
                if (data.insertedId) {
                    Swal.fire({
                        position: "top-end",
                        icon: "success",
                        title: "Your book has been booked",
                        showConfirmButton: false,
                        timer: 1500
                    });
                    navigate("/borrowed-books")
                }
            })
    }

    return (
        <div className="card bg-base-100 flex justify-center mt-4 mx-auto w-1/2 shadow-2xl">
            <h2 className="font-semibold text-2xl text-slate-600 mt-4 text-center">Borrow Your Book Now</h2>
            <form onSubmit={handleBookNow} className="card-body">
                <div className="form-control">
                    <label className="label">
                        <span className="label-text font-bold">User Email</span>
                    </label>
                    <input type="email" placeholder="email" name="email" value={user?.email} readOnly className="input input-bordered" required />
                </div>
                <div className="form-control">
                    <label className="label">
                        <span className="label-tex font-bold">Date</span>
                    </label>
                    <input type="date" defaultValue={new Date().toISOString().split('T')[0]} placeholder="text" name="date" className="input input-bordered" required />
                </div>
                <div className="form-control mt-6">
                    <button className="btn bg-slate-600 text-white">Confirm</button>
                </div>
            </form>
        </div>
    );
};

export default BorrowBook;