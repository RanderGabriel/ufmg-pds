<template>
    <navbar></navbar>
    <router-view></router-view>
</template>

<script lang="ts">
import { defineComponent, onMounted } from 'vue';
import { httpService } from './services/HttpService';

export default defineComponent({
    name: 'App',
    setup() {
        onMounted(() => {
            httpService.setup();
        });
    },
});
</script>