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
        :mechanic="mechanicFound"
        @mechanic-accepted="onAccept"
        @mechanic-rejected="onDeny"
      />
      <MechanicOnCourse v-if="state === states[3]" />
      <Rating 
        v-if="state === states[4]"
        @rating="onRating"
        @skip="onSkip"
      />
    </div>
  </div>
</template>

<script lang="ts">
import MapLoader from "@/components/MapLoader.vue";
import DriverInput from "@/components/driver/DriverInput.vue";
import WaitingMechanic from "@/components/driver/WaitingMechanic.vue";
import MechanicOnCourse from "@/components/driver/MechanicOnCourse.vue";
import MechanicFound from "@/components/driver/MechanicFound.vue";
import Rating from "@/components/Rating.vue";

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
    Rating
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
      states: ['waitingInput', 'waitingMechanic', 'mechanicFound', 'mechanicOnCourse', 'serviceAvaliation'],
      solicitation: {
        id: -1,
        finishTime: null
      },
      mechanicFound: {
        id: -1,
        name: "",
        phoneNumber: "",
      },
    };
  },
  methods: {
    async onSubmit(formData: {message: string}) {
      this.state = this.states[1]
      const message = formData.message;
      const created = await services.solicitationService.create(message);
      if (!created) return;
      this.solicitation.id = created.id;
      services.socketService.on(
        `acceptedSolicitation_${created.id}`,
        (data) => {
          this.mechanicFound = data;
          this.state = this.states[2];
        }
      );
    },

    async onDeny() {
      this.state = this.states[0];
      await services.solicitationService.cancel(this.solicitation.id);
      this.solicitation.id = -1;
      this.mechanicFound = {
        id: -1,
        name: "",
        phoneNumber: "",
      };
    },

    async onAccept() {
      await services.solicitationService.start(this.solicitation.id);
      this.state = this.states[3]
      console.log(this.solicitation.id)
      
      services.socketService.on(`finishedSolicitation_${this.solicitation.id}`, (data) => {
        this.solicitation.finishTime = data;
        this.state = this.states[4];
      });
    },

    async onRating(rating: {comment: string, grade: number}) {
      // FIXME: Precisamos acessar o nome do motorista aqui, por enquanto está mockado
      await services.evaluationService.create(rating.comment,  "motorista teste", rating.grade, this.mechanicFound.id,)
      this.state = this.states[0];
    },

    onSkip(){
      this.state = this.states[0];
    }
  },
});
</script>
<style scoped>

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