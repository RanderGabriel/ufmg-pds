<template>
  <div>
    <p class="heading">Precisa de ajuda?</p>
    <form class="has-background-white" @submit.prevent="onSubmit()">
      <div class="field is-primary">
        <div class="control">
          <label class="label">Mensagem</label>
          <input class="input" type="text" v-model="formData.message" />
        </div>
      </div>
      <div class="field">
        <div class="control">
          <button
            v-bind:class="{ 'is-loading': isLoading }"
            class="button is-black is-rounded is-fullwidth"
            type="submit"
          >
            ENVIAR SOLICITAÇÃO
          </button>
        </div>
      </div>
    </form>
  </div>
</template>

<script>
import { defineComponent } from "vue";

export  default defineComponent({
  name: 'driver-input',
  data() {
    return {
      formData: {
        message: ""
      }
    }
  },
  props: {
    isLoading: {
      type: Boolean,
      default: false
    }
  },
  methods: {
    onSubmit() {
      this.$emit('message-submit', this.formData);
    }
  }
});
</script>

<style>
</style>