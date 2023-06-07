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
          <q-input outlined rounded v-model="user.first_name"></q-input>
        </div>
        <div class="row justify-between items-center q-ma-md">
          <h5 class="q-ma-md">Last name:</h5>
          <q-input outlined rounded v-model="user.last_name"></q-input>
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
  name: "AccountPage",
  components: { LittleBtn },
  setup() {
    const config = getCurrentInstance().appContext.config.globalProperties;
    const user = ref({});
    const authStore = useAuthStore();
    const $q = useQuasar();

    function getAccountInfo() {
      config.$api.get(`accounts/user/${authStore.user.id}`).then((resp) => {
        user.value.first_name = resp.data.first_name;
        user.value.last_name = resp.data.last_name;
      });
    }
    function saveAccount() {
      config.$api
        .put(`accounts/user/${authStore.user.id}`, user.value)
        .then((resp) => {
          $q.notify({
            message: "Account successful updated",
            color: "primary",
            textColor: "black",
          });
        })
        .catch((err) => {
          $q.notify({
            message: "Error in editing of account",
            color: "warning",
            textColor: "black",
          });
        });
    }
    onBeforeMount(() => {
      getAccountInfo();
    });
    return { user, saveAccount };
  },
});
</script>

<style lang="sass"></style>
