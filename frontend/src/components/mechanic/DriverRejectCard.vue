<template>
  <div class="card">
    <header class="card-header">
      <p class="card-header-title">
        Motorista {{ driverName }} rejeito o serviço
      </p>
    </header>
    <div class="card-content">
      <div class="content">
        <p> Sentimos muito mas o serviço foi rejeitado, tente novamente</p>
      </div>
    </div>
    <footer class="card-footer">
      <button
        class="button is-info card-footer-item is-fullwidth"
        @click="goBack()"
      >
        Voltar
      </button>
      </footer>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export  default defineComponent({
  name: "accept-solicitation-card",
  props: {
    driverName: {
      type: String,
      required: true,
    },
  },
  methods: {
    goBack(){
      this.$emit('go-back')
    }
  }
});
</script>

<style>
</style>