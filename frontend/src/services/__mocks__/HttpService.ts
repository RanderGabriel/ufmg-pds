import { httpService } from "../HttpService"

const HttpService: any = jest.createMockFromModule('../HttpService')

let getResponse: any = null
function __setGetResponse(response: any){
    getResponse = response 
}

let postResponse: any = null
function __setPostResponse(response: any) {
    postResponse
}

async function get(url: string, params: any = null) {
    return new Promise((resolve, reject) => {
        resolve(getResponse.data)
    })
}

async function post<T>(url: string, data: T | null = null) {
    return new Promise((resolve, reject) =>  {
        resolve(postResponse.data)
    })
}


HttpService.__setGetResponse = __setGetResponse
HttpService.__getPostResponse = __setPostResponse
HttpService.post = post
HttpService.get = get
