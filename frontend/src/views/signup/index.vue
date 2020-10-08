<template>
    <div class="signup p-4">
        <form @submit.prevent="onSubmit()">
            <div class="field">
                <label class="label">Nome</label>
                <div class="control">
                    <input class="input" type="text" v-model="formData.name" autocomplete="off">
                </div>
            </div>
            <div class="field">
                <label class="label">E-mail</label>
                <div class="control">
                    <input class="input" type="email" v-model="formData.email" autocomplete="off">
                </div>
            </div>
            <div class="field">
                <label class="label">Senha</label>
                <div class="control">
                    <input class="input" type="password" v-model="formData.password" autocomplete="off">
                </div>
            </div>
            <div class="field">
                <label class="label">Confirmar senha</label>
                <div class="control">
                    <input class="input" type="password" v-model="formData.passwordConfirm" autocomplete="off">
                </div>
            </div>
            <div class="field mb-5">
                <label class="label">Telefone</label>
                <div class="control">
                    <input class="input" type="tel" v-model="formData.phoneNumber" autocomplete="off">
                </div>
            </div>
            <button class="button is-medium is-rounded is-dark is-fullwidth" type="submit">
                CADASTRAR
            </button>
        </form>
    </div>
</template>

<script lang="ts">
import router from '@/router';
import { userService } from '@/services/UserService';
import { defineComponent, ref } from 'vue';

export default defineComponent({
    name: 'signup',
    setup() {
        const isLoading = ref(false);
        const formData = ref({
            name: '',
            email: '',
            password: '',
            passwordConfirm: '',
            phoneNumber: '',
        });

        async function onSubmit() {
            isLoading.value = true;
            await userService.create({
                name: formData.value.name,
                email: formData.value.email,
                password: formData.value.password,
                phoneNumber: formData.value.phoneNumber,
                profile: 'MECHANIC',
            });
            isLoading.value = false;
            router.push('/login');
        }

        return {
            formData,
            onSubmit,
        }
    }
});
</script>

<style lang="scss" scoped>

    .signup {
    }

</style>
