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
    <h4 class="q-pa-sm self-center" style="margin: 0">Name</h4>
    <q-img
      src="https://picsum.photos/500/300"
      width="100%"
      height="150px"
      style="padding: 0; margin: 0"
    ></q-img>
    <div class="row q-px-md q-py-sm">
      <p style="margin: 0">Energy produced:</p>
      <p style="margin: 0" class="q-px-md">123</p>
    </div>
    <div class="row q-px-md q-py-sm">
      <p style="margin: 0">Location:</p>
      <p style="margin: 0" class="q-px-md">123</p>
    </div>
    <div class="row q-px-md q-py-sm">
      <p style="margin: 0">Created at:</p>
      <p style="margin: 0" class="q-px-md">123</p>
    </div>
    <div class="row justify-between q-px-md" style="width: 100%">
      <LittleBtn class="bg-primary" @click="createReport" label="Get Report" />
      <LittleBtn class="bg-info" @click="openProject" label="Open" />
    </div>
  </q-card>
</template>

<script>
import { defineComponent, getCurrentInstance } from "vue";
import LittleBtn from "components/LittleBtn.vue";

export default defineComponent({
  name: "UserProjectCard",
  components: { LittleBtn },
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
