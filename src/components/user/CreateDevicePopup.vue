<template>
  <q-dialog v-model="dialogModel">
    <q-card
      class="bg-white column"
      style="height: 600px; width: 800px; border-radius: 10px"
    >
      <h3 class="self-center">Edit device</h3>
      <div class="column q-px-lg q-pt-sm">
        <p class="q-pl-sm">Device name</p>
        <q-input rounded outlined v-model="deviceName" />
        <div class="row justify-between q-pt-md">
          <div class="column">
            <p style="margin: 0">Longitude</p>
            <q-input rounded outlined class="q-pt-sm" v-model="longitude" />
          </div>
          <div class="column justify-between">
            <p style="margin: 0">Lattitude</p>
            <q-input rounded outlined class="q-pt-sm" v-model="latitude" />
          </div>
        </div>
        <p style="margin: 0">Product</p>
        <q-select
          rounded
          outlined
          class="q-pt-lg"
          v-model="deviceType"
          :options="deviceTypes"
        />
        <div class="row justify-between q-pt-lg">
          <little-btn label="Save" class="bg-primary" @click="saveDevice" />
          <little-btn
            label="Delete device"
            class="bg-negative"
            @click="deleteDevice"
          ></little-btn>
        </div>
      </div>
    </q-card>
  </q-dialog>
</template>

<script>
import { defineComponent, getCurrentInstance, ref, onMounted } from "vue";
import LittleBtn from "components/LittleBtn.vue";
export default defineComponent({
  name: "CreateDevicePopup",
  components: { LittleBtn },
  setup(props, ctx) {
    const dialogModel = ref(false);
    const deviceName = ref("");
    const longitude = ref("");
    const latitude = ref("");
    const deviceType = ref("");
    const deviceTypes = ref(["1", "2", "3"]);
    const markerObject = ref({});
    function openDialog() {
      dialogModel.value = true;
    }
    function saveDevice() {
      dialogModel.value = false;
      ctx.emit("saveDevice", markerObject, deviceName.value);
      deviceName.value = "";
    }
    function deleteDevice() {
      dialogModel.value = false;
      ctx.emit("deleteDevice", markerObject);
    }
    return {
      dialogModel,
      openDialog,
      longitude,
      latitude,
      deviceName,
      deviceType,
      deviceTypes,
      saveDevice,
      deleteDevice,
      markerObject,
    };
  },
});
</script>

<style></style>
