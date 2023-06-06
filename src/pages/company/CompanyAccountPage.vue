<template>
  <q-page class="column bg-secondary items-center">
    <q-card
      flat
      class="row justify-around bg-secondary q-ma-lg"
      bordered
      style="max-width: 80%"
    >
      <q-card-section class="column">
        <q-avatar class="self-center" size="80px">
          <img src="https://cdn.quasar.dev/img/boy-avatar.png" />
        </q-avatar>
        <div class="row justify-between items-center q-ma-md">
          <h5 class="q-ma-md">Company name:</h5>
          <q-input outlined rounded v-model="companyName"></q-input>
        </div>
        <LittleBtn
          label="Save"
          class="bg-primary self-center q-ma-md"
        ></LittleBtn>
      </q-card-section>
    </q-card>
  </q-page>
</template>

<script>
import { defineComponent, getCurrentInstance, ref } from "vue";
import LittleBtn from "components/LittleBtn.vue";
export default defineComponent({
  name: "CompanyAccountPage",
  components: { LittleBtn },
  setup() {
    const config = getCurrentInstance().appContext.config.globalProperties;
    const companyName = ref("Name");
    return { companyName };
  },
});
</script>

<style lang="sass"></style>
