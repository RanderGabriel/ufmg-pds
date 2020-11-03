import VehicleService, { vehicleService } from './VehicleService';
import UserService, { userService } from './UserService';
import SocketService, { socketService } from './SocketService';
import AuthService, { authService } from './AuthService';
import SolicitationService, { solicitationService } from './SolicitationService';
import EvaluationService, { evaluationService } from './EvaluationService';

export interface IServices {
    vehicleService: VehicleService;
    userService: UserService;
    socketService: SocketService;
    authService: AuthService,
    solicitationService: SolicitationService,
    evaluationService: EvaluationService
}

export default {
    vehicleService,
    userService,
    socketService,
    authService,
    solicitationService,
    evaluationService
} as IServices;
