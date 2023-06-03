<template>
  <q-page class="column items-xs-center bg-secondary">
    <q-btn @click="sendTestRequest"></q-btn>
  </q-page>
</template>

<script>
import { defineComponent, getCurrentInstance } from "vue";

export default defineComponent({
  name: "UserIndexPage",
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
