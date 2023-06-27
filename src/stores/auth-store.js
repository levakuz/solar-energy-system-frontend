import { defineStore } from "pinia";
import { api } from "src/boot/axios";
import { Notify } from "quasar";

export const useAuthStore = defineStore("auth", {
  state: () => ({
    user: {
      role: null,
      token: null,
      id: null,
      firstName: null,
      lastName: null,
      companyName: null,
    },
  }),
  getters: {
    role: (state) => state.user.role,
    id: (state) => state.user.id,
  },
  actions: {
    async login(loginData) {
      api
        .post(`/token/`, loginData)
        .then(async (resp) => {
          await this.setToken(resp.data.access_token);
          api.get("/accounts/me/").then((resp) => {
            this.user.role = resp.data.role;
            this.user.id = resp.data.id;
            if (this.user.role === "company") {
              this.router.push("/company/devices");
            } else if (this.user.role === "user") {
              api.get(`accounts/users/${this.user.id}`).then((resp) => {
                this.user.firstName = resp.data.first_name;
                this.user.lastName = resp.data.last_name;
                this.router.push("/user/projects");
              });
            }
            Notify.create({
              message: "Successful login",
              color: "primary",
              textColor: "black",
            });
          });
        })
        .catch((err) => {
          console.log(err);
          Notify.create({
            message: "Failure in login. Check your credentials.",
            color: "negative",
          });
        });
    },
    logout() {
      this.user.token = null;
      this.user.id = null;
      this.user.role = null;
      this.router.push("/");
    },
    async setToken(token) {
      this.user.token = token;
      api.defaults.headers.common.Authorization = "Bearer " + this.user.token;
    },
  },
});
