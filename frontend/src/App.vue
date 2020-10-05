<template>
    <div id="app">
        <navbar></navbar>
    	<router-view></router-view>
        <input type="text" v-model="message">
        <button @click="greet()">ENVIAR</button>
    </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import { httpService } from './services/HttpService';
import { sockeService } from './services/SocketService';

@Component
export default class App extends Vue {

    public message: any = '';

    private async greet() {
        await httpService.get('/websocket', { message: this.message });
        this.message = '';
    }

    private created() {
        sockeService.on('globalAlert', (message) => {
            alert(message);
        });
    }

    mounted() {
        this.$services.userService.init();
    }
}
</script>

<style lang="scss">

    #app {
		// background-color: #fafafa;
		height: 100vh;
    }

</style>
