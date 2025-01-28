import axios from "axios";

let baseURI: (string | undefined) = '';

const env = import.meta.env.MODE;
if (env == "development") {
    baseURI = import.meta.env.VITE_BACKEND_URI_BASE_DEVELOPMENT;
} else {
    baseURI = import.meta.env.VITE_BACKEND_URI_BASE_PRODUCTION;
}

export const axiosInstance = axios.create({
    baseURL: baseURI,
});