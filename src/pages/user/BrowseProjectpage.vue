<template>
  <q-page class="column items-xs-center bg-secondary">
    <UserGMap :markers="devices" @onMarkerClick="openPopup" ref="userMapRef" />
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
  name: "BrowseProjectPage",
  components: { CreateDevicePopup, UserGMap },
  setup() {
    const config = getCurrentInstance().appContext.config.globalProperties;
    const createDevicePopupRef = ref("");
    const userMapRef = ref("");
    const devices = [
      // TODO: Remove hardcoded data
      {
        latlng: { lat: 29.269496814612776, lng: 1.7477663679384041 },
        name: "test",
      },
      {
        latlng: { lat: 50.41822828723822, lng: 11.063295443310313 },
        name: "test1233",
      },
    ];
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
      devices,
    };
  },
});
</script>

<style lang="sass">
.grid
  width: 100%
  display: grid
  grid-template-columns: repeat(auto-fill, 375px)  //height of card
  padding: 24px
  grid-column-gap: 24px
  grid-row-gap: 24px
</style>
