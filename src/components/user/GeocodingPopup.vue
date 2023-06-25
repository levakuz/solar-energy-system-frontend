<template>
  <q-dialog v-model="dialogModel">
    <q-card
      class="bg-white column"
      style="height: 600px; width: 800px; border-radius: 10px"
    >
      <h3 class="self-center">Find location by name</h3>
      <div class="column q-px-lg q-pt-sm">
        <q-input outlined rounded v-model="name" />
        <LittleBtn
          @click="findLocationByName"
          label="Find"
          class="bg-primary q-my-lg"
        />
        <div class="row justify-between q-pt-md">
          <div class="column">
            <p>Longitude</p>
            <q-input outlined rounded disable v-model="longitude" />
          </div>
          <div class="column">
            <p>Latitude</p>
            <q-input outlined rounded disable v-model="latitude" />
          </div>
        </div>
      </div>
    </q-card>
  </q-dialog>
</template>

<script>
import {
  defineComponent,
  getCurrentInstance,
  onBeforeUnmount,
  ref,
  watch,
} from "vue";
import LittleBtn from "components/LittleBtn.vue";
import { useQuasar } from "quasar";

export default defineComponent({
  name: "GeocodingPopup",
  components: { LittleBtn },
  setup(props, ctx) {
    const dialogModel = ref(false);
    const dateFrom = ref("");
    const dateTo = ref("");
    const name = ref("");
    const config = getCurrentInstance().appContext.config.globalProperties;
    const longitude = ref("");
    const latitude = ref("");
    const $q = useQuasar();
    function openDialog() {
      dialogModel.value = true;
    }
    function closeDialog() {
      dialogModel.value = false;
    }

    function findLocationByName() {
      config.$api
        .get(`locations/geocoding/?name=${name.value}`)
        .then((resp) => {
          longitude.value = resp.data.longitude;
          latitude.value = resp.data.latitude;
          ctx.emit("setMarker", latitude.value, longitude.value);
          $q.notify({
            message: "Marker was set on map",
            color: "primary",
            textColor: "black",
          });
        })
        .catch(() => {
          $q.notify({
            message: "Location was not found",
            color: "warning",
            textColor: "black",
          });
        });
    }
    function onClose() {
      name.value = "";
      latitude.value = "";
      longitude.value = "";
    }
    watch(dialogModel, () => {
      name.value = "";
      longitude.value = "";
      latitude.value = "";
    });

    return {
      dialogModel,
      openDialog,
      dateTo,
      dateFrom,
      name,
      findLocationByName,
      longitude,
      latitude,
      onClose,
    };
  },
});
</script>

<style></style>
