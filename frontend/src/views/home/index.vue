<template>
    <div>
        <driver-home v-if="profile === 'DRIVER'"></driver-home>
        <mechanic-home v-if="profile === 'MECHANIC'"></mechanic-home>
    </div>
</template>

<script lang="ts">
import services from '@/services';
import { httpService } from '@/services/HttpService';
import { defineComponent } from 'vue';
import DriverHome from './driver.vue';
import MechanicHome from './mechanic.vue';

export default defineComponent({
    name: 'home',
    components: {
        DriverHome,
        MechanicHome,
    },
    setup() {
        const profile = services.userService.getCurrentUser()?.profile;
        return {
            profile,
        };
    },
    created() {
        services.socketService.on('globalAlert', (message) => {
            alert(message);
        });

        services.socketService.on("requestCreated", (message) => {
            console.log("REQUEST CREATED!!! ID: " + message.id);
        });

    },
    methods: {
        async greet() {
            await httpService.get('/websocket', { message: 'olá' });
        }
    },
});
</script>
