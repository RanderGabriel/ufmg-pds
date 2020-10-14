<template>
  <div class="home-mechanic">
      <div
        v-for="solicitation in solicitationList"
        :key="solicitation.id"
        class="card"
      >
        <div class="card-content">
          <div class="content">
            <div>Data Inicial: {{ solicitation.createdAt }}</div>
            <div>Data Final: {{ solicitation.finishedAt }}</div>
            <div>Mensagem: {{ solicitation.message }}</div>
            <div><Rating class="rating"/></div>
          </div>
        </div>

        <footer class="card-footer">
          
        </footer>

      </div>
  </div>

</template>

<script lang="ts">

import Rating from '@/components/Rating.vue'
import { defineComponent } from "vue";
import services from "../../services";

export default defineComponent({
  name: "home-mechanic",
  components: {
      Rating,
  },
  data() {
    return {
      solicitationList: []
    };
  },
  async mounted() {
    const response = await services.solicitationService.getAll();
    if (response.code === 200) {
      this.solicitationList = response.data.filter((solicitation: any) => {
        return solicitation.finishedAt !== null;
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
