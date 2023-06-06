<template>
  <q-expansion-item
    style="max-width: 400px; border-radius: 20px; background-color: white"
    flat
    rounded
    :label="companyName"
    class="overflow-hidden bg-dark text-secondary"
    icon="work"
  >
    <q-card class="bg-primary text-black">
      <q-list class="">
        <CompanyDeviceItem
          class="full-width"
          v-for="device in companyDevices"
          :device-name="device.name"
          :efficiency="device.efficiency"
          :system-loss="device.systemLoss"
          :area="device.area"
          v-bind:key="device.id"
        />
      </q-list>
    </q-card>
  </q-expansion-item>
</template>

<script>
import { defineComponent, getCurrentInstance } from "vue";
import CompanyDeviceItem from "components/user/CompanyDeviceItem.vue";

export default defineComponent({
  name: "CompanyCard",
  components: { CompanyDeviceItem },
  props: ["companyName", "companyDevices"],
  setup(props, ctx) {
    const config = getCurrentInstance().appContext.config.globalProperties;
    return {};
  },
});
</script>

<style lang="sass"></style>
