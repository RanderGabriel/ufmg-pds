<template>
    <div class="hello">
        <button class="button" @click="increaseCapacity()">{{aaa}}</button>
    </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';

export default defineComponent({
    name: 'HelloWorld',
    props: {
        msg: String,
    },
    setup() {
        const aaa = ref(0);

        function increaseCapacity() { 
            aaa.value++;
        }

        return {
            aaa,
            increaseCapacity,
        }
    }
});
</script>

<style scoped>

    h3 {
        margin: 40px 0 0;
    }

    ul {
        list-style-type: none;
        padding: 0;
    }

    li {
        display: inline-block;
        margin: 0 10px;
    }
    
    a {
        color: #42b983;
    }

</style>
