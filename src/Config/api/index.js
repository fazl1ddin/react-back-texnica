import axios from "axios";

let instance = axios.create();

const onRequest = (config) => {

    config.baseURL = `http://localhost:3002/`;
    
    return config;
}

const onRequestError = async (error) => {
    if (error.response && error.response.status === 401) {
        localStorage.removeItem('access_token');
        // createBrowserHistory().push('');
    } else if (error.response && error.response.status === 500) {
        // message.error('Keyinroq qayta urunib ko`ring')
    } else if (error.response && error.response.status === 403) {
        // message.error('Ruhsat yetarli emas')
    }
    return Promise.reject(error);
}

const onResponse = (response) => {
    return response;
} 

const onResponseError = (error) => {
    if (error.response && error.response.status === 401) {
        localStorage.removeItem('access_token');
        // createBrowserHistory().push('');
    } else if (error.response && error.response.status === 404) {
        // message.error("not found")
    } else if (error.response && error.response.status === 500) {
        // message.error('Keyinroq qayta urunib ko`ring')
    } else if (error.response && error.response.status === 403) {
        // message.error('Ruhsat yetarli emas')
    } else if (error.response && error.response.status === 422) {
        // message.error('Avvalroq band qilingan')
    }
    return Promise.reject(error);
}

instance.interceptors.request.use(onRequest, onRequestError)
instance.interceptors.response.use(onResponse, onResponseError)



export default instance;