<template>
    <div class="ml-2 mr-2 mx-2">
        <form @submit.prevent="onSubmit()">
            <div class="mb-5">
                <div class="field">
                    <label class="label">Informe seu e-mail para recuperação</label>
                    <div class="control">
                        <input class="input" type="text" v-model="entity.email">
                    </div>
                </div>
                <div class="field">
                    <div class="control">
                        <input type="radio" value="DRIVER" v-model="entity.profile">Sou motorista
                        <input type="radio" value="MECHANIC" v-model="entity.profile">Sou mecânico
                    </div>
                </div>
            </div>
            <div>
                <button class="button is-primary has-text-weight-bold is-fullwidth" :class="{'is-loading': isSending}" type="submit" :disabled="isSending">
                    RECUPERAR
                </button>
            </div>
        </form>
    </div>
</template>

<script lang="ts">
import { Component, Vue, Prop, Watch } from 'vue-property-decorator';
import { ApiResponse } from '../../../../backend/src/models';
import { User } from '../../models/bussiness';
import IForm from './IForm';

@Component
export default class ForgotForm extends Vue implements IForm<User>  {

    public isLoading: boolean;
    public isSending: boolean;
    public entity: User;
    

    constructor() {
        super();

        this.isLoading = false;
        this.isSending = false;
        this.entity = new User({
            email: '',
            password: null,
            profile: 'DRIVER'
        });
    }

    public async onSubmit() {
        try {
            this.isSending = true;
            const res = await this.$services.userService.forgotPassword(this.entity);
            if(res) {
                alert("Solicitação recebida! Verifique sua caixa de e-mail.");
            }
        } catch (error) {
        } finally {
            this.isSending = false;
            
        }
    }

}

</script>

<style lang="scss" scoped>


</style>