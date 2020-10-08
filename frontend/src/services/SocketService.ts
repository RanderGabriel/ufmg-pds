import io from 'socket.io-client';

export default class SocketService {

    private socket: any;

    constructor() {
        this.socket = io(process.env.VUE_APP_BASE_URL as string);
    }

    on(event: string, callback: (data: any) => void) {
        this.socket.on(event, callback);
    }

    emit(event: string, data: any) {
        this.socket.emit(event, data);
    }
}

export const socketService = new SocketService();