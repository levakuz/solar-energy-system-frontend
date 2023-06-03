<template>
  <q-page class="column items-xs-center bg-secondary">
    <UserGMap></UserGMap>
  </q-page>
</template>

<script>
import { defineComponent, getCurrentInstance } from "vue";
import UserGMap from "components/user/UserGMap.vue";

export default defineComponent({
  name: "CreateProjectPage",
  components: { UserGMap },
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
.grid
  width: 100%
  display: grid
  grid-template-columns: repeat(auto-fill, 375px)  //height of card
  padding: 24px
  grid-column-gap: 24px
  grid-row-gap: 24px
</style>
