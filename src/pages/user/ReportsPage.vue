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
        <h3 class="q-ma-md">{{ selectedProject.name }}</h3>
      </div>
      <div
        v-if="selectedProject !== null"
        class="row justify-around full-width"
      >
        <h4 class="q-ma-md">Date from: {{ selectedProject.dateFrom }}</h4>
        <h4 class="q-ma-md">Date to: {{ selectedProject.dateTo }}</h4>
      </div>
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
import { defineComponent, getCurrentInstance, ref } from "vue";
import ReportCard from "components/user/ReportCard.vue";

export default defineComponent({
  name: "DevicesPage",
  components: {},
  setup() {
    const config = getCurrentInstance().appContext.config.globalProperties;
    const projects = ref([
      {
        name: "Test",
        dateFrom: "12.01.2022",
        dateTo: "13.01.2022",
        devices: [
          { name: "a", totalEnergyProduced: "123" },
          { name: "b", totalEnergyProduced: "222" },
          { name: "c", totalEnergyProduced: "333" },
        ],
      },
      {
        name: "Test1",
        dateFrom: "12.01.2022",
        dateTo: "13.01.2022",
        devices: ["d", "e", "f"],
      },
    ]);
    const selectedProject = ref(null);
    const selectedDevice = ref(null);
    return {
      projects,
      selectedProject,
      selectedDevice,
    };
  },
});
</script>

<style lang="sass"></style>
