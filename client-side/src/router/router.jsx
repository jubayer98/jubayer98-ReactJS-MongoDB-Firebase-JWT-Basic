import {
    createBrowserRouter,
    RouterProvider,
} from "react-router-dom";
import MainLayout from "../layout/MainLayout";
import Home from "../pages/Home/Home";
import Register from "../pages/Register/Register";
import SignIn from "../pages/SignIn/SignIn";
import BookDetails from "../pages/BookDetails/BookDetails";
import PrivateRoute from "./PrivateRoute";
import BorrowBook from "../pages/BorrowBook/BorrowBook";
import BorrowedBooks from "../pages/BorrowedBooks/BorrowedBooks";
import AddBook from "../pages/AddBook/AddBook";
import AddedBooks from "../pages/AddedBooks/AddedBooks";
import ViewBorrowedBooks from "../pages/ViewBorrowedBooks/ViewBorrowedBooks";
import AllBooks from "../pages/AllBooks/AllBooks";
import UpdateBookDetails from "../pages/UpdateBookDetails.jsx/UpdateBookDetails";
import ErrorPage from "../pages/ErrorPage/ErrorPage";

const router = createBrowserRouter([
    {
        path: "/",
        element: <MainLayout></MainLayout>,
        errorElement: <ErrorPage></ErrorPage>,
        children: [
            {
                path: "/",
                element: <Home></Home>
            },
            {
                path: "/allBooks",
                element: <AllBooks></AllBooks>
            },
            {
                path: "/books/:id",
                element: <PrivateRoute><BookDetails></BookDetails></PrivateRoute>,
                loader: ({ params }) => fetch(`https://library-management-server-two-opal.vercel.app/books/${params.id}`)
            },
            {
                path: "/borrowBook/:id",
                element: <PrivateRoute><BorrowBook></BorrowBook></PrivateRoute>
            },
            {
                path: "/borrowed-books",
                element: <PrivateRoute><BorrowedBooks></BorrowedBooks></PrivateRoute>
            },
            {
                path: "/add-book",
                element: <PrivateRoute><AddBook></AddBook></PrivateRoute>
            },
            {
                path: "/added-books",
                element: <PrivateRoute><AddedBooks></AddedBooks></PrivateRoute>
            },
            {
                path: "/update-book/:id",
                element: <PrivateRoute><UpdateBookDetails></UpdateBookDetails></PrivateRoute>,
                loader: ({params}) => fetch(`https://library-management-server-two-opal.vercel.app/books/${params.id}`)
            },
            {
                path: "/view-borrowed-books/:book_id",
                element: <PrivateRoute><ViewBorrowedBooks></ViewBorrowedBooks></PrivateRoute>,
                loader: ({params}) => fetch(`https://library-management-server-two-opal.vercel.app/borrowed-books/books/${params.book_id}`)
            },
            {
                path: "/register",
                element: <Register></Register>
            },
            {
                path: "/signIn",
                element: <SignIn></SignIn>
            }
        ]
    },
]);

export default router;