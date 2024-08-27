import api from "@/api/apiRetriAuth";
export default {
  namespaced: true,
  state() {
    return {
      status: "",
      session_id: "",
      region_code: "",
      redirect_url: "",
      loginStatus: 200,
    };
  },
  mutations: {},
  actions: {
    async postRetriAuth(context) {
      try {
        let response = await api.postRetriAuthApi();
        context.state.status = response.status;
      } catch (error) {
        return;
      }
    },
    async getLoadUser(context) {
      try {
        let response = await api.getLoadUserApi();
        sessionStorage.setItem("retri_id", response.result.retri_id);
        context.state.region_code = response.result.na_code;
        context.state.session_id = response.result.session_id;
      } catch (error) {
        return;
      }
    },
    async postCheckLogin(context) {
      try {
        let info = {
          session_id: context.state.session_id,
        };
        let response = await api.postCheckLoginApi(info);
        context.state.loginStatus = response.status;
        if (response.status === 409) {
          context.state.redirect_url = response.data.redirect;
        }
      } catch (error) {
        return;
      }
    },
  },
};
