<template>
  <div class="container">
    <MapLoader
      class="map"
      :mapConfig="mapConfig"
      apiKey="AIzaSyAk6DVhHF0mAdjhSVX5ymZO2Kdj-iCE-q4"
    />
    <div class="is-round control box p-8 m-4">
      <DriverInput
        v-if="state === states[0]"
        @message-submit="onSubmit"
      />
      <WaitingMechanic v-if="state === states[1]" />
      <MechanicFound
        v-if="state === states[2]"
        :mechanicName="mechanicFound.name"
        :mechanicPhoneNumber="mechanicFound.phoneNumber"
        @mechanic-accepted="onAccept"
        @mechanic-rejected="onDeny"
      />
      <MechanicOnCourse v-if="state === states[3]" />
    </div>
  </div>
</template>

<script lang="ts">
import MapLoader from "@/components/MapLoader.vue";
import DriverInput from "@/components/driver/DriverInput.vue";
import WaitingMechanic from "@/components/driver/WaitingMechanic.vue";
import MechanicOnCourse from "@/components/driver/MechanicOnCourse.vue";
import MechanicFound from "@/components/driver/MechanicFound.vue";

import services from "../../services";
import { mapConfig } from "@/constants";
import { defineComponent } from "vue";

export default defineComponent({
  name: "home-driver",
  components: {
    MapLoader,
    DriverInput,
    WaitingMechanic,
    MechanicOnCourse,
    MechanicFound,
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
      state: 'waitingInput',
      states: ['waitingInput', 'waitingMechanic', 'mechanicFound', 'mechanicOnCourse'],
      solicitationId: -1,
      mechanicFound: {
        id: -1,
        name: "",
        phoneNumber: "",
      },
    };
  },
  methods: {
    async onSubmit(formData) {
      this.state = this.states[1]
      const message = formData.message;
      const created = await services.solicitationService.create(message);
      if (!created) return;
      this.solicitationId = created.id;
      services.socketService.on(
        `acceptedSolicitation_${created.id}`,
        (data) => {
          this.state = this.states[2];
          this.mechanicFound = data;
        }
      );
    },

    async onDeny() {
      this.state = this.states[0];
      await services.solicitationService.cancel(this.solicitationId);
      this.solicitationId = -1;
      this.mechanicFound = {
        id: -1,
        name: "",
        phoneNumber: "",
      };
    },

    async onAccept() {
      await services.solicitationService.start(this.solicitationId);
      this.state = this.states[3]
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