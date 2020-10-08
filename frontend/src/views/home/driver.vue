<template>
    <div>
        <form @submit.prevent="onSubmit()">
            <input type="text" v-model="formData.message">
            <button type="submit">ENVIAR SOLICITAÇÃO</button>
        </form>
    </div>
</template>

<script lang="ts">
import services from '@/services';
import { defineComponent, ref } from 'vue';

export default defineComponent({
    name: 'home-driver',
    setup() {
        const isLoading = ref(false);
        const formData = ref({
            message: ''
        });

        async function onSubmit() {
            const { message } = formData.value;
            isLoading.value = true;
            await services.solicitationService.create(message);
            isLoading.value = false;
        }

        return {
            formData,
            onSubmit,
        }
    },
});
</script>
