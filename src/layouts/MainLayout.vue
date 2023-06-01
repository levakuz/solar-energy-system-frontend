<template>
  <q-layout view="lhr lpR lFr">
    <q-header bordered class="bg-secondary text-black">
      <meta name="theme-color" content="#e7f5dc" />
      <q-toolbar>
        <q-toolbar-title>
          <div class="row items-center">
            <q-btn dense flat round icon="menu" @click="toggleLeftDrawer" />
            <q-avatar
              class=""
              icon="flare"
              size="50px"
              style="
                animation-name: flash;
                animation-duration: 20s;
                animation-iteration-count: infinite;
              "
            />
            <h5 style="margin: 0; font-size: 25px">Solar Panels</h5>
          </div>
        </q-toolbar-title>
        <q-btn
          flat
          class="q-ma-sm self-center"
          style="border-radius: 10px; font-size: 20px"
          label="Login"
          no-caps
          icon-right="login"
          to="/login"
          color="black"
        />
      </q-toolbar>
    </q-header>
    <q-drawer
      v-model="leftDrawerOpen"
      side="left"
      bordered
      class="column"
      style="background-color: #3a4a40"
    >
      <div class="row q-ma-sm items-center text-secondary">
        <q-avatar style="margin: 0" icon="flare" size="50px" />
        <h5 style="margin: 0; font-size: 26px">Solar Panels</h5>
      </div>
      <q-separator size="0.1px" color="dark" style="" class="q-mx-lg" />
      <q-list class="rounded-borders q-mx-sm">
        <q-expansion-item
          expand-separator
          icon="person"
          label="For users"
          class="text-secondary"
        >
          <q-list class="rounded-borders q-mx-sm">
            <q-item>
              <q-item-label>Use various devices from our partners</q-item-label>
            </q-item>
            <q-item>No payment required for free account</q-item>
            <q-item>Use full power of service with full account </q-item>
          </q-list>
        </q-expansion-item>
        <q-separator size="0.1px" color="dark" style="" class="q-mx-lg" />
        <q-expansion-item
          expand-separator
          icon="work"
          label="For companies"
          class="text-secondary"
        >
          <q-list class="rounded-borders q-mx-sm">
            <q-item>
              <q-item-label>
                Be our partner now and add yours devices into our service
              </q-item-label>
            </q-item>
            <q-item>
              <q-item-section>
                <q-btn
                  class="text-black"
                  style="width: 100%; border-radius: 10px"
                  label="Become a partner now"
                  icon-right="arrow_forward"
                  to="/registration/company"
                  no-caps
                  color="secondary"
                />
              </q-item-section>
            </q-item>
          </q-list>
        </q-expansion-item>
        <q-separator size="0.1px" color="dark" style="" class="q-mx-lg" />
        <q-expansion-item
          expand-separator
          icon="info"
          label="About us"
          class="text-secondary"
        >
          <q-card style="background-color: #3a4a40">
            <q-card-section>
              Project accomplished during Databanken and Webtechniques by Anton
              Stepanets and Lev Kuznetsov
            </q-card-section>
          </q-card>
        </q-expansion-item>
      </q-list>
      <q-separator size="0.1px" color="dark" style="" class="q-mx-lg" />
      <q-btn
        class="q-mt-lg text-black self-center"
        style="width: 80%; border-radius: 10px"
        label="Sign up"
        to="/registration/user"
        icon-right="arrow_forward"
        no-caps
        color="secondary"
      />
      <q-btn
        flat
        class="q-ma-sm self-center"
        style="border-radius: 10px"
        label="Login"
        no-caps
        icon-right="login"
        to="/login"
        color="secondary"
      />
    </q-drawer>

    <q-page-container>
      <router-view class="page" />
    </q-page-container>
  </q-layout>
</template>

<script>
import { ref } from "vue";

export default {
  setup() {
    const leftDrawerOpen = ref(false);

    return {
      leftDrawerOpen,
      toggleLeftDrawer() {
        leftDrawerOpen.value = !leftDrawerOpen.value;
      },
    };
  },
};
</script>
<style lang="sass">
.page
  body.screen--sm &
    padding-right: 25%
    padding-left: 25%
</style>
