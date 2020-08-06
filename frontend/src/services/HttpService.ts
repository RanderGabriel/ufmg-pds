import axios from 'axios';

export default class HttpService {

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
