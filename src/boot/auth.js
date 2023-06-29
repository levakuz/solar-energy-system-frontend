import { Notify } from "quasar";
import { useAuthStore } from "stores/auth-store";

export default ({ router, store, app }) => {
  const authStore = useAuthStore();
  const user = JSON.parse(localStorage.getItem("user"));
  if (user !== undefined && user !== null) {
    authStore.user = user;
    authStore.setToken(user.token);
  }
  app.config.globalProperties.$api.interceptors.response.use(
    undefined,
    function (err) {
      return new Promise(function (resolve, reject) {
        if (
          err.response.status === 403 &&
          err.response.data.detail === "Invalid token or expired token."
        ) {
          Notify.create({
            message: "Session expired, please login again",
            color: "primary",
            textColor: "black",
          });
          router.push("/login");
        } else {
          throw err;
        }
      });
    }
  );
};
