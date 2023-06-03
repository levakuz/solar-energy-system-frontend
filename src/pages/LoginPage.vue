<script>
import { defineComponent, getCurrentInstance, ref } from "vue";
import { useQuasar } from "quasar";
import { useAuthStore } from "stores/auth-store";

export default defineComponent({
  name: "LoginPage",
  setup(props, context) {
    const $q = useQuasar();
    const companyData = ref({ name: "", password: "", email: "" });
    const config = getCurrentInstance().appContext.config.globalProperties;
    const loginData = ref({ email: "", password: "" });
    function login() {
      const authStore = useAuthStore();
      authStore.login(loginData.value);
    }
    return {
      loginData,
      login,
    };
  },
});
</script>

<template>
  <q-page class="bg-secondary column items-center">
    <div style="max-width: 540px">
      <h2 style="font-weight: bold; margin: 0" class="full-width q-pa-lg">
        Sign in
      </h2>
    </div>
    <q-card
      flat
      class="column full-width bg-secondary q-pa-lg"
      style="max-width: 540px; max-height: 100vh; border-radius: 10px"
    >
      <h5 style="margin: 0" class="q-mt-lg">Email</h5>
      <q-input
        class="q-my-sm"
        outlined
        color="dark"
        v-model="loginData.email"
      />
      <h5 style="margin: 0" class="q-mt-sm">Password</h5>
      <q-input
        class="q-mt-sm"
        outlined
        color="dark"
        style="border-radius: 10px"
        v-model="loginData.password"
      />
      <a href="123" class="q-mt-sm" style="font-size: 20px"
        >I forgot my password</a
      >
      <q-btn
        flat
        class="q-mt-lg bg-primary"
        label="Sign in"
        no-caps
        color="primary"
        text-color="black"
        style="font-size: 20px"
        rounded
        @click="login"
      />
    </q-card>
  </q-page>
</template>

<style scoped></style>
