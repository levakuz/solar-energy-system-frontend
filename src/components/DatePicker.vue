<template>
  <q-input v-model="date" rounded outlined>
    <template v-slot:prepend>
      <q-icon name="event" class="cursor-pointer">
        <q-popup-proxy cover transition-show="scale" transition-hide="scale">
          <q-date
            v-model="date"
            mask="YYYY-MM-DD, HH:mm:ss"
            @update:model-value="$emit('inputDate', date)"
          >
            <div class="row items-center justify-end">
              <q-btn v-close-popup label="Close" color="primary" flat />
            </div>
          </q-date>
        </q-popup-proxy>
      </q-icon>
    </template>

    <template v-slot:append>
      <q-icon name="access_time" class="cursor-pointer">
        <q-popup-proxy cover transition-show="scale" transition-hide="scale">
          <q-time
            with-seconds
            v-model="date"
            mask="YYYY-MM-DD, HH:mm:ss"
            format24h
            @update:model-value="$emit('inputDate', date)"
          >
            <div class="row items-center justify-end">
              <q-btn v-close-popup label="Close" color="primary" flat />
            </div>
          </q-time>
        </q-popup-proxy>
      </q-icon>
    </template>
  </q-input>
</template>
<script>
import { defineComponent, getCurrentInstance, ref } from "vue";

export default defineComponent({
  name: "DatePicker",
  props: [""],
  setup() {
    const config = getCurrentInstance().appContext.config.globalProperties;
    const date = ref(null);
    return { date };
  },
});
</script>

<style scoped lang="sass"></style>
