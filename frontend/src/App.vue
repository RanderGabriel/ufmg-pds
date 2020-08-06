<template>
    <div id="app">
        <navbar></navbar>
    	<router-view></router-view>
    </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';

@Component
export default class App extends Vue {

    public variable: any = 'avc';

}
</script>

<style lang="scss">

    #app {
		// background-color: #fafafa;
		height: 100vh;
    }

</style>
