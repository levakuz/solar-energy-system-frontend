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
      :src="photo"
      width="100%"
      height="150px"
      style="padding: 0; margin: 0"
    ></q-img>
    <div class="row q-px-md q-py-sm">
      <p style="margin: 0">Energy produced:</p>
      <p style="margin: 0" class="q-px-md">
        {{ energyProduced ? energyProduced : "N\\A" }}
      </p>
    </div>
    <div class="row q-px-md q-py-sm">
      <p style="margin: 0">Status:</p>
      <p style="margin: 0" class="q-px-md">{{ status }}</p>
    </div>
    <div class="row q-px-md q-py-sm">
      <p style="margin: 0">Created at:</p>
      <p style="margin: 0" class="q-px-md">{{ createdAt }}</p>
    </div>
    <div class="row justify-between q-px-md" style="width: 100%">
      <LittleBtn
        style="width: 100%"
        class="bg-primary"
        @click="openProject"
        label="Browse"
      />
    </div>
  </q-card>
</template>

<script>
import { defineComponent, getCurrentInstance } from "vue";
import LittleBtn from "components/LittleBtn.vue";

export default defineComponent({
  name: "UserProjectCard",
  components: { LittleBtn },
  props: ["name", "createdAt", "energyProduced", "status", "photo"],
  setup(props, ctx) {
    const config = getCurrentInstance().appContext.config.globalProperties;
    function openProject() {
      ctx.emit("open");
    }
    return { openProject };
  },
});
</script>

<style lang="sass"></style>
