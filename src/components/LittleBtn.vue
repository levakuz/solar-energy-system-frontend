<template>
  <q-btn no-caps :label="label" flat style="border-radius: 10px" size="18px">
    <slot></slot>
  </q-btn>
</template>
<script>
import { defineComponent, getCurrentInstance } from "vue";

export default defineComponent({
  name: "LittleBtn",
  props: ["label"],
  setup() {
    const config = getCurrentInstance().appContext.config.globalProperties;
    return {};
  },
});
</script>

<style scoped lang="sass"></style>
