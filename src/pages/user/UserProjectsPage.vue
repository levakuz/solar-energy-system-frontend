<template>
  <q-page class="column items-xs-center bg-secondary">
    <div class="grid self-center items-center">
      <!-- TODO: Remove hardcoded components      -->
      <UserProjectCard @open="$router.push('/user/projects/1')" class="" />
      <UserProjectCard @open="$router.push('/user/projects/1')" />
      <UserProjectCard @open="$router.push('/user/projects/1')" />
      <UserProjectCard @open="$router.push('/user/projects/1')" />
      <UserProjectCard @open="$router.push('/user/projects/1')" />
      <UserProjectCard @open="$router.push('/user/projects/1')" />
      <UserProjectCard @open="$router.push('/user/projects/1')" />
      <UserProjectCard @open="$router.push('/user/projects/1')" />
      <UserProjectCard @open="$router.push('/user/projects/1')" />
      <UserProjectCard @open="$router.push('/user/projects/1')" />
      <UserProjectCard @open="$router.push('/user/projects/1')" />
      <!--      -->
    </div>
  </q-page>
</template>

<script>
import { defineComponent, getCurrentInstance } from "vue";
import UserProjectCard from "components/user/UserProjectCard.vue";

export default defineComponent({
  name: "UserIndexPage",
  components: { UserProjectCard },
  setup() {
    const config = getCurrentInstance().appContext.config.globalProperties;

    function sendTestRequest() {
      config.$api.get("/accounts/me");
    }

    return { sendTestRequest };
  },
});
</script>

<style lang="sass"></style>
