import { createStore } from "vuex";
import referral from "./referral"
import retriAuth from "./retriAuth";

const store = createStore({
  modules: {
    referral,
    retriAuth,
  },
});

export default store;
