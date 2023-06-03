<template>
  <div style="height: 600px; width: 800px">
    <l-map ref="map" v-model:zoom="zoom" :center="[47.41322, -1.219482]">
      <l-tile-layer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        layer-type="base"
        name="OpenStreetMap"
      ></l-tile-layer>
    </l-map>
    <q-btn @click="addMarker"></q-btn>
  </div>
</template>

<script>
import "leaflet/dist/leaflet.css";
import { LMap, LTileLayer } from "@vue-leaflet/vue-leaflet";
import { defineComponent, getCurrentInstance, ref } from "vue";

// export default {
//   components: {
//     LMap,
//     LTileLayer,
//   },
//   name: "UserGMap",
//   data() {
//     return {
//       zoom: 2,
//     };
//   },
//   methods() {
//
//   },
// };
export default defineComponent({
  name: "UserGMap",
  components: {
    LMap,
    LTileLayer,
  },
  setup() {
    const zoom = 2;
    const map = ref("");
    function addMarker() {
      console.log(map.value);
      var marker = L.marker([51.5, -0.09], { draggable: "true" }).addTo(
        map.value.leafletObject
      );
    }
    return { zoom, addMarker, map };
  },
});
</script>

<style></style>
