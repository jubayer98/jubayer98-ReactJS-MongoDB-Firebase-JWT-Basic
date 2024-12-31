import { useContext } from "react";
import AuthContext from "../context/AuthContext/AuthContext";
import { useLocation, useNavigate } from "react-router-dom";

const SocialLogin = () => {

    const { signInWithGoogle } = useContext(AuthContext);
    const location = useLocation();
    const navigate = useNavigate();
    const from = location.state || '/';

    const handleGoogleSignIn = () => {
        signInWithGoogle()
            .then(result => {
                console.log(result.user)
                navigate(from)
            })
            .catch(error => {
                console.log(error)
            })
    }

    return (
        <div>
            <div className="divider">OR</div>
            <p onClick={handleGoogleSignIn} className="bg-red-100 text-red-600 font-bold text-center p-2 border border-red-700">Google</p>
        </div>
    );
};

export default SocialLogin;