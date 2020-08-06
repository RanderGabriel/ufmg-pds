<template>
    <form @submit.prevent="onSubmit()">
        <slot></slot>
    </form>
</template>

<script lang="ts">
import { Component, Vue, Prop, Watch } from 'vue-property-decorator';

@Component
export default class Input extends Vue {

    private onSubmit() {
        return;
    }

}

</script>
