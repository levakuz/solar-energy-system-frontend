<template>
  <q-card
    style="height: 100px; border-radius: 10px"
    class="column justify-center"
  >
    <q-card-section
      style="padding: 0"
      class="q-mx-lg row items-center justify-between"
    >
      <h4 style="margin: 0">{{ projectName }}</h4>
      <LittleBtn style="width: 47px; height: 47px" class="bg-primary">
        <q-icon name="open_in_new" class="text-white" size="25px" />
      </LittleBtn>
    </q-card-section>
  </q-card>
</template>

<script>
import { defineComponent, getCurrentInstance } from "vue";
import LittleBtn from "components/LittleBtn.vue";

export default defineComponent({
  name: "ReportCard",
  components: { LittleBtn },
  props: ["projectName"],
  setup(props, ctx) {
    const config = getCurrentInstance().appContext.config.globalProperties;
    return {};
  },
});
</script>

<style lang="sass"></style>
