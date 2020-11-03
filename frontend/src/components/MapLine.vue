<script lang="ts">
    // @ts-ignore
    import { LINE_PATH_CONFIG } from '@/constants'
    import { defineComponent } from 'vue';

    export default defineComponent({
        props: {
            google: {
                type: Object,
                required: true
            },
            map: {
                type: Object,
                required: true
            },
            path: {
                type: Array,
                required: true
            }
        },

        mounted() {
            new this.google.maps.Polyline({
                path: this.path,
                map: this.map,
                ...LINE_PATH_CONFIG
            })
        }
    }

</script>