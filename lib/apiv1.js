import Axios from "axios";


const api = Axios.create({
    baseURL:process.env.NEXT_PUBLIC_BACKEND_URL,
    headers: {
        'Accept': 'application/json',
        'Content-Type': 'multipart/form-data',
        
    },
    withCredentials:true
});

export default api;