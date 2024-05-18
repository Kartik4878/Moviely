import Axios from "axios";
import { toast } from "react-toastify";
function setKey(key) {
    Axios.defaults.headers.common["Authorization"] = key;
}
Axios.interceptors.response.use(null, error => {
    const expectedError = error.response && error.response.status >= 400 && error.response.status < 500;
    if (!expectedError) {
        console.log("Error:", error);
        toast.error("An unexpected error occured")
    }
    return Promise.reject(error);

})

const APIHandler = {
    get: Axios.get,
    post: Axios.post,
    put: Axios.put,
    delete: Axios.delete,
    setKey: setKey

}
export default APIHandler;

