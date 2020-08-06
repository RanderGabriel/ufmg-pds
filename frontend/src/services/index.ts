import VehicleService, { vehicleService } from './VehicleService';

export interface IServices {
    vehicleService: VehicleService;
}

export class ServicesPlugin {

    public install(Vue: any) {
        Vue.prototype.$services = {
            vehicleService,
        } as IServices;
    }

}

export default new ServicesPlugin();
