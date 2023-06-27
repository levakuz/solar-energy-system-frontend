<template>
  <q-dialog v-model="dialogModel" class="column">
    <q-card
      class="bg-white column q-pa-lg"
      style="height: 600px; width: 800px; border-radius: 10px"
    >
      <h3 class="self-center q-pt-sm" style="margin: 0">Edit device</h3>
      <div class="column q-px-lg q-pt-sm">
        <p style="margin: 0" class="q-pl-sm">Device name</p>
        <q-input rounded outlined v-model="device.name" />
        <p style="margin: 0" class="q-pl-sm">Area</p>
        <q-input rounded outlined v-model="device.area" />
        <p style="margin: 0" class="q-pl-sm">System loss</p>
        <q-input rounded outlined v-model="device.system_loss" />
        <p style="margin: 0" class="q-pl-sm">Efficiency</p>
        <q-input rounded outlined v-model="device.efficiency" />
        <p style="margin: 0" class="q-pl-sm">Photo</p>
        <q-file
          rounded
          outlined
          v-model="device.photo"
          accept=".jpg, image/*"
        />
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
import { useQuasar } from "quasar";
import { useAuthStore } from "stores/auth-store";

export default defineComponent({
  name: "CreateCompanyDevicePopup",
  components: { LittleBtn },
  setup(props, ctx) {
    const config = getCurrentInstance().appContext.config.globalProperties;
    const authStore = useAuthStore();
    const device = ref({ company_id: authStore.user.id });
    const dialogModel = ref(false);
    const $q = useQuasar();
    function openDialog() {
      dialogModel.value = true;
    }

    function saveDevice() {
      if (device.value.id === undefined) {
        var formData = new FormData();
        formData.append("company_id", device.value.company_id);
        formData.append("name", device.value.name);
        formData.append("area", device.value.area);
        formData.append("system_loss", device.value.system_loss);
        formData.append("efficiency", device.value.efficiency);
        formData.append("photo", device.value.photo);
        config.$api
          .post(`device-types/`, formData, {
            headers: { "Content-Type": "multipart/form-data" },
          })
          .then((resp) => {
            device.value = resp.data;
            device.value.photo = `${config.$api.defaults.baseURL}/device-types-photos/${device.value.photo}`;
            ctx.emit("saveDevice", device.value);
            dialogModel.value = false;
          })
          .catch((e) => {
            if (e.response.status !== 422) {
              console.log(e);
              $q.notify({
                message: e.response.data.detail,
                color: "negative",
                textColor: "black",
              });
            }
          });
      } else {
        config.$api
          .put(`device-types/${device.value.id}`, device.value)
          .then(() => {
            ctx.emit("saveDevice", device.value);
            dialogModel.value = false;
          });
      }
    }

    function deleteDevice() {
      if (device.value.id !== undefined) {
        config.$api.delete(`device-types/${device.value.id}`).then(() => {
          dialogModel.value = false;
        });
      } else {
        dialogModel.value = false;
      }
      ctx.emit("deleteDevice", device);
    }
    watch(dialogModel, (newValue) => {
      if (newValue === false) {
        device.value = { company_id: authStore.user.id };
      }
    });

    return {
      dialogModel,
      openDialog,
      device,
      saveDevice,
      deleteDevice,
    };
  },
});
</script>

<style></style>
