import { Outlet } from "react-router-dom";
import Navbar from "../shared/Navbar";
import Footer from "../shared/Footer";

const MainLayout = () => {
    return (
        <div className="max-w-7xl mx-auto">
            <Navbar />
            <div className="min-h-[700px]">
                <Outlet />
            </div>
            <Footer />
        </div>
    );
};

export default MainLayout;