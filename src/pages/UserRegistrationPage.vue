<script>
import { defineComponent, getCurrentInstance, ref } from "vue";
import { useQuasar } from "quasar";

export default defineComponent({
  name: "UserRegistrationPage",
  setup() {
    const user = ref({});
    const config = getCurrentInstance().appContext.config.globalProperties;
    const $q = useQuasar();
    function registerAccount() {
      console.log(user);
      config.$api
        .post("/accounts/user/", user.value)
        .then(() => {
          $q.notify({
            message: "Successfully registered. You can login now.",
            color: "primary",
            textColor: "black",
          });
          config.$router.push("/login");
        })
        .catch(() => {
          $q.notify({
            message: "Failure in user registration!",
            color: "negative",
          });
        });
    }
    return { user, registerAccount };
  },
});
</script>

<template>
  <q-page class="bg-secondary column items-center">
    <div style="max-width: 540px">
      <h2 style="font-weight: bold; margin: 0" class="full-width q-pa-lg">
        Sign up
      </h2>
    </div>
    <q-card
      flat
      class="column full-width bg-secondary q-pa-lg"
      style="max-width: 540px; max-height: 100vh; border-radius: 10px"
    >
      <h5 style="margin: 0" class="q-mt-lg">E-mail</h5>
      <q-input class="q-my-sm" outlined color="dark" v-model="user.email" />
      <h5 style="margin: 0" class="q-mt-md">Password</h5>
      <q-input
        class="q-mt-sm"
        outlined
        color="dark"
        style="border-radius: 10px"
        v-model="user.password"
      />
      <h5 style="margin: 0" class="q-mt-md">First name</h5>
      <q-input
        class="q-mt-sm"
        outlined
        color="dark"
        style="border-radius: 10px"
        v-model="user.first_name"
      />
      <h5 style="margin: 0" class="q-mt-sm">Last name</h5>
      <q-input
        class="q-mt-sm"
        outlined
        color="dark"
        style="border-radius: 10px"
        v-model="user.last_name"
      />
      <q-btn
        flat
        class="q-mt-lg bg-primary"
        label="Sign up"
        no-caps
        color="primary"
        text-color="black"
        style="font-size: 20px"
        rounded
        @click="registerAccount"
      />
    </q-card>
  </q-page>
</template>

<style scoped></style>
