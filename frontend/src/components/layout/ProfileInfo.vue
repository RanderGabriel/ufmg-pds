<template>
    <div class="profile">
        <h3>Meu Perfil</h3>
        <div class="profile-container">
            <h4>E-mail: {{entity.email}}</h4>
            <h4>Nome completo: {{entity.name}}</h4>
            <h4>Telefone: {{entity.phoneNumber}}</h4>
            <button v-if="entity.profile === 'DRIVER'" @click="createRequest()">Criar solicitação</button>
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

    createRequest() {
        this.$services.requestService.create();
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