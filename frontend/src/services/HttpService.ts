import axios from 'axios';

export default class HttpService {

    public setup() {
        axios.defaults.headers.common['Authorization'] = localStorage.getItem('token');
        axios.defaults.headers.common["Access-Control-Allow-Credentials"] = true;
        axios.defaults.headers.common["Access-Control-Allow-Headers"] = "Origin, X-Requested-With, Content-Type, Accept, authorization";
    }

    public async get(url: string, params: any = null) {
        try {
            const response = await axios.get(url, {
                params,
                baseURL: process.env.VUE_APP_BASE_URL,
            });
            return response.data;
        } catch {
            alert("Ocorreu um erro inpesperado. Tente novamente mais tarde");
            return null;
        }
    }

    public async post<T>(url: string, data: T | null = null) {
        try {
            const response = await axios.post(url, data, {
                baseURL: process.env.VUE_APP_BASE_URL,
            });
            return response.data;
        } catch {
            alert("Ocorreu um erro inpesperado. Tente novamente mais tarde");
            return null;
        }
        
    }

}

export const httpService = new HttpService();
