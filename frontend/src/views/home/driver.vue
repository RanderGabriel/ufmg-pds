<template>
  <div class="container">
    <MapLoader
      class="map"
      :mapConfig="mapConfig"
      apiKey="AIzaSyAk6DVhHF0mAdjhSVX5ymZO2Kdj-iCE-q4"
    />
    <div class="is-round control box p-8 m-4">
     
      <DriverInput  v-if="!isWaiting && mechanicFound.id === -1" @message-submit="onSubmit"/>
      <WaitingMechanic v-else-if="mechanicFound.id === -1"/>
      <MechanicOnCourse v-else-if="started"/>
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
import WaitingMechanic from "@/components/driver/WaitingMechanic.vue";
import MechanicOnCourse from "@/components/driver/MechanicOnCourse.vue";

import services from "../../services";
import { mapConfig } from "@/constants";
import { defineComponent } from "vue";

export default defineComponent({
  name: "home-driver",
  components: {
    MapLoader,
    DriverInput,
    WaitingMechanic,
    MechanicOnCourse
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
      mechanicFound: {
        id: -1,
        name: "",
        phoneNumber: ""
      },
      started: false
    }
  },
  methods: {
    async onSubmit(formData) {
      const message  = formData.message;
      this.isLoading = true;
      const created = await services.solicitationService.create(message);
      if (!created) return;
      this.solicitationId = created.id;
      services.socketService.on(
        `acceptedSolicitation_${created.id}`,
        (data) => {
          this.mechanicFound = data;
        }
      );
      this.isWaiting = true;
      this.isLoading = false;
    },

    async onDeny() {
      await services.solicitationService.cancel(this.solicitationId);
      this.isWaiting = false;
      this.solicitationId = 0;
      this.mechanicFound = {
        id: null,
        name: null,
        phoneNumber: null,
      };
    },

    async onAccept() {
      await services.solicitationService.start(this.solicitationId);
      this.started = true;
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