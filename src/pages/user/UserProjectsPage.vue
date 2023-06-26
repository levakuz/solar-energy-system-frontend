<template>
  <q-page class="column items-xs-center bg-secondary">
    <div class="row items-center q-pa-sm">
      <div></div>
      <q-select v-model="projectsStatus" :options="projectsStatusOptions" />
    </div>
    <div class="row items-center">
      <q-pagination
        color="black"
        v-model="page"
        :max="totalPages"
        direction-links
        class="q-px-sm"
      />
      <q-select v-model="itemsPerPage" :options="itemsPerPageOptions" />
    </div>
    <div class="grid self-center items-center">
      <UserProjectCard
        v-for="project in projects"
        v-bind:key="project.id"
        :name="project.name"
        :status="project.status"
        :photo="project.photo"
        @open="$router.push(`/user/projects/${project.id}`)"
        class=""
      />
    </div>
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
    const itemsPerPage = ref(5);
    const totalPages = ref(1);
    const itemsPerPageOptions = ref([5, 10, 30, 50, 100]);
    const projectsStatus = ref("active");
    const projectsStatusOptions = ref(["active", "inactive"]);
    function getUserProjects(page, itemsPerPage) {
      let offset = itemsPerPage * (page - 1);
      config.$api
        .get(
          `projects/?limit=${itemsPerPage}&offset=${offset}&status=${projectsStatus.value}`
        )
        .then((resp) => {
          projects.value = resp.data.items;
          projects.value.forEach((project) => {
            project.photo = `${config.$api.defaults.baseURL}/project-photos/${project.photo}`;
          });
          totalPages.value = resp.data.pagination.totalPages;
        });
    }
    onBeforeMount(() => {
      getUserProjects(1, itemsPerPage.value);
    });

    watch(page, (currentValue) => {
      getUserProjects(currentValue, itemsPerPage.value);
    });
    watch(itemsPerPage, (currentValue) => {
      getUserProjects(1, itemsPerPage.value);
    });
    watch(projectsStatus, (currentValue) => {
      getUserProjects(page.value, itemsPerPage.value);
    });

    return {
      projects,
      page,
      itemsPerPage,
      totalPages,
      itemsPerPageOptions,
      projectsStatus,
      projectsStatusOptions,
    };
  },
});
</script>

<style lang="sass"></style>
