<template>
  <q-page class="column items-xs-center bg-secondary">
    <div class="grid self-center items-center">
      <!-- TODO: Delete hardcoded components      -->
      <DeveiceCard
        v-for="device in devices"
        v-bind:key="device.id"
        :name="device.name"
        :efficiency="device.efficiency"
        :system-loss="device.system_loss"
        :company="device.company_id"
        :area="device.area"
      />
    </div>
    <q-pagination
      color="black"
      v-model="page"
      :max="totalPages"
      direction-links
    />
  </q-page>
</template>

<script>
import { defineComponent, getCurrentInstance, onBeforeMount, ref } from "vue";
import DeveiceCard from "components/user/DeviceCard.vue";
export default defineComponent({
  name: "DevicesPage",
  components: { DeveiceCard },
  setup() {
    const config = getCurrentInstance().appContext.config.globalProperties;
    const devices = ref([]);
    const page = ref(1);
    const itemsPerPage = ref(10);
    const totalPages = ref(1);
    function getDevices(page, itemsPerPage) {
      let offset = itemsPerPage * (page - 1);
      config.$api
        .get(`device-types/?limit=${itemsPerPage}&offset=${offset}`)
        .then((resp) => {
          devices.value = resp.data.items;
          totalPages.value = resp.data.pagination.totalPages;
        });
    }
    onBeforeMount(() => {
      getDevices(1, 10);
    });
    return { totalPages, devices, page };
  },
});
</script>

<style lang="sass"></style>
