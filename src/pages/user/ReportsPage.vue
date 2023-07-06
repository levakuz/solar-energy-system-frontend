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
        <h4 class="q-ma-md">{{ selectedProject.name }}</h4>
      </div>
      <div
        v-if="selectedProject !== null"
        class="row justify-around full-width"
      >
        <h5 class="q-ma-md">Date from: {{ selectedProject.date_from }}</h5>
        <h5 class="q-ma-md">Date to: {{ selectedProject.date_to }}</h5>
      </div>
      <h5 v-if="selectedProject !== null" class="q-ma-md">
        Total:
        {{ (selectedProject.totalEnergyProduced / 100).toFixed(2) }} kWh
      </h5>
      <q-img
        width="80%"
        class="q-ma-lg"
        v-if="selectedProject !== null"
        :src="selectedProject.plot"
      ></q-img>
      <q-select
        v-if="selectedProject !== null"
        outlined
        rounded
        label="Select device"
        style="width: 300px"
        class="q-ma-lg"
        :options="selectedProject.devices"
        option-label="name"
        v-model="selectedDevice"
      />
      <h4 v-if="selectedDevice !== null" class="q-ma-md">
        Total energy produced: {{ selectedDevice.totalEnergyProduced }}
      </h4>
      <div
        v-if="selectedDevice"
        class="bg-white full-width q-ma-md"
        style="max-width: 800px; height: 400px"
      ></div>
    </div>
  </q-page>
</template>

<script>
import { defineComponent, getCurrentInstance, onBeforeMount, ref } from "vue";
import ReportCard from "components/user/ReportCard.vue";

export default defineComponent({
  name: "DevicesPage",
  components: {},
  setup() {
    const config = getCurrentInstance().appContext.config.globalProperties;
    const projects = ref([]);
    const selectedProject = ref(null);
    const selectedDevice = ref(null);
    function getProjects(page, itemsPerPage) {
      let offset = itemsPerPage * (page - 1);
      config.$api
        .get(`projects/?limit=${itemsPerPage}&offset=${offset}`)
        .then((resp) => {
          projects.value = resp.data.items;
          projects.value.forEach((project, index) => {
            getReport(project.id).then((report) => {
              projects.value[index].date_from = new Date(
                report[0].date_from
              ).toLocaleDateString();
              projects.value[index].date_to = new Date(
                report[0].date_to
              ).toLocaleDateString();
              projects.value[index].totalEnergyProduced = report[0].value;
              config.$api
                .get(`report-charts/${report[0].plot_path}`)
                .then((resp) => {
                  projects.value[index].plot = resp.request.responseURL;
                });
            });

            getDevices(project.id).then((devices) => {
              projects.value[index].devices = devices;
            });
          });
        });
    }
    function getReport(projectId) {
      return config.$api
        .get(`reports/?project_id=${projectId}`)
        .then((resp) => {
          return resp.data.items;
        });
    }
    function getDevices(projectId) {
      return config.$api
        .get(`devices/?project_id=${projectId}`)
        .then((resp) => {
          return resp.data.items;
        });
    }
    onBeforeMount(() => {
      getProjects(1, 10);
    });
    return {
      projects,
      selectedProject,
      selectedDevice,
    };
  },
});
</script>

<style lang="sass"></style>
