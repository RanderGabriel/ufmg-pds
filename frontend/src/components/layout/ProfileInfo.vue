<template>
    <div class="profile">
        <h3>Meu Perfil</h3>
        <div class="profile-container">
            <h4>E-mail: {{entity.email}}</h4>
        </div>
    </div>
</template>

<script lang="ts">
import { Component, Vue, Prop, Watch } from 'vue-property-decorator';
import { User } from '../../models/bussiness';

@Component
export default class ProfileInfo extends Vue {

    public entity: User = {};

    mounted () {
        this.entity = this.$services.userService.getCurrentUser();
    }
}

</script>

<style lang="scss" scoped>
    .profile {
        flex-direction: column;
    }

    .profile-container {
        padding: 8px;
    }
</style>