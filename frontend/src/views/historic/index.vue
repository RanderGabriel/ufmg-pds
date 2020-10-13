<template>
  <div class="home-mechanic">
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
          
        </footer>

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
      acceptedSolicitation: {id: -1} as {
        id: number;
        acceptedByDriver?: boolean;
        rejectedByDriver?: boolean;
      }
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
});
</script>

<style scoped>
.home-mechanic {
  margin-left: 20px;
  margin-right: 20px;
}
</style>
