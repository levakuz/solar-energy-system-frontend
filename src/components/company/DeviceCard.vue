<template>
  <q-card
    style="
      width: 375px;
      height: 450px;
      border-radius: 20px;
      background-color: white;
    "
    class="column card"
    flat
  >
    <h4 class="q-pa-md self-center" style="margin: 0">{{ device.name }}</h4>
    <q-img
      :src="device.photo"
      width="100%"
      height="150px"
      style="padding: 0; margin: 0"
    ></q-img>
    <div class="row q-px-md q-py-sm">
      <p style="margin: 0">System loss:</p>
      <p style="margin: 0" class="q-px-md">{{ device.system_loss }}</p>
    </div>
    <div class="row q-px-md q-py-sm">
      <p style="margin: 0">Area:</p>
      <p style="margin: 0" class="q-px-md">{{ device.area }}</p>
    </div>
    <div class="row q-px-md q-py-sm">
      <p style="margin: 0">Efficiency:</p>
      <p style="margin: 0" class="q-px-md">{{ device.efficiency }}</p>
    </div>
    <LittleBtn @click="openDevice" label="Edit" class="bg-primary q-ma-lg" />
  </q-card>
</template>

<script>
import { defineComponent, getCurrentInstance } from "vue";
import LittleBtn from "components/LittleBtn.vue";

export default defineComponent({
  name: "DeviceCard",
  components: { LittleBtn },
  props: ["device"],
  setup(props, ctx) {
    const config = getCurrentInstance().appContext.config.globalProperties;
    function openDevice() {
      ctx.emit("openDevice", props.device);
    }
    return { openDevice };
  },
});
</script>

<style lang="sass"></style>
