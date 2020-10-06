export default class WebsocketService {
    static io: any;
    static socket: any;
    
    static initIo(io: any) {
        WebsocketService.io = io;
    }

    static onConnection(io, onConnection: (socket) => void) {
        this.io = io;
        this.io.on('connection', (socket) => {
            this.socket = socket;
            onConnection(socket);
        });
    }

    static emit(event: string, data: any) {
        this.io.sockets.emit(event, data);
    }

    static broadcast(event: string, data: any) {
        this.socket.broadcast.emit(event, data);
    }
    
}
