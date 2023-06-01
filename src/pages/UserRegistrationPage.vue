<script>
import { defineComponent } from "vue";

export default defineComponent({
  name: "UserRegistrationPage",
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
      <q-input class="q-my-sm" outlined color="dark" />
      <h5 style="margin: 0" class="q-mt-sm">Password</h5>
      <q-input
        class="q-mt-sm"
        outlined
        color="dark"
        style="border-radius: 10px"
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
      />
    </q-card>
  </q-page>
</template>

<style scoped></style>
