<template>
  <q-page class="column bg-secondary">
    <div class="row justify-around">
      <q-list bordered class="q-ma-lg rounded-borders">
        <CompanyCard
          class="q-ma-lg"
          v-for="company in companies"
          v-bind:key="company.id"
          :company-name="company.name"
          :companyDevices="company.devices"
        ></CompanyCard>
      </q-list>
    </div>
  </q-page>
</template>

<script>
import { defineComponent, getCurrentInstance, ref } from "vue";
import DeveiceCard from "components/user/DeviceCard.vue";
import CompanyCard from "components/user/CompanyCard.vue";
export default defineComponent({
  name: "CompaniesPage",
  components: { CompanyCard },
  setup() {
    const config = getCurrentInstance().appContext.config.globalProperties;
    const companies = ref([
      {
        id: 1,
        name: "Test",
        devices: [
          {
            name: "TestDevice",
            systemLoss: "123",
            efficiency: "123",
            area: "123",
          },
          {
            name: "TestDevice",
            systemLoss: "123",
            efficiency: "123",
            area: "123",
          },
          {
            name: "TestDevice",
            systemLoss: "123",
            efficiency: "123",
            area: "123",
          },
        ],
      },
      {
        id: 1,
        name: "Test",
        devices: [
          {
            name: "TestDevice",
            systemLoss: "123",
            efficiency: "123",
            area: "123",
          },
          {
            name: "TestDevice",
            systemLoss: "123",
            efficiency: "123",
            area: "123",
          },
          {
            name: "TestDevice",
            systemLoss: "123",
            efficiency: "123",
            area: "123",
          },
        ],
      },
    ]);
    return {
      companies,
    };
  },
});
</script>

<style lang="sass"></style>
