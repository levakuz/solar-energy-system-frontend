<template>
  <q-layout view="lhr lpR lFr">
    <q-header bordered class="bg-secondary text-black">
      <meta name="theme-color" content="#e7f5dc" />
      <q-toolbar class="column row-md">
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
      class="column"
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
            <p style="font-size: 24px; margin: 0">
              {{ authStore.user.companyName }}
            </p>
          </div>
          <q-menu
            transition-show="jump-down"
            transition-hide="jump-up"
            fit
            cover
            class="bg-primary"
            :auto-close="false"
          >
            <q-item
              clickable
              class="items-center"
              @click="$router.push('/company/1')"
            >
              <q-icon name="person" size="24px" />
              <q-item-label class="q-pa-sm item-label"
                >Account settings</q-item-label
              >
            </q-item>
          </q-menu>
        </q-btn>
      </q-card>
      <q-list class="text-secondary">
        <q-item
          clickable
          class="items-center"
          @click="$router.push('/company/devices')"
        >
          <q-icon name="description" size="24px" />
          <q-item-label class="q-pa-sm item-label">Devices</q-item-label>
        </q-item>
      </q-list>
    </q-drawer>

    <q-page-container>
      <router-view class="page" />
    </q-page-container>
    <CreateCompanyDevicePopup ref="CreateCompanyDeviceRef" />
  </q-layout>
</template>

<script>
import { ref } from "vue";
import CreateCompanyDevicePopup from "components/company/CreateCompanyDevicePopup.vue";
import { useAuthStore } from "stores/auth-store";

export default {
  components: { CreateCompanyDevicePopup },
  setup() {
    const leftDrawerOpen = ref(true);
    const showing = ref(true);
    const CreateCompanyDeviceRef = ref("");
    const authStore = useAuthStore();
    function createDevice() {
      CreateCompanyDeviceRef.value.openDialog();
    }
    return {
      showing,
      leftDrawerOpen,
      toggleLeftDrawer() {
        leftDrawerOpen.value = !leftDrawerOpen.value;
      },
      createDevice,
      CreateCompanyDeviceRef,
      authStore,
    };
  },
};
</script>
<style lang="sass">
.page
  body.screen--sm &
    padding-right: 25%
    padding-left: 25%
.item-label
  font-size: 18px
</style>
