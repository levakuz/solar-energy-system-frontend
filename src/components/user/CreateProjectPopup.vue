<template>
  <q-dialog v-model="dialogModel">
    <q-card
      class="bg-white column"
      style="height: 600px; width: 800px; border-radius: 10px"
    >
      <h3 class="self-center q-pt-sm" style="margin: 0">Create Project</h3>
      <div class="column q-px-lg q-pt-sm">
        <p class="q-pl-sm">Project name</p>
        <q-input rounded outlined v-model="project.name" />
        <p class="q-pl-sm">Project photo</p>
        <q-file
          rounded
          outlined
          v-model="project.photo"
          accept=".jpg, image/*"
        />
        <div class="row justify-between q-pt-lg">
          <little-btn
            label="Create"
            class="bg-primary"
            @click="createProject"
          />
        </div>
      </div>
    </q-card>
  </q-dialog>
</template>

<script>
import { defineComponent, getCurrentInstance, ref, watch } from "vue";
import LittleBtn from "components/LittleBtn.vue";
import { useAuthStore } from "stores/auth-store";

export default defineComponent({
  name: "CreateProjectPopup",
  components: { LittleBtn },
  setup(props, ctx) {
    const config = getCurrentInstance().appContext.config.globalProperties;
    const authStore = useAuthStore();
    const dialogModel = ref(false);
    const project = ref({ account_id: authStore.user.id });

    function openDialog() {
      dialogModel.value = true;
    }

    function createProject() {
      var formData = new FormData();
      formData.append("account_id", project.value.account_id);
      formData.append("name", project.value.name);
      formData.append("photo", project.value.photo);
      config.$api
        .post("projects", project.value, {
          headers: { "Content-Type": "multipart/form-data" },
        })
        .then((resp) => {
          config.$router.push(`/user/projects/${resp.data.id}`);
        });
    }
    return {
      dialogModel,
      openDialog,
      project,
      createProject,
    };
  },
});
</script>

<style></style>
