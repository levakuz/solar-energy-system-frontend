<template>
  <q-page class="column items-xs-center bg-secondary">
    <UserGMap
      v-if="dataIsLoaded"
      :markers="devices"
      :status="project.status"
      :devices-list="devices"
      :devices-types-list="deviceTypes"
      @onMarkerClick="openPopup"
      ref="userMapRef"
      @generateReport="openGenerateReportPopup"
      @geocodingPopup="openGeocodingPopup"
    />
    <CreateDevicePopup
      ref="createDevicePopupRef"
      @deleteDevice="deleteDevice"
      @saveDevice="saveDevice"
    />
    <GeocodingPopup @setMarker="setMarker" ref="geocodingPopupRef" />
    <GenerateReportPopup
      :project-id="project.id"
      ref="generateReportPopupRef"
    />
  </q-page>
</template>

<script>
import { defineComponent, getCurrentInstance, onBeforeMount, ref } from "vue";
import UserGMap from "components/user/UserGMap.vue";
import CreateDevicePopup from "components/user/CreateDevicePopup.vue";
import GeocodingPopup from "components/user/GeocodingPopup.vue";
import GenerateReportPopup from "components/user/GenerateReportPopup.vue";

export default defineComponent({
  name: "CreateProjectPage",
  components: {
    GenerateReportPopup,
    GeocodingPopup,
    CreateDevicePopup,
    UserGMap,
  },
  props: ["id"],
  setup(props) {
    const config = getCurrentInstance().appContext.config.globalProperties;
    const createDevicePopupRef = ref("");
    const userMapRef = ref("");
    const geocodingPopupRef = ref("");
    const generateReportPopupRef = ref("");
    const project = ref("");
    const dataIsLoaded = ref(false);
    const devices = ref([]);
    const deviceTypes = ref([]);
    function openPopup(LatLng, target) {
      createDevicePopupRef.value.location.latitude = LatLng.lat;
      createDevicePopupRef.value.location.longitude = LatLng.lng;
      if (target.data !== undefined) {
        createDevicePopupRef.value.device = target.data;
      }
      createDevicePopupRef.value.device.project_id = project.value.id;
      createDevicePopupRef.value.markerObject = target;
      createDevicePopupRef.value.openDialog();
    }
    function deleteDevice(target) {
      userMapRef.value.deleteMarker(target);
    }
    function saveDevice(target, text) {
      userMapRef.value.makeMarkerNotDraggable(target);
      userMapRef.value.addTooltipToMarker(target, text);
    }
    function openGeocodingPopup() {
      geocodingPopupRef.value.openDialog();
    }
    function setMarker(lat, lng) {
      const marker = userMapRef.value.addMarker({
        latlng: { lat: lat, lng: lng },
      });
      userMapRef.value.addMarkerClickEvent(marker);
    }
    function openGenerateReportPopup() {
      generateReportPopupRef.value.openDialog();
    }
    onBeforeMount(() => {
      config.$api
        .get(`projects/${config.$router.currentRoute.value.params.id}`)
        .then((resp) => {
          config.$api
            .get(
              `devices/?project_id=${config.$router.currentRoute.value.params.id}&limit=100&offset=0`
            )
            .then((resp) => {
              config.$api
                .get(`device-types/?limit=100&offset=0`)
                .then((resp) => {
                  deviceTypes.value = resp.data.items;
                });
              devices.value = resp.data.items;
              dataIsLoaded.value = true;
            });
          project.value = resp.data;
        });
    });
    return {
      openPopup,
      createDevicePopupRef,
      deleteDevice,
      userMapRef,
      saveDevice,
      openGeocodingPopup,
      geocodingPopupRef,
      setMarker,
      project,
      openGenerateReportPopup,
      generateReportPopupRef,
      dataIsLoaded,
      devices,
      deviceTypes,
    };
  },
});
</script>

<style lang="sass"></style>
