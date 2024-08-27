import { createStore } from "vuex";
import referral from "./referral"

const store = createStore({
  modules: {
    referral,
  },
});

export default store;
