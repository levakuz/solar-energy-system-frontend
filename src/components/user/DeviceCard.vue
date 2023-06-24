<template>
  <q-card
    style="
      width: 375px;
      height: 400px;
      border-radius: 20px;
      background-color: white;
    "
    class="column card"
    flat
  >
    <h4 class="q-pa-sm self-center" style="margin: 0">{{ name }}</h4>
    <q-img
      src="https://picsum.photos/500/300"
      width="100%"
      height="150px"
      style="padding: 0; margin: 0"
    ></q-img>
    <div class="row q-px-md q-py-sm">
      <p style="margin: 0">Company:</p>
      <p style="margin: 0" class="q-px-md">{{ company }}</p>
    </div>
    <div class="row q-px-md q-py-sm">
      <p style="margin: 0">System loss:</p>
      <p style="margin: 0" class="q-px-md">{{ systemLoss }}</p>
    </div>
    <div class="row q-px-md q-py-sm">
      <p style="margin: 0">Efficiency:</p>
      <p style="margin: 0" class="q-px-md">{{ efficiency }}</p>
    </div>
    <div class="row q-px-md q-py-sm">
      <p style="margin: 0">Area:</p>
      <p style="margin: 0" class="q-px-md">{{ area }}</p>
    </div>
  </q-card>
</template>

<script>
import { defineComponent, getCurrentInstance } from "vue";
import LittleBtn from "components/LittleBtn.vue";

export default defineComponent({
  name: "DeviceCard",
  components: {},
  props: ["systemLoss", "efficiency", "company", "area", "name"],
  setup(props, ctx) {
    const config = getCurrentInstance().appContext.config.globalProperties;
    function createReport() {}
    function openProject() {
      ctx.emit("open");
    }
    return { createReport, openProject };
  },
});
</script>

<style lang="sass"></style>
