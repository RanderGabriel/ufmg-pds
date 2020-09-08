import VehicleService, { vehicleService } from './VehicleService';
import UserService, { userService } from './UserService';
import AutoshopService, { autoshopService } from './AutoshopService';

export interface IServices {
    vehicleService: VehicleService;
    userService: UserService;
    autoshopService: AutoshopService;
}

export class ServicesPlugin {

    public install(Vue: any) {
        Vue.prototype.$services = {
            vehicleService,
            userService,
            autoshopService
        } as IServices;
    }

}

export default new ServicesPlugin();
