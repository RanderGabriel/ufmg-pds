<template>
  <div class="card">
    <header class="card-header">
      <p class="card-header-title">Motorista {{ driverName }} aceitou o serviço!</p>
    </header>
    <div class="card-content">
      <div class="content">
        <div>
          Inicio do trabalho: {{ new Date().toString() }}
          <br />
          Contato:
          <a :href="`tel:${driverPhoneNumber}`">{{
            driverPhoneNumber
          }}</a>
        </div>
      </div>
    </div>

    <footer class="card-footer">
      <button class="button is-info card-footer-item" @click="finish()">
        Finalizar Solicitação
      </button>
    </footer>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export  default defineComponent({
  name: "driver-reject-card",
  props: {
    driverName: {
      type: String,
      required: true,
    },
    driverPhoneNumber: {
      type: String,
      required: true
    }
  },
  methods: {
    finish() {
      this.$emit('finish')
    }
  }
});
</script>

<style>
</style>