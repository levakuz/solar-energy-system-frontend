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
          <h5 class="q-ma-md">First name:</h5>
          <q-input outlined rounded v-model="firstName"></q-input>
        </div>
        <div class="row justify-between items-center q-ma-md">
          <h5 class="q-ma-md">Last name:</h5>
          <q-input outlined rounded v-model="lastName"></q-input>
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
import DeveiceCard from "components/user/DeviceCard.vue";
import CompanyCard from "components/user/CompanyCard.vue";
import LittleBtn from "components/LittleBtn.vue";
export default defineComponent({
  name: "AccountPage",
  components: { LittleBtn },
  setup() {
    const config = getCurrentInstance().appContext.config.globalProperties;
    const firstName = ref("Name");
    const lastName = ref("Name");
    return { firstName, lastName };
  },
});
</script>

<style lang="sass"></style>
