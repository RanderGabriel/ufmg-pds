<template>
    <div class="sign-up">
        <login-form />
        <router-view></router-view>
    </div>
</template>

<script lang="ts">
import { Component, Vue, Prop, Watch } from 'vue-property-decorator';

@Component
export default class Login extends Vue {


}

</script>
