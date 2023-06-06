<template>
  <q-page class="column items-xs-center bg-secondary">
    <div class="items-center column full-width">
      <q-select
        outlined
        rounded
        label="Select project"
        style="width: 300px"
        class="q-ma-lg"
        :options="projects"
        option-label="name"
        v-model="selectedProject"
      />
      <div v-if="selectedProject !== null">
        <h3>{{ selectedProject.name }}</h3>
      </div>
      <div
        v-if="selectedProject !== null"
        class="row justify-around full-width"
      >
        <h4 class="q-ma-md">Date from: {{ selectedProject.dateFrom }}</h4>
        <h4 class="q-ma-md">Date to: {{ selectedProject.dateTo }}</h4>
      </div>
    </div>
  </q-page>
</template>

<script>
import { defineComponent, getCurrentInstance, ref } from "vue";
import ReportCard from "components/user/ReportCard.vue";

export default defineComponent({
  name: "DevicesPage",
  components: {},
  setup() {
    const config = getCurrentInstance().appContext.config.globalProperties;
    const projects = ref([
      { name: "Test", dateFrom: "12.01.2022", dateTo: "13.01.2022" },
      { name: "Test1", dateFrom: "12.01.2022", dateTo: "13.01.2022" },
    ]);
    const selectedProject = ref(null);
    return { projects, selectedProject };
  },
});
</script>

<style lang="sass"></style>
