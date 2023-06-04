<template>
  <q-page class="column items-xs-center bg-secondary">
    <LittleBtn
      class="bg-white q-mx-md self-start q-mx-lg q-my-sm row items-center"
      label="Create new project"
      @click="$router.push('/user/projects/create')"
    >
      <q-icon name="add" />
    </LittleBtn>

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
import LittleBtn from "components/LittleBtn.vue";

export default defineComponent({
  name: "UserIndexPage",
  components: { LittleBtn, UserProjectCard },
  setup() {
    const config = getCurrentInstance().appContext.config.globalProperties;
    function sendTestRequest() {
      config.$api.get("/accounts/me");
    }
    return { sendTestRequest };
  },
});
</script>

<style lang="sass">
.grid
  width: 100%
  display: grid
  grid-template-columns: repeat(auto-fill, 375px)  //height of card
  padding: 24px
  grid-column-gap: 24px
  grid-row-gap: 24px
</style>
