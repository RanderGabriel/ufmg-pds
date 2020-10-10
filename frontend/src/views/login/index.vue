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
            <div class="field">
                <div class="control">
                    <button class="button is-medium is-rounded is-dark is-fullwidth" type="submit">
                        ENTRAR
                    </button>
                </div>
            </div>
            
            <div class="field">
                <div class="control">
                    <button @click.prevent="onSignUp()" class="button is-outline is-medium is-rounded is-fullwidth" :class="{'is-loading': isSending}" :disabled="isSending">
                        CADASTRAR
                    </button>
                </div>
            </div>
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
            email: '',
            password: '',
        });

        async function onSubmit() {
            const { email, password } = formData.value;
            isLoading.value = true;
            await services.authService.login(email, password);
            isLoading.value = false;
            router.push('/');
        }

        function onSignUp() {
            router.push('/signup');
        }

        return {
            formData,
            onSubmit,
            onSignUp
        }
    },
});
</script>

<style lang="scss" scoped>

    .signup {
    }

</style>
