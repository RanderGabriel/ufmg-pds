import VehicleService, { vehicleService } from './VehicleService';
import UserService, { userService } from './UserService';


export interface IServices {
    vehicleService: VehicleService;
    userService: UserService;
}

export class ServicesPlugin {

    public install(Vue: any) {
        Vue.prototype.$services = {
            vehicleService,
            userService
        } as IServices;
    }

}

export default new ServicesPlugin();
