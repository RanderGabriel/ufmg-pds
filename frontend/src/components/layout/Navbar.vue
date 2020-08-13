<template>
    <nav class="navbar">
        <router-link to="/login">Login</router-link>
        <router-link to="/signup">Cadastro</router-link>
        <router-link to="/profile">Perfil</router-link>
    </nav>
</template>

<style lang="scss" scoped>

    .navbar {
        display: flex;
        background-color: black;
        height: 60px;
    }

    a {
        margin: 16px;
    }

    @include when($desktop) {

        .navbar {
            height: 90px;
        }
    }

</style>