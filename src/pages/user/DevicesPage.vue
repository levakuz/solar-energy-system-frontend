<template>
  <q-page class="column items-xs-center bg-secondary">
    <div class="grid self-center items-center">
      <!-- TODO: Delete hardcoded components      -->
      <DeveiceCard
        efficiency="123"
        system-loss="123"
        company="test"
        area="123"
      />
      <DeveiceCard
        efficiency="123"
        system-loss="123"
        company="test"
        area="123"
      />
      <DeveiceCard
        efficiency="123"
        system-loss="123"
        company="test"
        area="123"
      />
      <DeveiceCard
        efficiency="123"
        system-loss="123"
        company="test"
        area="123"
      />
      <!--      -->
    </div>
  </q-page>
</template>

<script>
import { defineComponent, getCurrentInstance, ref } from "vue";
import DeveiceCard from "components/user/DeviceCard.vue";
export default defineComponent({
  name: "DevicesPage",
  components: { DeveiceCard },
  setup() {
    const config = getCurrentInstance().appContext.config.globalProperties;

    return {};
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
