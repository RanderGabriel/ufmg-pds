<template>
    <div class="ml-2 mr-2 mx-2">
        <form @submit.prevent="onSubmit()">
            <div class="mb-5">
                <div class="field">
                    <label class="label">Fabricante</label>
                    <div class="control">
                        <input class="input" type="text" v-model="entity.make">
                    </div>
                </div>
                <div class="field">
                    <label class="label">Modelo</label>
                    <div class="control">
                        <input class="input" type="text" v-model="entity.model">
                    </div>
                </div>
                <div class="field">
                    <label class="label">Ano</label>
                    <div class="control">
                        <input class="input" type="tel" v-model="entity.year">
                    </div>
                </div>
                <div class="field">
                    <label class="label">Cor</label>
                    <div class="control">
                        <input class="input" type="text" v-model="entity.color">
                    </div>
                </div>
                <div class="field">
                    <label class="label">Placa</label>
                    <div class="control">
                        <input class="input" type="text" v-model="entity.licensePlate">
                    </div>
                </div>        
            </div>
            <div>
                <button class="button is-primary has-text-weight-bold is-fullwidth" :class="{'is-loading': isSending}" type="submit" :disabled="isSending">
                    CADASTRAR
                </button>
            </div>
        </form>
        {{isSending}}
    </div>
</template>

<script lang="ts">
import { Component, Vue, Prop, Watch } from 'vue-property-decorator';
import { Vehicle, User } from '../../models/bussiness';
import IForm from './IForm';

@Component
export default class VehicleForm extends Vue implements IForm<Vehicle>  {

    public isLoading: boolean;
    public isSending: boolean;
    public entity: Vehicle;
    private user: User;
    

    constructor() {
        super();
        this.user = this.$services.userService.getCurrentUser();
        this.isLoading = false;
        this.isSending = false;
        this.entity = new Vehicle({
            id: null,
            make: '',
            model: '',
            year: undefined,
            color: '',
            licensePlate: '',
            ownerId: this.user.id,
        });
    }

    public async onSubmit() {
        try {
            this.isSending = true;
            const vehicle = await this.$services.vehicleService.create(this.entity);
            this.$emit('finished', vehicle);

        } catch (error) {
        } finally {
            this.isSending = false;
            
        }
    }

}

</script>

<style lang="scss" scoped>


</style>