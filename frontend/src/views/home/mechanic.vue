<template>
    <div>
        mechanic
        <form @submit.prevent="onSubmit()">
            <input type="text" v-model="formData.id">
            <button type="submit">Aceitar solicitação</button>
        </form>
    </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';
import services from '../../services';

export default defineComponent({
    name: 'home-mechanic',
    setup() {
        const isLoading = ref(false);
        const formData = ref({
            id: 0
        });

        async function onSubmit() {
            const { id } = formData.value;
            isLoading.value = true;
            await services.solicitationService.accept(id);
            isLoading.value = false;
        }

        return {
            formData,
            onSubmit,
        }
    }
});
</script>
