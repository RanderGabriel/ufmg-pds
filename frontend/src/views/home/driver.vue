<template>
  <div class="container">
    <MapLoader
      class="map"
      :mapConfig="mapConfig"
      apiKey="AIzaSyAk6DVhHF0mAdjhSVX5ymZO2Kdj-iCE-q4"
    />
    <div class="is-round control box p-8 m-4">
     
      <DriverInput  v-if="!isWaiting && mechanicFound?.id === -1" />
      <div v-else-if="!mechanicFound?.id" class="level">
        <div class="level-item has-text-centered">
          <div>
            <p class="title">Aguardando um mecânico...</p>
          </div>
        </div>
      </div>
      <div v-else-if="started" class="level">
        <div class="level-item has-text-centered">
          <div>
            <p class="title">Atendimento iniciado</p>
          </div>
        </div>
        <div class="level-item has-text-centered">
          <div>
            <p class="subtitle">O mecânico está a caminho</p>
          </div>
        </div>
      </div>
      <div v-else class="columns">
        <div class="column">
          <p class="is-size-3 has-text-weight-semibold has-text-centered">
            Mecânico encontrado!!
          </p>
        </div>
        <div class="column">
          <div class="columns">
            <div class="column">
              <p class="heading">Nome</p>
              <p class="subtitle">{{ mechanicFound.name }}</p>
            </div>
            <div class="column">
              <p class="heading">Contato</p>
              <p class="subtitle">
                <a :href="`tel:${mechanicFound.phoneNumber}`">{{
                  mechanicFound.phoneNumber
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
    </div>
  </div>
</template>

<script lang="ts">
import MapLoader from "@/components/MapLoader.vue";
import DriverInput from "@/components/driver/DriverInput.vue";
import services from "@/services";
import { mapConfig } from "@/constants";
import { defineComponent } from "vue";

export default defineComponent({
  name: "home-driver",
  components: {
    MapLoader,
    DriverInput
  },
  computed: {
    mapConfig() {
      return {
        ...mapConfig,
        zoom: 14,
        center: { lat: -19.8514378, lng: -43.9817617 },
      };
    },
  },
  data() {
    return { 
      isLoading: false,
      isWaiting: false,
      solicitationId: -1,
      formData: {
        message: ""
      },
      mechanicFound: {
        id: -1,
        name: "",
        phoneNumber: ""
      },
      started: false
    }
  },
  methods: {
    async onSubmit() {
      const { message } = this.formData.value;
      this.isLoading.value = true;
      const created = await services.solicitationService.create(message);
      if (!created) return;
      this.solicitationId.value = created.id;
      services.socketService.on(
        `acceptedSolicitation_${created.id}`,
        (data) => {
          this.mechanicFound.value = data;
        }
      );
      this.isWaiting.value = true;
      this.isLoading.value = false;
    },

    async onDeny() {
      await services.solicitationService.cancel(this.solicitationId.value);
      this.isWaiting.value = false;
      this.solicitationId.value = 0;
      this.mechanicFound.value = {
        id: null,
        name: null,
        phoneNumber: null,
      };
    },

    async onAccept() {
      await services.solicitationService.start(this.solicitationId.value);
      this.started.value = true;
    },
  },
});
</script>
<style scoped>
.formContainer {
  background-color: white !important;
  overflow: auto;
  border-radius: 0px;
}

.container {
  height: calc(100vh - 55px);
  width: 100vw;
  overflow: hidden;
}
</style>
<style>
.google-map {
  position: absolute;
  height: 100vh;
  width: 100vw;
  overflow: hidden;
}
</style>