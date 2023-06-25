<template>
  <q-dialog v-model="dialogModel">
    <q-card
      class="bg-white column"
      style="height: 600px; width: 800px; border-radius: 10px"
    >
      <h3 class="self-center q-pt-sm" style="margin: 0">Edit device</h3>
      <div class="column q-px-lg q-pt-sm">
        <p class="q-pl-sm">Device name</p>
        <q-input rounded outlined v-model="device.name" />
        <div class="row justify-between q-pt-md">
          <div class="column">
            <p style="margin: 0" class="q-pl-sm">Longitude</p>
            <q-input
              rounded
              outlined
              class="q-pt-sm"
              v-model="location.longitude"
              disable
            />
          </div>
          <div class="column justify-between">
            <p style="margin: 0" class="q-pl-sm">Latitude</p>
            <q-input rounded outlined v-model="location.latitude" disable />
          </div>
        </div>
        <p style="margin: 0" class="q-pa-sm">Product</p>
        <q-select
          rounded
          outlined
          class="q-pt-sm"
          v-model="device.device_type_id"
          option-value="id"
          :options="deviceTypes"
          option-label="name"
          emit-value
          map-options
        />
        <p style="margin: 0" class="q-pl-sm">Count</p>
        <q-input rounded outlined v-model="device.count" />
        <p style="margin: 0" class="q-pl-sm">Orientation</p>
        <q-input rounded outlined v-model="device.orientation" />
        <div class="row justify-between q-pt-lg">
          <little-btn label="Save" class="bg-primary" @click="saveDevice" />
          <little-btn
            label="Delete device"
            class="bg-negative"
            @click="deleteDevice"
          />
        </div>
      </div>
    </q-card>
  </q-dialog>
</template>

<script>
import { defineComponent, getCurrentInstance, ref, watch } from "vue";
import LittleBtn from "components/LittleBtn.vue";

export default defineComponent({
  name: "CreateDevicePopup",
  components: { LittleBtn },
  setup(props, ctx) {
    const config = getCurrentInstance().appContext.config.globalProperties;
    const device = ref({ power_peak: 1 });
    const location = ref({});
    const dialogModel = ref(false);
    const deviceTypes = ref(["1", "2", "3"]);
    const markerObject = ref({});

    function openDialog() {
      dialogModel.value = true;
    }

    function saveDevice() {
      console.log(device.value);
      config.$api.post("locations", location.value).then((resp) => {
        device.value.location_id = resp.data.id;
        config.$api.post("devices", device.value).then(() => {
          ctx.emit("saveDevice", markerObject, device.value.name);
          dialogModel.value = false;
          device.value.name = "";
        });
      });
    }

    function deleteDevice() {
      dialogModel.value = false;
      ctx.emit("deleteDevice", markerObject);
    }
    function getDeviceTypes() {
      config.$api.get(`device-types/`).then((resp) => {
        deviceTypes.value = resp.data.items;
      });
    }
    watch(dialogModel, (newValue) => {
      if (newValue === true) {
        getDeviceTypes();
      }
    });

    return {
      dialogModel,
      openDialog,
      location,
      device,
      deviceTypes,
      saveDevice,
      deleteDevice,
      markerObject,
    };
  },
});
</script>

<style></style>
