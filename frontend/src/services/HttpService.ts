import axios from 'axios';

export default class HttpService {

    public setAuthToken(token: string) {
        axios.defaults.headers.common["Access-Control-Allow-Credentials"] = true;
        axios.defaults.headers.common["Access-Control-Allow-Headers"] = "Origin, X-Requested-With, Content-Type, Accept, authorization";
        axios.defaults.headers.common["authorization"] = token;
    }

    public async get(url: string, params: any = null) {
        try {
            const response = await axios.get(url, {
                params,
                baseURL: process.env.VUE_APP_BASE_URL,
            });
            return response.data;
        } catch (error) {
            throw error;
        }
    }

    public async post<T>(url: string, data: T | null = null) {
        try {
            const response = await axios.post(url, data, {
                baseURL: process.env.VUE_APP_BASE_URL,
            });
            return response.data;
        } catch (error) {
            throw error;
        }
    }

}

export const httpService = new HttpService();
