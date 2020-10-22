<template>
  <div class="home-mechanic pt-4">
    <SolicitationList
      v-if="state === states[0]"
      :solicitationList="solicitationList"
      @accept="accept"
    />
    <MechanicAcceptCard
      v-if="state === states[1]"
      :driverName="acceptedSolicitation.driver.user.name"
    />
    <DriverRejectCard 
      v-if="state === states[2]"
      :driverName="acceptedSolicitation.driver.user.name"
      @go-back="goBack"
    />
    <DriverAcceptCard
      v-if="state === states[3]"
      :driverName="acceptedSolicitation.driver.user.name"
      :driverPhoneNumber="acceptedSolicitation.driver.user.phoneNumber"
      @finish="finish"
    />
  </div>
</template>

<script lang="ts">
import SolicitationList from "../../components/mechanic/SolicitationList.vue";
import MechanicAcceptCard from "../../components/mechanic/MechanicAcceptCard.vue";
import DriverRejectCard from "../../components/mechanic/DriverRejectCard.vue";
import DriverAcceptCard from "../../components/mechanic/DriverAcceptCard.vue";

import { defineComponent } from "vue";
import services from "../../services";
import { socketService } from "../../services/SocketService";

export default defineComponent({
  name: "home-mechanic",
  components: {
    SolicitationList,
    MechanicAcceptCard,
    DriverRejectCard,
    DriverAcceptCard,
  },
  data() {
    return {
      solicitationList: [],
      state: "solicitationList",
      states: [
        "solicitationList",
        "waitingDriverResponse",
        "rejectedByDriver",
        "acceptedByDriver",
      ],
      acceptedSolicitation: { 
        id: -1 
      }
    };
  },

  async mounted() {
    const response = await services.solicitationService.actives();
    if (response.code === 200) {
      this.solicitationList = response.data.filter((solicitation: any) => {
        return solicitation.driver !== null;
      });
    }
    socketService.on("newSolicitation", async () => {
      const response = await services.solicitationService.actives();
      this.solicitationList = response.data.filter((solicitation: any) => {
        return solicitation.driver !== null;
      });
    });
  },

  methods: {
    async accept(solicitation: any) {
      this.acceptedSolicitation = solicitation;
      await services.solicitationService.accept(this.acceptedSolicitation.id);
      this.state = this.states[1];
      
      services.socketService.on(
        `startedSolicitation_${this.acceptedSolicitation.id}`,
        (data) => {
          if (data.solicitationId === this.acceptedSolicitation.id) {
            this.state = this.states[3];
          }
        }
      );
      
      console.log(`cancelledSolicitation_${this.acceptedSolicitation.id}`);
      services.socketService.on(
        `cancelledSolicitation_${this.acceptedSolicitation.id}`,
        (data) => {
          if (data.solicitationId === this.acceptedSolicitation.id) {
            this.state = this.state[2];
          }
        }
      );
    },

    async finish() {
      await services.solicitationService.finish(this.acceptedSolicitation.id);
      const response = await services.solicitationService.actives();
      if (response.code === 200) {
        this.solicitationList = response.data.filter((solicitation: any) => {
          return solicitation.driver !== null;
        });
      }
      this.state = this.states[0];
    },

    goBack() {
      this.acceptedSolicitation = { id: -1 };
      this.state = this.states[0];
    },
  },
});
</script>

<style scoped>
.home-mechanic {
  margin-left: 20px;
  margin-right: 20px;
}
</style>
