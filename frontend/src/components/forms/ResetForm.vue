<template>
    <div class="ml-2 mr-2 mx-2">
        <form @submit.prevent="onSubmit()">
            <div class="mb-5">
                <div class="field">
                    <label class="label">Informe a nova Senha</label>
                    <div class="control">
                        <input class="input" type="password" v-model="entity.password">
                    </div>
                </div>
                <div class="field">
                    <label class="label">Confirme a nova Senha</label>
                    <div class="control">
                        <input class="input" type="password" v-model="entity.passwordConfirmation">
                    </div>
                </div>
            </div>
            <div>
                <button class="button is-primary has-text-weight-bold is-fullwidth" :class="{'is-loading': isSending}" type="submit" :disabled="isSending">
                    CONFIRMAR
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
export default class ResetForm extends Vue implements IForm<User>  {

    public isLoading: boolean;
    public isSending: boolean;
    public entity: User;

    constructor() {
        super();
        
        const params = new URLSearchParams(window.location.search);
 
        this.isLoading = false;
        this.isSending = false;
        this.entity = new User({
            email: params.get('email'),
            password: '',
            passwordConfirmation: '',
            passwordResetToken: params.get('token'),
            profile: 'DRIVER',
        });
    }

    public async onSubmit() {
        try {
            this.isSending = true;
            const user = await this.$services.userService.resetPassword(this.entity);
            console.log(user);
            if(user) {
                alert("A nova senha foi cadastrada com sucesso!");
                this.$router.push('/profile');
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