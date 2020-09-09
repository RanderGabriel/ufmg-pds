<template>
    <div class="profile-autoshops">
        <autoshop-form v-if="isFormActive" @finished="onFinished($event)"></autoshop-form>
        <div>
            <h2 class="is-size-3">
                OFICINAS
            </h2>
        </div>
        <div>
        </div>
        <div>
            <template v-if="hasAutoshops">
                <table class="table is-fullwidth">
                    <thead>
                        <tr>
                            <th>
                                Endereço
                            </th>
                            <th>
                                Faz deslocamento?
                            </th>
                            <th>
                                
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-for="autoshop in autoshops" :key="autoshop.id">
                            <td>
                                {{autoshop.street + ' ' + autoshop.streetNumber + ', ' + autoshop.city + ', ' + autoshop.state + ', ' + autoshop.country}}
                            </td>
                            <td v-if="autoshop.ableToMove = false">
                                Não
                            </td>
                            <td v-else>
                                Sim
                            </td>
                            <td>
                                <button class="button is-size-7" @click="editAutoshop(autoshop)">
                                    EDITAR
                                </button>
                                <button class="button is-size-7" @click="deleteAutoshop(autoshop)">
                                    EXCLUIR
                                </button>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </template>
            <template v-else>
                <empty-list @addNew="showForm()">
                    <template v-slot:message>
                        Você não possui veículos cadastrados.
                    </template>
                    <template v-slot:button>
                        CADASTRAR NOVO VEÍCULO
                    </template>
                </empty-list>
            </template>
        </div>
    </div>
</template>

<script lang="ts">
import { Component, Vue, Prop, Watch } from 'vue-property-decorator';
import { Autoshop } from '../../models/bussiness';

@Component
export default class ProfileAutoshops extends Vue {

    private isFormActive: boolean;
    private autoshops: Autoshop[];

    constructor() {
        super();

        this.isFormActive = false;
        this.autoshops = [];
    }

    private created() {
        this.fetchAutoshops();
    }

    private async fetchAutoshops() {
        this.autoshops = this.autoshops = await this.$services.autoshopService.getAll();
    }

    private editAutoshop() {
        this.isFormActive = true;
    }

    private async deleteAutoshop(autoshop: Autoshop) {
        await this.$services.autoshopService.delete(autoshop.id);
        await this.fetchAutoshops();
    }

    private async onFinished() {
        await this.fetchAutoshops();
        this.isFormActive = false;
    }

    private showForm() {
        this.isFormActive = true;
    }

    private get hasAutoshops(): boolean {
        return this.autoshops.length > 0;
    }
}

</script>

<style lang="scss" scoped>

    .profile-autoshops {
    }

</style>