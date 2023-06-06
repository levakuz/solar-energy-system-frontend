<template>
  <q-page class="column items-xs-center bg-secondary">
    <div class="grid self-center items-center">
      <DeviceCard></DeviceCard>
      <DeviceCard></DeviceCard>
      <DeviceCard></DeviceCard>
      <DeviceCard></DeviceCard>
    </div>
  </q-page>
</template>

<script>
import { defineComponent, getCurrentInstance } from "vue";
import DeviceCard from "components/company/DeviceCard.vue";

export default defineComponent({
  name: "CompanyDevicesPage",
  components: { DeviceCard },
  setup() {
    const config = getCurrentInstance().appContext.config.globalProperties;
    function sendTestRequest() {
      config.$api.get("/accounts/me");
    }
    return { sendTestRequest };
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
