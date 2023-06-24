<template>
  <q-page class="column bg-secondary">
    <div class="row justify-around">
      <q-list
        bordered
        class="q-ma-lg rounded-borders full-width"
        style="max-width: 400px"
      >
        <CompanyCard
          class="q-ma-lg"
          v-for="company in companies"
          v-bind:key="company.id"
          :company-name="company.name"
          :companyDevices="company.devices"
        />
      </q-list>
    </div>
  </q-page>
</template>

<script>
import { defineComponent, getCurrentInstance, onBeforeMount, ref } from "vue";
import DeveiceCard from "components/user/DeviceCard.vue";
import CompanyCard from "components/user/CompanyCard.vue";
export default defineComponent({
  name: "CompaniesPage",
  components: { CompanyCard },
  setup() {
    const config = getCurrentInstance().appContext.config.globalProperties;
    const companies = ref([]);
    function getCompanies() {
      config.$api.get(`accounts/companies/`).then((resp) => {
        companies.value = resp.data.items;
        companies.value.forEach((company, index) => {
          getDevices(company.account_id).then((devices) => {
            console.log(devices);
            companies.value[index].devices = devices;
          });
        });
      });
    }
    function getDevices(companyId) {
      return config.$api
        .get(`device-types/?company_id=${companyId}`)
        .then((resp) => {
          return resp.data.items;
        });
    }
    onBeforeMount(() => {
      getCompanies(1, 10);
    });
    return { companies };
  },
});
</script>

<style lang="sass"></style>
