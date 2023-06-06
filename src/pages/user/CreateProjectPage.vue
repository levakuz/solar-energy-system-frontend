<template>
  <q-page class="column items-xs-center bg-secondary">
    <UserGMap @onMarkerClick="openPopup" ref="userMapRef" />
    <CreateDevicePopup
      ref="createDevicePopupRef"
      @deleteDevice="deleteDevice"
      @saveDevice="saveDevice"
    />
  </q-page>
</template>

<script>
import { defineComponent, getCurrentInstance, ref } from "vue";
import UserGMap from "components/user/UserGMap.vue";
import CreateDevicePopup from "components/user/CreateDevicePopup.vue";

export default defineComponent({
  name: "CreateProjectPage",
  components: { CreateDevicePopup, UserGMap },
  setup() {
    const config = getCurrentInstance().appContext.config.globalProperties;
    const createDevicePopupRef = ref("");
    const userMapRef = ref("");
    function sendTestRequest() {
      config.$api.get("/accounts/me");
    }
    function openPopup(LatLng, target) {
      createDevicePopupRef.value.latitude = LatLng.lat;
      createDevicePopupRef.value.longitude = LatLng.lng;
      createDevicePopupRef.value.markerObject = target;
      createDevicePopupRef.value.openDialog();
    }
    function deleteDevice(target) {
      userMapRef.value.deleteMarker(target);
    }
    function saveDevice(target, text) {
      userMapRef.value.addTooltipToMarker(target, text);
    }
    return {
      sendTestRequest,
      openPopup,
      createDevicePopupRef,
      deleteDevice,
      userMapRef,
      saveDevice,
    };
  },
});
</script>

<style lang="sass"></style>
