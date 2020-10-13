<template>
    <div class="container">
        <MapLoader
            class="map"
            :mapConfig="mapConfig"
            apiKey="AIzaSyAk6DVhHF0mAdjhSVX5ymZO2Kdj-iCE-q4"/>
        <div class="is-round control box p-8 m-4">
            <p class="heading">Precisa de ajuda?</p>
            <form class="has-background-white" v-if="!isWaiting && !mechanicFound?.id" @submit.prevent="onSubmit()">
                <div class="field is-primary">
                    <div class="control">
                        <label class="label">Mensagem</label>
                        <input class="input" type="text" v-model="formData.message">
                    </div>
                </div>
                <div class="field">
                    <div class="control">
                        <button v-bind:class="{ 'is-loading': isLoading }" class="button is-black is-rounded is-fullwidth" type="submit">ENVIAR SOLICITAÇÃO</button>
                    </div>
                </div>
        </form>
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
        <div v-else class="level m-4">
            <div class="level-item has-text-centered">
                <div>
                <p class="subtitle">Mecânico encontrado!!</p>
                </div>
            </div>
            <div class="level-item has-text-centered">
                <div>
                <p class="heading">Nome</p>
                <p class="subtitle">{{ mechanicFound.name }}</p>
                <div class="field">
                <div class="control">
                    <button @click.prevent="onAccept()" class="m-2 button is-black is-rounded is-fullwidth">ACEITAR</button>
                    <button  @click.prevent="onDeny()" class="m-2 button is-outline is-rounded is-fullwidth">RECUSAR</button>
                </div>
            </div>
                </div>
            </div>
        </div>
        </div>
        
    </div>
</template>

<script lang="ts">
import MapLoader from '@/components/MapLoader.vue'
import services from '@/services';
import { mapConfig } from '@/constants';
import { defineComponent, ref } from 'vue';

export default defineComponent({
    components: {
        MapLoader,
    },
    computed: {
    mapConfig () {
      return {
        ...mapConfig,
        center: { lat: -19.8249743, lng: -44.0210052, }
      }
    },
  },
    name: 'home-driver',
    setup() {
        const isLoading = ref(false);
        const isWaiting = ref(false);
        const solicitationId = ref(0);
        const formData = ref({
            message: ''
        });
        const mechanicFound = ref({
            id: null,
            name: null
        });
        const started = ref(false);

        async function onSubmit() {
            const { message } = formData.value;
            isLoading.value = true;
            const created = await services.solicitationService.create(message);
            if(!created) return;
            solicitationId.value = created.id;
            services.socketService.on(`acceptedSolicitation_${created.id}`, (data) => {
                mechanicFound.value = data;
            });
            isWaiting.value = true;
            isLoading.value = false;
        }

        async function onDeny() {
            await services.solicitationService.cancel(solicitationId.value);
            isWaiting.value = false;
            solicitationId.value = 0;
            mechanicFound.value = {
                id: null,
                name: null
            };
        }

        async function onAccept() {
            await services.solicitationService.start(solicitationId.value);
            started.value = true;
            
        }

        return {
            formData,
            onSubmit,
            isLoading,
            isWaiting,
            mechanicFound,
            onAccept,
            onDeny,
            solicitationId,
            started
        }
    },
});
</script>
<style scoped>
    .formContainer {
        background-color: white !important;
        overflow: auto;
        border-radius: 10px;
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