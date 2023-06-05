<template>
  <q-dialog v-model="dialogModel">
    <q-card
      class="bg-white column"
      style="height: 600px; width: 800px; border-radius: 10px"
    >
      <h3 class="self-center">Generate Report</h3>
      <div class="column q-px-lg q-pt-sm">
        <div class="row justify-between q-pt-md">
          <div class="column">
            <p style="margin: 0">Date from</p>
            <DatePicker @inputDate="setDateFrom" />
          </div>
          <div class="column justify-between">
            <p style="margin: 0">Date to</p>
            <DatePicker @inputDate="setDateTo" />
          </div>
        </div>
        <LittleBtn label="Generate" class="bg-primary q-my-lg" />
      </div>
    </q-card>
  </q-dialog>
</template>

<script>
import { defineComponent, ref } from "vue";
import LittleBtn from "components/LittleBtn.vue";
import DatePicker from "components/DatePicker.vue";

export default defineComponent({
  name: "GenerateReportPopup",
  components: { DatePicker, LittleBtn },
  setup(props, ctx) {
    const dialogModel = ref(false);
    const dateFrom = ref("");
    const dateTo = ref("");
    function openDialog() {
      dialogModel.value = true;
    }
    function setDateTo(value) {
      dateTo.value = value;
    }
    function setDateFrom(value) {
      dateFrom.value = value;
      console.log(value);
    }

    return {
      dialogModel,
      openDialog,
      dateTo,
      dateFrom,
      setDateFrom,
      setDateTo,
    };
  },
});
</script>

<style></style>
