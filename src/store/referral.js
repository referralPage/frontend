export default {
  namespaced: true,
  state() {
    return {
      modalState: false,
      // 기본값
      exchange: {
        name: "toobit",
        logo: require("@/assets/image/ex/toobitLogo.png"),
        text: require("@/assets/image/ex/toobit.png"),
      },
    };
  },
  mutations: {
    changeModalState(state, payload) {
      state.modalState = payload;
      const body = document.querySelector("body");
      if (state.modalState === true) {
        body.style.overflow = "hidden";
      } else {
        body.style.overflow = "auto";
      }
    },
    selectExchange(state, payload) {
      state.exchange = {
        name: payload.name,
        logo: payload.logo,
        text: payload.text,
      };
    },
  },
  actions: {},
};
