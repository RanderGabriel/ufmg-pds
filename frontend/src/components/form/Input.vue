<template>
    <input class="input" :value="value" @input="updateValue($event.target.value)">
</template>

<script lang="ts">
import { Component, Vue, Prop, Watch } from 'vue-property-decorator';

@Component
export default class Input extends Vue {

    @Prop()
    private value: any;


    private updateValue(value: any) {
        this.$emit('input', value);
    }

}

</script>
