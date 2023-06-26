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
      style="z-index: 100; border-radius: 10px; margin-top: 60vh"
      class="column md-row"
    >
      <LittleBtn
        label="Generate report"
        class="bg-primary q-mx-lg"
        @click="generateReport"
        v-if="status === 'active'"
      />
      <LittleBtn
        label="Set marker by location name"
        class="bg-primary q-mt-lg q-mx-lg"
        @click="openGeocodingPopup"
        v-if="status === 'active'"
      />
      <LittleBtn label="Companies devices" class="bg-primary q-ma-lg">
        <q-menu fit :auto-close="false" v-model="devicesTypesListModel">
          <q-scroll-area dense style="height: 300px">
            <q-expansion-item
              :label="deviceType.name"
              v-for="deviceType in devicesTypesList"
              v-bind:key="deviceType.id"
            >
              <q-card>
                <q-card-section>
                  <q-list>
                    <q-item class="row items-center">
                      Area:
                      <q-item-label class="q-px-sm">{{
                        deviceType.area
                      }}</q-item-label>
                    </q-item>
                    <q-item class="row items-center">
                      System loss:
                      <q-item-label class="q-px-sm">{{
                        deviceType.system_loss
                      }}</q-item-label>
                    </q-item>
                  </q-list>
                </q-card-section>
              </q-card>
            </q-expansion-item>
          </q-scroll-area>
        </q-menu>
      </LittleBtn>
      <LittleBtn label="My devices" class="bg-primary q-mx-lg">
        <q-menu fit :auto-close="false" v-model="devicesListModel">
          <q-scroll-area dense style="height: 300px">
            <q-expansion-item
              v-for="device in devicesList"
              v-bind:key="device.id"
              :label="device.name"
            >
              <q-card>
                <q-card-section>
                  <q-list>
                    <q-item class="row items-center">
                      Count:
                      <q-item-label class="q-px-sm">{{
                        device.count
                      }}</q-item-label>
                    </q-item>
                    <q-item class="row items-center">
                      Panel surface azimuth:
                      <q-item-label class="q-px-sm">{{
                        device.orientation
                      }}</q-item-label>
                    </q-item>
                  </q-list>
                </q-card-section>
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
import { defineComponent, getCurrentInstance, onMounted, ref } from "vue";
import LittleBtn from "components/LittleBtn.vue";

export default defineComponent({
  name: "UserGMap",
  props: ["markers", "status", "devicesList", "devicesTypesList"],
  components: {
    LittleBtn,
    LMap,
    LTileLayer,
  },
  setup(props, ctx) {
    const zoom = 3;
    const map = ref("");
    const popupModel = ref(false);
    const devicesTypesListModel = ref(false);
    const devicesListModel = ref(false);
    const config = getCurrentInstance().appContext.config.globalProperties;

    function addMarker(e, options) {
      return new L.marker(e.latlng, options).addTo(map.value.leafletObject);
    }

    function addMarkerClickEvent(marker) {
      marker.on("click", function (e) {
        ctx.emit("onMarkerClick", e.latlng, e.target);
      });
    }

    function makeMarkerNotDraggable(marker) {
      marker.value.dragging.disable();
    }

    async function prepareLeaflet() {
      if (props.status === "active") {
        map.value.leafletObject.on("click", function (e) {
          let marker = addMarker(e, { draggable: true });
          addMarkerClickEvent(marker);
        });
      }
      if (props.markers !== undefined && props.markers.length > 0) {
        props.markers.forEach((marker) => {});

        for (let markerData of props.markers) {
          config.$api
            .get(`locations/${markerData.location_id}`)
            .then((resp) => {
              markerData.latlng = {
                lat: resp.data.latitude,
                lng: resp.data.longitude,
              };
              let marker = addMarker(markerData, { draggable: false });
              __addTooltipToMarker(marker, markerData.name);
              addMarkerClickEvent(marker);
              marker.data = markerData;
            });
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
      addMarkerClickEvent,
      makeMarkerNotDraggable,
      devicesTypesListModel,
      devicesListModel,
    };
  },
});
</script>

<style></style>
