import { useLoaderData, useNavigate } from "react-router-dom";
import useAuth from "../../hooks/useAuth";
import Swal from "sweetalert2";

const UpdateBookDetails = () => {

    const book = useLoaderData();
    const {_id, Email, Image, Name, AuthorName, Category, Quantity, Rating} = book;

    const navigate = useNavigate();
    const { user } = useAuth();

    const handleUpdateBook = e => {
        e.preventDefault();
        const formData = new FormData(e.target);
        const updateBook = Object.fromEntries(formData.entries());
        console.log(updateBook);

        fetch(`https://library-management-server-two-opal.vercel.app/books/${_id}`, {
            method: 'PUT',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify(updateBook)
        })
            .then(res => res.json())
            .then(data => {
                if (data.modifiedCount > 0) {
                    Swal.fire({
                        position: "top-end",
                        icon: "success",
                        title: "Your book has been updated",
                        showConfirmButton: false,
                        timer: 1500
                    });
                    navigate("/added-books")
                }
            })
    }

    return (
        <div>
            <h2 className="font-semibold text-2xl text-slate-600 text-center">Update A Book Here</h2>
            <div className="card bg-base-100 w-full shrink-0 shadow-2xl">
                <form onSubmit={handleUpdateBook} className="card-body">
                    <div className="form-control">
                        <label className="label">
                            <span className="label-text font-bold">User Email</span>
                        </label>
                        <input type="email" name="Email" defaultValue={user?.email} placeholder="Email" className="input input-bordered" required readOnly />
                    </div>
                    <div className="form-control">
                        <label className="label">
                            <span className="label-text font-bold">Book Image (URL)</span>
                        </label>
                        <input type="url" name="Image" defaultValue={Image} placeholder="Please Add Book Image (URL)" className="input input-bordered" required />
                    </div>
                    <div className="flex gap-4">
                        <div>
                            <label className="label">
                                <span className="label-text font-bold">Name</span>
                            </label>
                            <input type="text" defaultValue={Name} name="Name" placeholder="Book Name" className="input input-bordered" required />
                        </div>
                        <div>
                            <label className="label">
                                <span className="label-text font-bold">Author Name</span>
                            </label>
                            <input type="text" defaultValue={AuthorName} name="AuthorName" placeholder="Author Name" className="input input-bordered" required />
                        </div>
                    </div>
                    <div className="flex gap-4">
                        <div>
                            <label className="label">
                                <span className="label-text font-bold">Category</span>
                            </label>
                            <select defaultValue={Category} className="select select-bordered" name="Category" required>
                                <option disabled>Book's Category</option>
                                <option>Mystery</option>
                                <option>Science Fiction</option>
                                <option>Fiction</option>
                                <option>Non-Fiction</option>
                            </select>
                        </div>
                        <div>
                            <label className="label">
                                <span className="label-text font-bold">Quantity</span>
                            </label>
                            <input type="number" defaultValue={Quantity} name="Quantity" placeholder="Quantity" className="input input-bordered" required />
                        </div>
                        <div>
                            <label className="label">
                                <span className="label-text font-bold">Rating</span>
                            </label>
                            <select defaultValue={Rating} className="select select-bordered" name="Rating" required>
                                <option disabled>Book's Rating</option>
                                <option>1</option>
                                <option>2</option>
                                <option>3</option>
                                <option>4</option>
                                <option>5</option>
                            </select>
                        </div>
                    </div>
                    <div className="form-control mt-6">
                        <button className="btn bg-slate-600 text-white">Submit</button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default UpdateBookDetails;