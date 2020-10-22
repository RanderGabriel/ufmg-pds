<template>
  <div>
    <div
      class="card mb-3"
      v-for="solicitation in solicitationList"
      :key="solicitation.id"
    >
      <header class="card-header p-3">
        <p class="card-header-title">
          {{ solicitation.driver.user.name }}
        </p>
      </header>
      <div class="card-content p-4">
        <div class="notification mb-4">
          {{ solicitation.message }}
        </div>
        <button
          class="button is-success is-fullwidth"
          @click="accept(solicitation)"
        >
          Aceitar
        </button>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  name: "solicitation-list",
  props: {
    solicitationList: {
      type: Array,
      required: true,
    },
  },
  methods: {
    accept(solicitation: any) {
      this.$emit("accept", solicitation);
    },
  },
});
</script>

<style>
</style>