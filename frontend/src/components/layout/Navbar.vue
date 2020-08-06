<template>
    <nav class="navbar">
    </nav>
</template>

<style lang="scss" scoped>

    .navbar {
        background-color: black;
        height: 60px;
    }

    @include when($desktop) {

        .navbar {
            height: 90px;
        }
    }

</style>