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
            const user = await this.$services.userService.resetPassword(this.entity);
            if(user) {
                this.$router.push('/login/reset');
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