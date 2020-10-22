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
          <p class="subtitle">{{ mechanicName }}</p>
        </div>
        <div class="column">
          <p class="heading">Contato</p>
          <p class="subtitle">
            <a :href="`tel:${mechanicPhoneNumber}`">{{
              mechanicPhoneNumber
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

export default defineComponent({
  name: 'mechanic-found',
  props: {
    mechanicName: {
      type: String,
      required: true
    },
    mechanicPhoneNumber: {
      type: String,
      required: true
    }
  },
  methods: {
    onAccept() {
      this.$emit('mechanic-accepted');
    },
    onDeny() {
      this.$emit('mechanic-rejected')
    }
  }
});
</script>

<style>
</style>