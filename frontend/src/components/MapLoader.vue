<template>
  <div>
    <div class="google-map" ref="googleMap"></div>
    <template v-if="!!this.google && !!this.map">
      <slot
        :google="google"
        :map="map"
      />
    </template>
  </div>
</template>

  <script lang="ts">
    // @ts-ignore
    import GoogleMapsApiLoader from 'google-maps-api-loader'
    import { defineComponent } from 'vue';

    export default defineComponent({
        props: {
            mapConfig: Object,
            apiKey: String,
        },

        data() {
            return {
                google: null,
                map: null
            }
        },

        async mounted() {
            const googleMapApi = await GoogleMapsApiLoader({
                apiKey: this.apiKey
            })
            this.google = googleMapApi
            this.initializeMap()
        },

        methods: {
            initializeMap() {
                const mapContainer = this.$refs.googleMap
                // @ts-ignore
                this.map = new this.google.maps.Map(mapContainer, this.mapConfig)
            }
        }
    });
  </script>