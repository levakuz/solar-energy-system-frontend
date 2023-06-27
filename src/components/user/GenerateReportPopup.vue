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
        <LittleBtn
          label="Generate"
          class="bg-primary q-my-lg"
          @click="generateReport"
        />
      </div>
    </q-card>
  </q-dialog>
</template>

<script>
import { defineComponent, getCurrentInstance, ref } from "vue";
import LittleBtn from "components/LittleBtn.vue";
import DatePicker from "components/DatePicker.vue";
import { useQuasar } from "quasar";

export default defineComponent({
  name: "GenerateReportPopup",
  components: { DatePicker, LittleBtn },
  props: ["projectId"],
  setup(props, ctx) {
    const dialogModel = ref(false);
    const dateFrom = ref("");
    const dateTo = ref("");
    const $q = useQuasar();
    const report = ref({});
    const config = getCurrentInstance().appContext.config.globalProperties;

    function openDialog() {
      dialogModel.value = true;
    }

    function closeDialog() {
      dialogModel.value = false;
    }

    function setDateTo(value) {
      dateTo.value = value;
    }

    function setDateFrom(value) {
      dateFrom.value = value;
    }
    function getLocalISOString(date) {
      const offset = date.getTimezoneOffset();
      const offsetAbs = Math.abs(offset);
      const isoString = new Date(
        date.getTime() - offset * 60 * 1000
      ).toISOString();
      return `${isoString.slice(0, -1)}${offset > 0 ? "-" : "+"}${String(
        Math.floor(offsetAbs / 60)
      ).padStart(2, "0")}:${String(offsetAbs % 60).padStart(2, "0")}`;
    }

    function generateReport() {
      let yearInMilliseconds = 31556926000;
      if (new Date() - new Date(dateFrom.value) < yearInMilliseconds) {
        report.value.project_id = props.projectId;
        report.value.date_from = getLocalISOString(new Date(dateFrom.value));
        report.value.date_to = getLocalISOString(new Date(dateTo.value));
        config.$api.post("reports", report.value).then((resp) => {
          $q.notify({
            message: "Report will be send on email",
            color: "positive",
            textColor: "black",
          });
          closeDialog();
        });
      } else {
        $q.notify({
          message: "Date not within a year from now",
          color: "negative",
          textColor: "black",
        });
      }
    }

    return {
      dialogModel,
      openDialog,
      dateTo,
      dateFrom,
      setDateFrom,
      setDateTo,
      generateReport,
    };
  },
});
</script>

<style></style>
