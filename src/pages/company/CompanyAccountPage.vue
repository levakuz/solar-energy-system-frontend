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
          <q-input outlined rounded v-model="company.name"></q-input>
        </div>
        <LittleBtn
          label="Save"
          class="bg-primary self-center q-ma-md"
          @click="saveAccount"
        ></LittleBtn>
      </q-card-section>
    </q-card>
  </q-page>
</template>

<script>
import { defineComponent, getCurrentInstance, onBeforeMount, ref } from "vue";
import LittleBtn from "components/LittleBtn.vue";
import { useAuthStore } from "stores/auth-store";
import { useQuasar } from "quasar";
export default defineComponent({
  name: "CompanyAccountPage",
  components: { LittleBtn },
  setup() {
    const config = getCurrentInstance().appContext.config.globalProperties;
    const company = ref({});
    const authStore = useAuthStore();
    const $q = useQuasar();
    function saveAccount() {
      config.$api
        .put(`accounts/company/${authStore.user.id}`, company.value)
        .then((resp) => {
          $q.notify({
            message: "Account successful updated",
            color: "primary",
            textColor: "black",
          });
        })
        .catch((err) => {
          console.log(err);
          $q.notify({
            message: "Error in editing of account",
            color: "warning",
            textColor: "black",
          });
        });
    }
    function getAccountInfo() {
      config.$api.get(`accounts/company/${authStore.user.id}`).then((resp) => {
        company.value.name = resp.data.name;
      });
    }
    onBeforeMount(() => {
      getAccountInfo();
    });

    return { company, saveAccount };
  },
});
</script>

<style lang="sass"></style>
