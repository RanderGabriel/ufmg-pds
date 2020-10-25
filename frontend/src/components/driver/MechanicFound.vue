<template>
  <div class="columns">
    <div class="column">
      <p class="is-size-3 has-text-weight-semibold has-text-centered">
        Mecânico encontrado!!
      </p>
    </div>
    <div class="column">
      <div class="columns">
        <div class="column">
          <p class="heading">Nome</p>
          <p class="subtitle">{{ mechanic.name }}</p>
        </div>
        <div class="column">
          <p>Avaliações</p>
          <button class="button is-rounded" @click="openModal">
            <span class="mr-1"> {{ mechanicMeanEvaluation.toFixed(1) }} </span>
            <font-awesome-icon
                :style="{ color: 'yellow' }"
                icon="star"
            />
          </button>
          <div class="modal" :class="{ 'is-active': isOpen }">
            <div class="modal-background" @click="closeModal"></div>
            <div class="modal-content modal-background">
              <EvaluationList :evaluations="evaluations" />
            </div>
            <button
              class="modal-close is-large"
              aria-label="close"
              @click="closeModal"
            ></button>
          </div>
        </div>
        <div class="column">
          <p class="heading">Contato</p>
          <p class="subtitle">
            <a :href="`tel:${mechanic.phoneNumber}`">{{
              mechanic.phoneNumber
            }}</a>
          </p>
        </div>
      </div>
    </div>
    <div class="column">
      <button
        @click.prevent="onAccept()"
        class="m-2 button is-success is-rounded is-fullwidth"
      >
        ACEITAR
      </button>
      <button
        @click.prevent="onDeny()"
        class="m-2 button is-danger is-outlined is-rounded is-fullwidth"
      >
        RECUSAR
      </button>
    </div>
  </div>
</template>

<script>
import { defineComponent } from "vue";
import services from "../../services";
import EvaluationList from "../EvaluationList";

export default defineComponent({
  name: "mechanic-found",
  components: {
    EvaluationList,
  },
  data() {
    return {
      evaluations: [],
      mechanicMeanEvaluation: 0,
      isOpen: false,
    };
  },
  props: {
    mechanic: {
      type: Object,
      required: true,
    },
  },
  methods: {
    onAccept() {
      this.$emit("mechanic-accepted");
    },
    onDeny() {
      this.$emit("mechanic-rejected");
    },

    openModal() {
      this.isOpen = true;
    },

    closeModal() {
      this.isOpen = false;
    },
  },
  async mounted() {
    this.evaluations = await services.evaluationService.getByMechanicId(
      this.mechanic.id
    );
    let sum = this.evaluations.reduce((acc, curr) => {
      return acc + curr.grade
    }, 0);
    this.mechanicMeanEvaluation = sum / this.evaluations.length;
  },
});
</script>

<style>
</style>