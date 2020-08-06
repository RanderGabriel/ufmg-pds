<template>
    <div class="field">
        <label class="label">{{label}}</label>
        <div class="control">
            <input class="input" type="text" placeholder="Text input">
        </div>
    </div>
</template>

<script lang="ts">
import { Component, Vue, Prop, Watch } from 'vue-property-decorator';

@Component
export default class Field extends Vue {

    @Prop({ type: String })
    private readonly label: any;

}

</script>
