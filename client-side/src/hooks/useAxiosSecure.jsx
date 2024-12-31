import axios from "axios";
import { useEffect } from "react";
import useAuth from "./useAuth";
import { useNavigate } from "react-router-dom";

const axiosInstance = axios.create({
    baseURL: 'https://library-management-server-two-opal.vercel.app',
    withCredentials: true
});

const useAxiosSecure = () => {

    const { signOutUser } = useAuth();
    const navigate = useNavigate();

    useEffect(() => {
        axiosInstance.interceptors.response.use(response => {
            return response;
        }, error => {
            console.log('error caught in interceptor', error)

            if (error.status === 401 || error.status === 403){
                signOutUser()
                .then(() => {
                    navigate('/signIn')
                })
                .catch(error => console.log(error));
            }

            return Promise.reject(error);
        })
    }, [])

    return axiosInstance;
};

export default useAxiosSecure;