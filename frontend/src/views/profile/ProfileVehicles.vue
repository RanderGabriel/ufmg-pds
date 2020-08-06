<template>
    <div class="profile-vehicles">
        <vehicle-form v-if="isFormActive" @finished="onFinished($event)"></vehicle-form>
        <div>
            <h2 class="is-size-3">
                VEÍCULOS
            </h2>
        </div>
        <div>
            <h3 class="is-size-5">
                VEÍCULOS CADASTRADOS
            </h3>
        </div>
        <div>
            <template v-if="hasVehicles">
                <table class="table is-fullwidth">
                    <thead>
                        <tr>
                            <th>
                                Fabricante
                            </th>
                            <th>
                                Modelo
                            </th>
                            <th>
                                Cor
                            </th>
                            <th>
                                Placa
                            </th>
                            <th>
                                
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-for="vehicle in vehicles" :key="vehicle.id">
                            <td>
                                {{vehicle.make}}
                            </td>
                            <td>
                                {{vehicle.model}}
                            </td>
                            <td>
                                {{vehicle.color}}
                            </td>
                            <td>
                                {{vehicle.licensePlate}}
                            </td>
                            <td>
                                <button class="button is-size-7" @click="editVehicle(vehicle)">
                                    EDITAR
                                </button>
                                <button class="button is-size-7" @click="deleteVehicle(vehicle)">
                                    EXCLUIR
                                </button>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </template>
            <template v-else>
                <empty-list @addNew="showForm()">
                    <template v-slot:message>
                        Você não possui veículos cadastrados.
                    </template>
                    <template v-slot:button>
                        CADASTRAR NOVO VEÍCULO
                    </template>
                </empty-list>
            </template>
        </div>
    </div>
</template>

<script lang="ts">
import { Component, Vue, Prop, Watch } from 'vue-property-decorator';
import { Vehicle } from '../../models/bussiness';

@Component
export default class ProfileVehicles extends Vue {

    private isFormActive: boolean;
    private vehicles: Vehicle[];

    constructor() {
        super();

        this.isFormActive = false;
        this.vehicles = [];
    }

    private created() {
        this.fetchVehicles();
    }

    private async fetchVehicles() {
        this.vehicles = this.vehicles = await this.$services.vehicleService.getAll();
    }

    private editVehicle() {
        this.isFormActive = true;
    }

    private async deleteVehicle(vehicle: Vehicle) {
        await this.$services.vehicleService.delete(vehicle.id);
        await this.fetchVehicles();
    }

    private async onFinished() {
        await this.fetchVehicles();
        this.isFormActive = false;
    }

    private showForm() {
        this.isFormActive = true;
    }

    private get hasVehicles(): boolean {
        return this.vehicles.length > 0;
    }
}

</script>

<style lang="scss" scoped>

    .profile-vehicles {
    }

</style>