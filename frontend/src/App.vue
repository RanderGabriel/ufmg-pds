<template>
    <navbar></navbar>
    <router-view></router-view>
</template>

<script lang="ts">
import { defineComponent, onMounted } from 'vue';

export default defineComponent({
    name: 'App',
    setup() {
        onMounted(() => {

        });
    },
});
</script>

<style>

    #app {
    }
    
</style>
