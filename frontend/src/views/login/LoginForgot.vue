<template>
    <div class="forgot p-4">
        <form @submit.prevent="onSubmit()">
            <div class="field">
                <label class="label">Informe seu e-mail para recuperação</label>
                <div class="control">
                    <input class="input" type="text" v-model="formData.email">
                </div>
            </div>
            <div>
                <button class="button is-medium is-rounded is-dark is-fullwidth" type="submit" :class="{'is-loading': isLoading}" :disabled="isLoading">
                    RECUPERAR
                </button>
            </div>
        </form>
    </div>
</template>

<script lang="ts">
import { userService } from '@/services/UserService';
import { defineComponent, ref } from 'vue';

export default defineComponent({
    name: 'forgot',
    setup() {
        const isLoading = ref(false);
        const formData = ref({
            email: ''
        });

        async function onSubmit() {
            isLoading.value = true;
            await userService.forgotPassword({
                email: formData.value.email
            });

            alert("Solicitação recebida! Verifique sua caixa de e-mail.");
        }

        return {
            formData,
            onSubmit
        }
    }
});
</script>

<style lang="scss" scoped>

    .forgot {
    }

</style>
