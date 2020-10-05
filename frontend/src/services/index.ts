import VehicleService, { vehicleService } from './VehicleService';
import UserService, { userService } from './UserService';
import AutoshopService, { autoshopService } from './AutoshopService';
import RequestService, { requestService } from './RequestService';

export interface IServices {
    vehicleService: VehicleService;
    userService: UserService;
    autoshopService: AutoshopService;
    requestService: RequestService;
}

export class ServicesPlugin {

    public install(Vue: any) {
        Vue.prototype.$services = {
            vehicleService,
            userService,
            autoshopService,
            requestService
        } as IServices;
    }

}

export default new ServicesPlugin();
