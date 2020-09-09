<template>
    <div class="profile">
        <aside class="profile-side-menu">
            <router-link to="/profile/vehicles"> VEÍCULOS </router-link>
            <router-link to="/profile/autoshops"> OFICINA </router-link>
        </aside>
        <div class="profile-content">
            <router-view></router-view>
            <profile-info></profile-info>
        </div>
    </div>
</template>

<script lang="ts">
import { Component, Vue, Prop, Watch } from 'vue-property-decorator';

@Component
export default class Profile extends Vue {
}

</script>

<style lang="scss" scoped>

    .profile {
        display: flex;
    }

    .profile-side-menu {
        flex-basis: 300px;
        flex-shrink: 0;
    }

    .profile-content {
        flex-basis: auto;
        flex-grow: 1;
    }


</style>