<template>
    <div class="ml-2 mr-2 mx-2">
        <form @submit.prevent="onSubmit()">
            <div class="mb-5">
                <div class="field">
                    <label class="label">Logradouro</label>
                    <div class="control">
                        <input class="input" type="text" v-model="entity.street">
                    </div>
                </div>
                <div class="field">
                    <label class="label">Número</label>
                    <div class="control">
                        <input class="input" type="text" v-model="entity.streetNumber">
                    </div>
                </div>
                <div class="field">
                    <label class="label">Cidade</label>
                    <div class="control">
                        <input class="input" type="tel" v-model="entity.city">
                    </div>
                </div>
                <div class="field">
                    <label class="label">Estado</label>
                    <div class="control">
                        <input class="input" type="text" v-model="entity.state">
                    </div>
                </div>
                <div class="field">
                    <label class="label">País</label>
                    <div class="control">
                        <input class="input" type="text" v-model="entity.country">
                    </div>
                </div>
                <div class="field">
                    <div class="control">
                        <input class="input" type="checkbox" v-model="entity.ableToMove"> Disponível para deslocamento
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
import { Autoshop, User } from '../../models/bussiness';
import IForm from './IForm';

@Component
export default class AutoshopForm extends Vue implements IForm<Autoshop>  {

    public isLoading: boolean;
    public isSending: boolean;
    public entity: Autoshop;
    private user: User;
    

    constructor() {
        super();
        this.user = this.$services.userService.getCurrentUser();
        this.isLoading = false;
        this.isSending = false;
        this.entity = new Autoshop({
            id: null,
            street: '',
            streetNumber: undefined,
            city: '',
            state: '',,
            country: '',
            ableToMove: false,
            mechanicId: this.user.id,
        });
    }

    public async onSubmit() {
        try {
            this.isSending = true;
            const autoshop = await this.$services.autoshopService.create(this.entity);
            this.$emit('finished', autoshop);

        } catch (error) {
        } finally {
            this.isSending = false;
            
        }
    }

}

</script>

<style lang="scss" scoped>


</style>