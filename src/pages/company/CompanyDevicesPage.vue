<template>
  <q-page class="column items-xs-center bg-secondary">
    <div class="row justify-around">
      <div class="row">
        <q-pagination
          color="black"
          v-model="page"
          :max="totalPages"
          direction-links
        />
        <q-select v-model="itemsPerPage" :options="itemsPerPageOptions" />
      </div>
      <LittleBtn
        class="bg-white q-mx-md self-start q-mx-lg q-my-sm row items-center"
        label="Create new device"
        @click="openDevicePopup({ company_id: authStore.user.id })"
      >
        <q-icon name="add" />
      </LittleBtn>
    </div>
    <div class="grid self-center items-center">
      <DeviceCard
        v-for="device in devices"
        v-bind:key="device.id"
        :device="device"
        @openDevice="openDevicePopup"
      />
    </div>
    <CreateCompanyDevicePopup
      @deleteDevice="deleteDevice"
      @saveDevice="saveDevice"
      ref="CreateCompanyDevicePopupRef"
    />
  </q-page>
</template>

<script>
import {
  defineComponent,
  getCurrentInstance,
  onMounted,
  ref,
  watch,
} from "vue";
import DeviceCard from "components/company/DeviceCard.vue";
import { useAuthStore } from "stores/auth-store";
import CreateCompanyDevicePopup from "components/company/CreateCompanyDevicePopup.vue";
import LittleBtn from "components/LittleBtn.vue";

export default defineComponent({
  name: "CompanyDevicesPage",
  methods: { ref },
  components: { LittleBtn, CreateCompanyDevicePopup, DeviceCard },
  setup() {
    const config = getCurrentInstance().appContext.config.globalProperties;
    const authStore = useAuthStore();
    const devices = ref([]);
    const CreateCompanyDevicePopupRef = ref("");
    const page = ref(1);
    const itemsPerPageOptions = ref([5, 10, 30, 50, 100]);
    const itemsPerPage = ref(5);
    const totalPages = ref(1);
    function openDevicePopup(device) {
      CreateCompanyDevicePopupRef.value.device = device;
      CreateCompanyDevicePopupRef.value.openDialog();
    }
    function getCompanyDevices() {
      let offset = itemsPerPage.value * (page.value - 1);
      config.$api
        .get(
          `/device-types/?company_id${authStore.user.id}&offset=${offset}&limit=${itemsPerPage.value}`
        )
        .then((resp) => {
          devices.value = resp.data.items;
          totalPages.value = resp.data.pagination.totalPages;

          devices.value.forEach((device) => {
            device.photo = `${config.$api.defaults.baseURL}/device-types-photos/${device.photo}`;
          });
        });
    }
    function deleteDevice(device) {
      devices.value.forEach((e, index) => {
        if (e.id === device.value.id) {
          devices.value.splice(index, 1);
        }
      });
    }
    function saveDevice(device) {
      console.log(device);
      devices.value.push(device);
    }
    onMounted(() => {
      getCompanyDevices();
    });
    watch(page, (currentValue) => {
      getCompanyDevices();
    });
    watch(itemsPerPage, (currentValue) => {
      getCompanyDevices();
    });
    return {
      getCompanyDevices,
      devices,
      CreateCompanyDevicePopupRef,
      openDevicePopup,
      deleteDevice,
      saveDevice,
      authStore,
      page,
      itemsPerPage,
      itemsPerPageOptions,
      totalPages,
    };
  },
});
</script>

<style lang="sass">
.img-container
  body.screen--md &
    width: 50%
    height: 50%
  body.screen--lg &
    width: 50%
    height: 50%
  body.screen--xl &
    width: 50%
    height: 50%
  body.screen--2xl &
    width: 50%
    height: 50%
</style>
