import ApiError from "./ApiError";

export default class ApiResponse {

    public code: number;
    public data: any;
    public error: ApiError | null;

    constructor(code: number, data: any, error: ApiError | null = null) {
        this.code = code;
        this.data = data;
        this.error = error;
    }

    public static returnData(data: any) {
        return new ApiResponse(200, data);
    }

    public static returnError(error: ApiError) {
        return new ApiResponse(500, null, error);
    }

}