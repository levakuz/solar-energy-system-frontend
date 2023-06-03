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
      </q-toolbar>
    </q-header>
    <q-drawer
      v-model="leftDrawerOpen"
      side="left"
      bordered
      class="column justify-between"
      style="background-color: #3a4a40"
    >
      <q-card
        bordered
        falt
        class="bg-dark row items-center"
        style="width: 100%"
      >
        <q-btn
          no-caps
          flat
          style="width: 100%; margin: 0; padding: 0"
          class="row items-start"
        >
          <div class="q-pa-sm">
            <q-avatar>
              <img src="https://cdn.quasar.dev/img/boy-avatar.png" />
            </q-avatar>
          </div>
          <div class="q-pa-sm">
            <p style="font-size: 24px; margin: 0">Test</p>
          </div>
          <div class="q-pa-sm">
            <p style="font-size: 24px; margin: 0">Test</p>
          </div>
          <q-menu
            transition-show="jump-down"
            transition-hide="jump-up"
            fit
            cover
            class="bg-primary"
            auto-close="false"
          >
            <q-list>
              <q-item
                clickable
                class="items-center"
                @click="$router.push('/user')"
              >
                <q-icon name="person" />
                <q-item-label class="q-pa-sm">Account settings</q-item-label>
              </q-item>
              <q-item clickable class="items-center">
                <q-icon name="description" />
                <q-item-label class="q-pa-sm">My reports</q-item-label>
              </q-item>
              <q-item
                clickable
                class="items-center"
                @click="$router.push('/user/projects')"
              >
                <q-icon name="sunny" />
                <q-item-label class="q-pa-sm">My projects</q-item-label>
              </q-item>
              <q-item clickable class="items-center">
                <q-icon name="widgets" />
                <q-item-label class="q-pa-sm">Available devices</q-item-label>
              </q-item>
              <q-item clickable class="items-center">
                <q-icon name="work" />
                <q-item-label class="q-pa-sm">Companies</q-item-label>
              </q-item>
            </q-list>
          </q-menu>
        </q-btn>
      </q-card>
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
    const leftDrawerOpen = ref(true);
    const showing = ref(true);
    return {
      showing,
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
