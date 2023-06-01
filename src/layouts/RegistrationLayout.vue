<template>
  <q-layout view="lhr lpR lFr">
    <q-header bordered class="bg-secondary text-black">
      <meta name="theme-color" content="#e7f5dc" />
      <q-toolbar>
        <q-toolbar-title class="row items-center">
          <q-avatar
            class=""
            icon="flare"
            size="50px"
            style="
              animation-name: flash;
              animation-duration: 20s;
              animation-iteration-count: infinite;
              cursor: pointer;
            "
            @click="goToMainPage"
          />
          <h5
            style="
              margin: 0;
              font-size: 25px;
              font-weight: normal;
              cursor: pointer;
            "
            @click="goToMainPage"
          >
            Solar Panels
          </h5>
        </q-toolbar-title>
        <q-btn
          flat
          class="q-ma-sm self-center"
          style="border-radius: 10px"
          label="Sign in"
          no-caps
          color="black"
          size="20px"
          @click="goToLogin"
        />
      </q-toolbar>
    </q-header>

    <q-page-container>
      <router-view class="page" />
    </q-page-container>
  </q-layout>
</template>

<script>
import { getCurrentInstance, ref } from "vue";

export default {
  setup() {
    const config = getCurrentInstance().appContext.config.globalProperties;
    function goToLogin() {
      config.$router.push("/login");
    }
    function goToMainPage() {
      config.$router.push("/");
    }
    return { goToLogin, goToMainPage };
  },
};
</script>
<style lang="sass">
.page
  body.screen--sm &
    padding-right: 25%
    padding-left: 25%
</style>
