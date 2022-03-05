import axios from 'axios';

const Api_url = process.env.REACT_APP_API_HOST;
const Api_version = process.env.REACT_APP_API_VERSION || 'v1';
const Api_key = process.env.REACT_APP_API_KEY;
const BaseUrl = `${Api_url}/${Api_version}/`;
const Config = { headers: { 'X-API-KEY': Api_key } };

export const AxiosAction = {
    post: (endpoint, body, token=null) => {
        if (token) Config.headers.Authorization = token;
        const request = axios.post(BaseUrl + endpoint, body, Config);
        return request;
    },
    get: (endpoint, token=null) => {
        if (token) Config.headers.Authorization = token;
        const request = axios.get(BaseUrl + endpoint, Config);
        return request;
    }
};