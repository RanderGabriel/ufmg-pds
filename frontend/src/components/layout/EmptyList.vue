<template>
    <div class="notification mx-3 my-4 has-text-centered">
        <p class="is-size-5-touch mb-5">
            <slot name="message"></slot>
        </p>
        <button class="button has-text-weight-semibold is-primary" @click="onAddNew()">
            <slot name="button"></slot>
        </button>
    </div>
</template>

<script lang="ts">
import { Component, Vue, Prop, Watch } from 'vue-property-decorator';

@Component
export default class EmptyList extends Vue {

    private onAddNew() {
        this.$emit('addNew');
    }

}

</script>
