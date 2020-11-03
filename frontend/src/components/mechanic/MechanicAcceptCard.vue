<template>
  <div class="card">
    <header class="card-header">
      <p class="card-header-title">Solicitação de {{ driverName }} aceita!</p>
    </header>
    <div class="card-content">
      <div class="content">
        <p>
          Aguardando resposta do motorista...
        </p>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export  default defineComponent({
  name: "mechanic-accept-card",
  props: {
    driverName: {
      type: String,
      required: true
    }
  }
});
</script>

<style>
</style>