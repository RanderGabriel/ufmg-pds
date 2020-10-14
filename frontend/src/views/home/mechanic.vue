<template>
    <div class="home-mechanic pt-4">
        <div v-if="!isAccept">
            <div class="card mb-3" v-for="solicitation in solicitationList" :key="solicitation.id">
                <header class="card-header p-3">
                    <p class="card-header-title">
                        {{ solicitation.driver.user.name }}
                    </p>
                </header>
                <div class="card-content p-4">
                    <div class="notification mb-4">
                        {{ solicitation.message }}
                    </div>
                    <button class="button is-success is-fullwidth" @click="accept(solicitation)">
                        Aceitar
                    </button>
                </div>
            </div>
        </div>
        <div v-else>
            <div class="card">
                <header class="card-header">
                    <p class="card-header-title">
                        Solicitação de {{ acceptedSolicitation.driver.user.name }}  aceita!
                    </p>
                </header>
                
                <div class="card-content">
                    <div class="content">
                        <p class="subtitle" v-if="!acceptedSolicitation.acceptedByDriver && !acceptedSolicitation.rejectedByDriver">Aguardando resposta do motorista...</p>
                        <div v-else-if="acceptedSolicitation.rejectedByDriver">
                            <p class="subtitle">O motorista rejeitou a solicitação.</p>
                            <button
                                class="button is-info card-footer-item is-fullwidth"
                                @click="goBack()">
                                Voltar
                            </button>
                        </div>
                        <p class="subtitle" v-else>O motorista aceitou!!</p>
                    Inicio do trabalho: {{ new Date().toString() }}
                    <br>
                    Contato: <a :href="`tel:${acceptedSolicitation.driver.user.phoneNumber}`">{{ acceptedSolicitation.driver.user.phoneNumber}}</a>
                    </div>
                </div>
            
                <footer class="card-footer">
                    <button class="button is-info card-footer-item" @click="finish()">
                        Finalizar Solicitação
                    </button>
                </footer>
            </div>
        </div>
    </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import services from "../../services";
import { socketService } from "../../services/SocketService";

export default defineComponent({
  name: "home-mechanic",

  data() {
    return {
      isAccept: false,
      solicitationList: [],
      acceptedSolicitation: {id: -1} as {
        id: number;
        acceptedByDriver?: boolean;
        rejectedByDriver?: boolean;
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
    })
  },

  methods: {
    async accept(solicitation: any) {
      this.isAccept = true;
      this.acceptedSolicitation = solicitation;
      await services.solicitationService.accept(this.acceptedSolicitation.id);
      console.log(`startedSolicitation_${this.acceptedSolicitation.id}`);
      services.socketService.on(`startedSolicitation_${this.acceptedSolicitation.id}`, (data) => {
        console.log(data)
        if(data.solicitationId === this.acceptedSolicitation.id) {
          this.acceptedSolicitation.acceptedByDriver = true;
        }
      });
      console.log(`cancelledSolicitation_${this.acceptedSolicitation.id}`)
      services.socketService.on(`cancelledSolicitation_${this.acceptedSolicitation.id}`, (data) => {
        console.log(data)
        console.log(`${data.solicitationId} === ${this.acceptedSolicitation.id}`);
        if(data.solicitationId === this.acceptedSolicitation.id) {
          this.acceptedSolicitation.rejectedByDriver = true;
        }
      });
    },

    async finish() {
      await services.solicitationService.finish(this.acceptedSolicitation.id)
      this.isAccept = false;
      const response = await services.solicitationService.actives();
      if (response.code === 200) {
        this.solicitationList = response.data.filter((solicitation: any) => {
          return solicitation.driver !== null;
        });
      }
    },

    goBack() {
      this.isAccept = false;
      this.acceptedSolicitation = { id: -1 };
    }
  },
});
</script>

<style scoped>
.home-mechanic {
  margin-left: 20px;
  margin-right: 20px;
}
</style>
