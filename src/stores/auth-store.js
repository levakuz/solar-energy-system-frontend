import { defineStore } from "pinia";
import { api } from "src/boot/axios";
import { Notify } from "quasar";

export const useAuthStore = defineStore("auth", {
  state: () => ({
    user: {
      role: null,
      token: null,
      id: null,
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
            console.log(resp.data);
            this.user.role = resp.data.role;
            this.user.id = resp.data.id;
            console.log(this.user.role);
            if (this.user.role === "company") {
              this.router.push("/company");
            } else if (this.user.role === "user") {
              this.router.push("/user");
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
