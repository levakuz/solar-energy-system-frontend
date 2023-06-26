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
        <LittleBtn
          class="bg-white q-mx-md self-start q-mx-lg q-my-sm row items-center"
          label="Create new project"
          @click="createProject"
          v-if="$route.fullPath === '/user/projects'"
        >
          <q-icon name="add" />
        </LittleBtn>
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
              {{ authStore.user.firstName }}
            </p>
          </div>
          <div class="q-pa-sm">
            <p style="font-size: 24px; margin: 0">
              {{ authStore.user.lastName }}
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
              @click="$router.push(`/user/${authStore.user.id}`)"
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
          @click="$router.push('/user/reports')"
        >
          <q-icon name="description" size="24px" />
          <q-item-label class="q-pa-sm item-label">My reports</q-item-label>
        </q-item>
        <q-item
          clickable
          class="items-center"
          @click="$router.push('/user/projects')"
        >
          <q-icon name="sunny" size="24px" />
          <q-item-label class="q-pa-sm item-label">My projects</q-item-label>
        </q-item>
        <q-item
          clickable
          class="items-center"
          @click="$router.push('/user/devices')"
        >
          <q-icon name="widgets" size="24px" />
          <q-item-label class="q-pa-sm item-label"
            >Available devices</q-item-label
          >
        </q-item>
        <q-item
          clickable
          class="items-center"
          @click="$router.push('/user/companies')"
        >
          <q-icon name="work" size="24px" />
          <q-item-label class="q-pa-sm item-label">Companies</q-item-label>
        </q-item>
      </q-list>
    </q-drawer>

    <q-page-container>
      <router-view class="page" />
    </q-page-container>
  </q-layout>
  <CreateProjectPopup ref="createProjectPopupRef" />
</template>

<script>
import { getCurrentInstance, ref } from "vue";
import LittleBtn from "components/LittleBtn.vue";
import { useAuthStore } from "stores/auth-store";
import CreateProjectPopup from "components/user/CreateProjectPopup.vue";

export default {
  components: { CreateProjectPopup, LittleBtn },
  setup() {
    const leftDrawerOpen = ref(true);
    const showing = ref(true);
    const authStore = useAuthStore();
    const createProjectPopupRef = ref("");
    function createProject() {
      createProjectPopupRef.value.openDialog();
    }
    return {
      showing,
      leftDrawerOpen,
      toggleLeftDrawer() {
        leftDrawerOpen.value = !leftDrawerOpen.value;
      },
      createProject,
      authStore,
      createProjectPopupRef,
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
