import axios from 'axios';

axios.defaults.headers.common['Authorization'] = localStorage.getItem('token');
axios.defaults.headers.common["Access-Control-Allow-Credentials"] = true;
axios.defaults.headers.common["Access-Control-Allow-Headers"] = "Origin, X-Requested-With, Content-Type, Accept, authorization";

export default class HttpService {

    public async get(url: string, params: any = null) {
        const response = await axios.get(url, {
            params,
            baseURL: process.env.VUE_APP_BASE_URL,
        });
        return response.data;
    }

    public async post<T>(url: string, data: T | null = null) {
        const response = await axios.post(url, data, {
            baseURL: process.env.VUE_APP_BASE_URL,
        });
        return response.data;
    }

}

export const httpService = new HttpService();
