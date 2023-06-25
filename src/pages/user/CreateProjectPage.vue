<template>
  <q-page class="column items-xs-center bg-secondary">
    <UserGMap
      @onMarkerClick="openPopup"
      ref="userMapRef"
      @geocodingPopup="openGeocodingPopup"
    />
    <CreateDevicePopup
      ref="createDevicePopupRef"
      @deleteDevice="deleteDevice"
      @saveDevice="saveDevice"
    />
    <GeocodingPopup @setMarker="setMarker" ref="geocodingPopupRef" />
  </q-page>
</template>

<script>
import { defineComponent, getCurrentInstance, ref } from "vue";
import UserGMap from "components/user/UserGMap.vue";
import CreateDevicePopup from "components/user/CreateDevicePopup.vue";
import GeocodingPopup from "components/user/GeocodingPopup.vue";

export default defineComponent({
  name: "CreateProjectPage",
  components: { GeocodingPopup, CreateDevicePopup, UserGMap },
  props: ["id"],
  setup(props) {
    const config = getCurrentInstance().appContext.config.globalProperties;
    const createDevicePopupRef = ref("");
    const userMapRef = ref("");
    const geocodingPopupRef = ref("");
    function sendTestRequest() {
      config.$api.get("/accounts/me");
    }
    function openPopup(LatLng, target) {
      createDevicePopupRef.value.location.latitude = LatLng.lat;
      createDevicePopupRef.value.location.longitude = LatLng.lng;
      createDevicePopupRef.value.device.project_id =
        config.$router.currentRoute.value.query.id;
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
      console.log(marker);
      userMapRef.value.addMarkerClickEvent(marker);
    }
    return {
      sendTestRequest,
      openPopup,
      createDevicePopupRef,
      deleteDevice,
      userMapRef,
      saveDevice,
      openGeocodingPopup,
      geocodingPopupRef,
      setMarker,
    };
  },
});
</script>

<style lang="sass"></style>
