<template>
  <div style="" class="column justify-end items-end full-height full-width">
    <l-map
      ref="map"
      v-model:zoom="zoom"
      :center="[47.41322, -1.219482]"
      @ready="prepareLeaflet"
      :zoomAnimation="false"
      :fade-animation="true"
      :marker-zoom-animation="true"
      style="z-index: 2; position: absolute; left: 0; top: 0"
    >
      <l-tile-layer
        url="https://tile.openstreetmap.org/{z}/{x}/{y}.png"
        layer-type="base"
        name="OpenStreetMap"
      ></l-tile-layer>
    </l-map>

    <div
      style="z-index: 100; border-radius: 10px; margin-top: 80vh"
      class="column md-row"
    >
      <LittleBtn label="Companies devices" class="bg-primary q-ma-lg">
        <q-menu fit :auto-close="false" v-model="devicesTypesList">
          <q-scroll-area dense style="height: 300px">
            <q-expansion-item label="test">
              <q-card>
                <q-card-section> Some description </q-card-section>
              </q-card>
            </q-expansion-item>
            <q-expansion-item label="test">
              <q-card>
                <q-card-section> Some description </q-card-section>
              </q-card>
            </q-expansion-item>
            <q-expansion-item label="test">
              <q-card>
                <q-card-section> Some description </q-card-section>
              </q-card>
            </q-expansion-item>
            <q-expansion-item label="test">
              <q-card>
                <q-card-section> Some description </q-card-section>
              </q-card>
            </q-expansion-item>
            <q-expansion-item label="test">
              <q-card>
                <q-card-section> Some description </q-card-section>
              </q-card>
            </q-expansion-item>
            <q-expansion-item label="test">
              <q-card>
                <q-card-section> Some description </q-card-section>
              </q-card>
            </q-expansion-item>
            <q-expansion-item label="test">
              <q-card>
                <q-card-section> Some description </q-card-section>
              </q-card>
            </q-expansion-item>
          </q-scroll-area>
        </q-menu>
      </LittleBtn>
      <LittleBtn label="My devices" class="bg-primary q-mx-lg">
        <q-menu fit :auto-close="false" v-model="devicesTypesList">
          <q-scroll-area dense style="height: 300px">
            <q-expansion-item label="test">
              <q-card>
                <q-card-section> Some description </q-card-section>
              </q-card>
            </q-expansion-item>
            <q-expansion-item label="test">
              <q-card>
                <q-card-section> Some description </q-card-section>
              </q-card>
            </q-expansion-item>
            <q-expansion-item label="test">
              <q-card>
                <q-card-section> Some description </q-card-section>
              </q-card>
            </q-expansion-item>
            <q-expansion-item label="test">
              <q-card>
                <q-card-section> Some description </q-card-section>
              </q-card>
            </q-expansion-item>
            <q-expansion-item label="test">
              <q-card>
                <q-card-section> Some description </q-card-section>
              </q-card>
            </q-expansion-item>
            <q-expansion-item label="test">
              <q-card>
                <q-card-section> Some description </q-card-section>
              </q-card>
            </q-expansion-item>
            <q-expansion-item label="test">
              <q-card>
                <q-card-section> Some description </q-card-section>
              </q-card>
            </q-expansion-item>
          </q-scroll-area>
        </q-menu>
      </LittleBtn>
    </div>
  </div>
</template>

<script>
import "leaflet/dist/leaflet.css";
import { LMap, LTileLayer, LMarker } from "@vue-leaflet/vue-leaflet";
import { defineComponent, getCurrentInstance, ref, onMounted } from "vue";
import LittleBtn from "components/LittleBtn.vue";
export default defineComponent({
  name: "UserGMap",
  components: {
    LittleBtn,
    LMap,
    LTileLayer,
  },
  setup(props, ctx) {
    const zoom = 3;
    const map = ref("");
    const popupModel = ref(false);
    const devicesTypesList = ref(false);

    function addMarker(e) {
      // Add marker to map at click location; add popup window
      var newMarker = new L.marker(e.latlng, { draggable: "true" }).addTo(
        map.value.leafletObject
      );
      newMarker.on("click", function (e) {
        ctx.emit("onMarkerClick", e.latlng, e.target);
      });
    }
    function prepareLeaflet() {
      console.log(map.value);
      map.value.leafletObject.on("click", function (e) {
        addMarker(e);
      });
    }
    function deleteMarker(target) {
      map.value.leafletObject.removeLayer(target.value);
    }
    function addTooltipToMarker(target, text) {
      target.value.bindTooltip(text, { permanent: true }).openTooltip();
    }
    onMounted(() => {});

    return {
      zoom,
      addMarker,
      map,
      prepareLeaflet,
      popupModel,
      deleteMarker,
      addTooltipToMarker,
    };
  },
});
</script>

<style></style>
