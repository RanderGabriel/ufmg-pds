<script lang="ts">
    // @ts-ignore
    import { POINT_MARKER_ICON_CONFIG } from '@/constants'
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
            marker: {
                type: Object,
                required: true
            }
        },

        mounted() {
            new this.google.maps.Marker({
                position: this.marker.position,
                marker: this.marker,
                map: this.map,
                icon: POINT_MARKER_ICON_CONFIG
            })
        }
    }
</script>