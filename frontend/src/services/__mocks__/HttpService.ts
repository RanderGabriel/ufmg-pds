
export default class HttpService {
    private getResponse: any;
    private postResponse: any;

    constructor() {
        this.getResponse = null
        this.postResponse = null 
    }
    
    __setGetResponse(response: any){
        this.getResponse = response
    }

    __setPostResponse(response: any){
        this.postResponse = response
    }

    async get(url: string, params: any = null) {
        return new Promise((resolve, reject) => {
            resolve(this.getResponse)
        })
    }
    
    async post<T>(url: string, data: T | null = null) {
        return new Promise((resolve, reject) =>  {
            resolve(this.postResponse)
        })
    }
    setup() {
        
    }
}

export const httpService = new HttpService()
