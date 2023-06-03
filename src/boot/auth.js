import { Notify } from "quasar";
export default ({ router, store, app }) => {
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
        }
      });
    }
  );
};
