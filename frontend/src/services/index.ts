import VehicleService, { vehicleService } from './VehicleService';
import UserService, { userService } from './UserService';
import SocketService, { socketService } from './SocketService';
import AuthService, { authService } from './AuthService';
import SolicitationService, { solicitationService } from './SolicitationService';

export interface IServices {
    vehicleService: VehicleService;
    userService: UserService;
    socketService: SocketService;
    authService: AuthService,
    solicitationService: SolicitationService,
}

export default {
    vehicleService,
    userService,
    socketService,
    authService,
    solicitationService,
} as IServices;
