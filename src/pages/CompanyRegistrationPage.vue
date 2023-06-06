<script>
import { defineComponent, getCurrentInstance, ref } from "vue";
import { useQuasar } from "quasar";

export default defineComponent({
  name: "UserRegistrationPage",
  setup(props, context) {
    const $q = useQuasar();
    const companyData = ref({ name: "", password: "", email: "" });
    const config = getCurrentInstance().appContext.config.globalProperties;
    function registerCompany() {
      config.$api
        .post("/accounts/company/", companyData.value)
        .then(() => {
          $q.notify({
            message: "Company successfully created. You can login now.",
            color: "primary",
            textColor: "black",
          });
          config.$router.push("/login");
        })
        .catch(() => {
          $q.notify({
            message: "Failure in company creation!",
            color: "negative",
          });
        });
    }
    return {
      companyData,
      registerCompany,
    };
  },
});
</script>

<template>
  <q-page class="bg-secondary column items-center">
    <div style="max-width: 540px">
      <h2 style="font-weight: bold; margin: 0" class="full-width q-pa-lg">
        Get a partnership for free now
      </h2>
    </div>
    <q-card
      flat
      class="column full-width bg-secondary q-pa-lg"
      style="max-width: 540px; max-height: 100vh; border-radius: 10px"
    >
      <h5 style="margin: 0" class="q-mt-lg">E-mail</h5>
      <q-input
        class="q-my-sm"
        outlined
        color="dark"
        v-model="companyData.email"
      />
      <h5 style="margin: 0" class="q-mt-lg">Company's name</h5>
      <q-input
        class="q-my-sm"
        outlined
        color="dark"
        v-model="companyData.name"
      />
      <h5 style="margin: 0" class="q-mt-sm">Password</h5>
      <q-input
        class="q-mt-sm"
        outlined
        color="dark"
        style="border-radius: 10px"
        v-model="companyData.password"
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
        @click="registerCompany"
      />
    </q-card>
  </q-page>
</template>

<style scoped></style>
