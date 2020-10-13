<template>
    <nav class="navbar" role="navigation" aria-label="main navigation">
        <div class="navbar-brand">
            <a class="navbar-item" href="https://bulma.io">
                <img src="https://bulma.io/images/bulma-logo.png" alt="Bulma: Free, open source, and modern CSS framework based on Flexbox" width="112" height="28">
            </a>

            <!-- SERÁ UTILIZADO MAIS TARDE -->
            <!-- <a role="button" class="navbar-burger" aria-label="menu" aria-expanded="false">
                <span aria-hidden="true"></span>
                <span aria-hidden="true"></span>
                <span aria-hidden="true"></span>
            </a> -->

            <a role="button" class="navbar-burger burger" aria-label="menu" aria-expanded="false" data-target="navbarBasicExample">
                <span aria-hidden="true"></span>
                <span aria-hidden="true"></span>
                <span aria-hidden="true"></span>
            </a>
            </div>

        <div id="navbarBasicExample" class="navbar-menu">
            <div class="navbar-start" v-if="renderNavbar">
                <router-link to="/home" class="navbar-item">
                    Home
                </router-link>
                <router-link to="/solicitation" class="navbar-item">
                    Histórico
                </router-link>
            </div>
            <div class="navbar-end">
                <div class="navbar-item">
                    <div class="buttons">
                        <router-link to="/signup" class="button is-primary" v-if="renderNavbar == false">
                            <strong>Sign up</strong>
                        </router-link>
                        <router-link to="/login" class="button is-light" v-if="renderNavbar == false">
                            Log in
                        </router-link>
                        <router-link to="/logoff" class="button is-danger" v-if="renderNavbar">
                            Log out
                        </router-link>
                    </div>
                </div>
            </div>
        </div>
    </nav>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { authService } from '@/services/AuthService';

const isAuthenticaded = authService.isAuthenticated();

export default defineComponent({
    name: 'navbar',
    data() {
      return {
        renderNavbar: isAuthenticaded,
      };
    },
    methods: {
      forceRerender() {
        this.renderNavbar = false;

        this.$nextTick(() => {
          this.renderNavbar = true;
        });
      }
    }
});
</script>

