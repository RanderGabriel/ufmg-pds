<template>
  <div class="home-mechanic">
     <EvaluationList :evaluations="evaluations" />
  </div>

</template>

<script lang="ts">

import { defineComponent } from "vue";
import services from "../../services";
import EvaluationList from "../../components/EvaluationList.vue";

export default defineComponent({
  name: "home-mechanic",
  components: {
      EvaluationList,
  },
  data() {
    return {
      evaluations: []
    };
  },
  async mounted() {
    // FIXME: O comando abixo tem que depender do profile que está logado e o id não pode ser hardcoded
    this.evaluations = await services.evaluationService.getByMechanicId(1);
    console.log(this.evaluations)
  },
});
</script>

<style scoped>
.home-mechanic {
  margin-left: 20px;
  margin-right: 20px;
}

</style>
