<template>
    <div class="ml-2 mr-2 mx-2">
        <form @submit.prevent="onSubmit()">
            <div class="mb-5">
                <div class="field">
                    <label class="label">E-mail</label>
                    <div class="control">
                        <input class="input" type="text" v-model="entity.email">
                    </div>
                </div>
                <div class="field">
                    <label class="label">Senha</label>
                    <div class="control">
                        <input class="input" type="password" v-model="entity.password">
                    </div>
                </div>
                <div class="field">
                    <label class="label">Confirme sua senha</label>
                    <div class="control">
                        <input class="input" type="password" v-model="entity.passwordConfirmation">
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
                    CADASTRAR
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
export default class SignupForm extends Vue implements IForm<User>  {

    public isLoading: boolean;
    public isSending: boolean;
    public entity: User;
    

    constructor() {
        super();

        this.isLoading = false;
        this.isSending = false;
        this.entity = new User({
            email: '',
            password: '',
            passwordConfirmation: '',
            profile: 'DRIVER'
        });
    }

    public async onSubmit() {
        try {
            this.isSending = true;
            const user = await this.$services.userService.create(this.entity);
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