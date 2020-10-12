<template>
  <div class="home-mechanic">
    <div v-if="!isAccept">
      <div
        v-for="solicitation in solicitationList"
        :key="solicitation.id"
        class="card"
      >

        <header class="card-header">
          <div class="card-header-title">
            Nome: {{ solicitation.driver.user.name }}
          </div>
        </header>

        <div class="card-content">
          <div class="content">
            {{ solicitation.message }}
          </div>
        </div>

        <footer class="card-footer">
          <button
            class="button is-success card-footer-item"
            @click="accept(solicitation)"
          >
            Aceitar
          </button>
        </footer>

      </div>
    </div>

    <div v-else>
      <div class="card">

        <header class="card-header">
          <div class="card-header-title">
            Solicitação de {{ acceptedSolicitation.driver.user.name }}  aceita!
          </div>
        </header>

        <div class="card-content">
          <div class="content">
            Inicio do trabalho: {{ new Date().toString() }}
            <br>
            Contato: {{ acceptedSolicitation.driver.user.phoneNumber}}
          </div>
        </div>

        <footer class="card-footer">
          <button
            class="button is-info card-footer-item"
            @click="finish"
          >
            Finalizar Solicitação
          </button>
        </footer>

      </div>
    </div>
  </div>

</template>

<script lang="ts">
import { defineComponent } from "vue";
import services from "../../services";

export default defineComponent({
  name: "home-mechanic",

  data() {
    return {
      isAccept: false,
      solicitationList: [],
      acceptedSolicitation: {id: -1}
    };
  },
  async mounted() {
    const response = await services.solicitationService.actives();
    if (response.code === 200) {
      this.solicitationList = response.data.filter((solicitation: any) => {
        return solicitation.driver !== null;
      });
    }
  },

  methods: {
    accept(solicitation: any) {
      this.isAccept = true;
      this.acceptedSolicitation = solicitation;
    },

    async finish() {
      await services.solicitationService.finish(this.acceptedSolicitation.id)
      this.isAccept = false;
      const response = await services.solicitationService.actives();
      if (response.code === 200) {
        this.solicitationList = response.data.filter((solicitation: any) => {
          return solicitation.driver !== null;
        });
      }
    }
  },
});
</script>

<style scoped>
.home-mechanic {
  margin-left: 20px;
  margin-right: 20px;
}
</style>
