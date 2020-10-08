<template>
    <div class="signup p-4">
        <form @submit.prevent="onSubmit()">
            <div class="field">
                <label class="label">E-mail</label>
                <div class="control">
                    <input class="input" type="email" v-model="formData.email">
                </div>
            </div>
            <div class="field">
                <label class="label">Senha</label>
                <div class="control">
                    <input class="input" type="password" v-model="formData.password">
                </div>
            </div>
            <button class="button is-medium is-rounded is-dark is-fullwidth" type="submit">
                ENTRAR
            </button>
        </form>
    </div>
</template>

<script lang="ts">
import router from '@/router';
import services from '@/services';
import { defineComponent, ref } from 'vue';

export default defineComponent({
    name: 'login',
    created() {
        services.authService.logoff();
    },
    setup() {
        const isLoading = ref(false);
        const formData = ref({
            email: 'brianaikau@gmail.com',
            password: '123456',
        });

        async function onSubmit() {
            const { email, password } = formData.value;
            isLoading.value = true;
            await services.authService.login(email, password);
            isLoading.value = false;
            router.push('/');
        }

        return {
            formData,
            onSubmit,
        }
    },
});
</script>

<style lang="scss" scoped>

    .signup {
    }

</style>
