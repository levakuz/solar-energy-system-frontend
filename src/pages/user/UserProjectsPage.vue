<template>
  <q-page class="column items-xs-center bg-secondary">
    <div class="grid self-center items-center">
      <UserProjectCard
        v-for="project in projects"
        v-bind:key="project.id"
        :name="project.name"
        :status="project.status"
        @open="$router.push(`/user/projects/${project.id}`)"
        class=""
      />
    </div>
    <q-pagination
      color="black"
      v-model="page"
      :max="totalPages"
      direction-links
    />
  </q-page>
</template>

<script>
import {
  defineComponent,
  getCurrentInstance,
  onBeforeMount,
  ref,
  watch,
} from "vue";
import UserProjectCard from "components/user/UserProjectCard.vue";

export default defineComponent({
  name: "UserIndexPage",
  components: { UserProjectCard },
  setup() {
    const config = getCurrentInstance().appContext.config.globalProperties;
    const projects = ref([]);
    const page = ref(1);
    const itemsPerPage = ref(10);
    const totalPages = ref(1);
    function getUserProjects(page, itemsPerPage) {
      let offset = itemsPerPage * (page - 1);
      config.$api
        .get(`projects/?limit=${itemsPerPage}&offset=${offset}`)
        .then((resp) => {
          projects.value = resp.data.items;
          totalPages.value = resp.data.pagination.totalPages;
        });
    }
    onBeforeMount(() => {
      getUserProjects(1, 10);
    });

    watch(page, (currentValue) => {
      getUserProjects(currentValue, itemsPerPage.value);
    });

    return { projects, page, itemsPerPage, totalPages };
  },
});
</script>

<style lang="sass"></style>
