<template>
    <nav class="navbar" role="navigation" aria-label="main navigation">
        <div class="navbar-brand">
            <router-link to="/">
                <img class="logo" src="logo.png" width="200" height="70">
            </router-link>

            <a class="navbar-burger burger" @click="toggleMenu()" >
                <span aria-hidden="true"></span>
                <span aria-hidden="true"></span>
                <span aria-hidden="true"></span>
            </a>
        </div>

        <div class="navbar-menu" :class="{'is-active': isExpanded}">
            <div class="navbar-start">
                <router-link tag="button" to="/home" class="navbar-item">
                    Home
                </router-link>
                <router-link tag="button" to="/historic" class="navbar-item">
                    Histórico
                </router-link>
            </div>
            <div class="navbar-end">
                <div class="navbar-item">
                    <div class="buttons">
                        <router-link to="/signup" class="button is-primary">
                            <strong>Sign up</strong>
                        </router-link>
                        <router-link to="/login" class="button is-light">
                            Log in
                        </router-link>
                        <router-link tag="button" to="/logoff" class="button is-danger">
                            Log out
                        </router-link>
                    </div>
                </div>
            </div>
        </div>
    </nav>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';

export default defineComponent({
    name: 'navbar',
    setup() {

        let isExpanded = ref(false);
        function toggleMenu() {
            isExpanded.value = !isExpanded.value;
        }

        return {
            isExpanded,
            toggleMenu,
        }
    },
});
</script>

<style scoped>

    .navbar {
        min-height: 4rem;
    }

    .navbar-burger {
        height: 4rem;
    }

    .logo {
        display: block;
        padding: 8px;
        width: 160px;
    }

</style>


