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
      style="z-index: 100; border-radius: 10px; margin-top: 70vh"
      class="column md-row"
    >
      <LittleBtn
        label="Generate report"
        class="bg-primary q-mx-lg"
        @click="generateReport"
        v-if="mode === 'browse'"
      />
      <LittleBtn
        label="Set marker by location name"
        class="bg-primary q-mx-lg"
        @click="openGeocodingPopup"
        v-if="mode !== 'browse'"
      />
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
import { LMap, LTileLayer } from "@vue-leaflet/vue-leaflet";
import { defineComponent, onMounted, ref } from "vue";
import LittleBtn from "components/LittleBtn.vue";

export default defineComponent({
  name: "UserGMap",
  props: ["markers", "mode"],
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

    function addMarker(e, options) {
      console.log(e);
      return new L.marker(e.latlng, options).addTo(map.value.leafletObject);
    }
    function addMarkerClickEvent(marker) {
      marker.on("click", function (e) {
        ctx.emit("onMarkerClick", e.latlng, e.target);
      });
    }
    async function prepareLeaflet() {
      map.value.leafletObject.on("click", function (e) {
        let marker = addMarker(e, { draggable: true });
        addMarkerClickEvent(marker);
      });
      if (props.markers !== undefined && props.markers.length > 0) {
        for (let markerData of props.markers) {
          let marker = addMarker(markerData, { draggable: false });
          __addTooltipToMarker(marker, markerData.name);
        }
      }
    }
    function deleteMarker(target) {
      map.value.leafletObject.removeLayer(target.value);
    }
    function addTooltipToMarker(target, text) {
      target.value.bindTooltip(text, { permanent: true }).openTooltip();
    }
    function __addTooltipToMarker(target, text) {
      target.bindTooltip(text, { permanent: true }).openTooltip();
    }
    function generateReport() {
      ctx.emit("generateReport");
    }
    function openGeocodingPopup() {
      ctx.emit("geocodingPopup");
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
      generateReport,
      openGeocodingPopup,
    };
  },
});
</script>

<style></style>
