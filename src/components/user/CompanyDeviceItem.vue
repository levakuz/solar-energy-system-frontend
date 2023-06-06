<template>
  <q-expansion-item
    :header-inset-level="1"
    :content-inset-level="2"
    :label="deviceName"
    icon="widgets"
    class=""
  >
    <q-list>
      <q-item>
        <q-item-label>Efficiency: {{ efficiency }}</q-item-label>
      </q-item>
      <q-item>
        <q-item-label>System loss: {{ systemLoss }}</q-item-label>
      </q-item>
      <q-item>
        <q-item-label>Area: {{ area }}</q-item-label>
      </q-item>
    </q-list>
  </q-expansion-item>
</template>
<script>
import { getCurrentInstance, defineComponent } from "vue";

export default defineComponent({
  name: "CompanyDeviceItem",
  components: {},
  props: ["deviceName", "efficiency", "systemLoss", "area"],
  setup(props, ctx) {
    const config = getCurrentInstance().appContext.config.globalProperties;
    return {};
  },
});
</script>
<style scoped lang="sass"></style>
