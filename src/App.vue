<template>
  <div>
    <div :class="`${(locale, t)}`"></div>
    <TheHeader></TheHeader>
    <TheSideMenu></TheSideMenu>
    <div class="main_wrap">
      <router-view></router-view>
      <ModalMsg msg="noLogin" v-if="!loginStatus"/>
    </div>
  </div>
  
</template>
<script setup>
import "@/assets/css/reset.css";
import "@/assets/css/style.css";
import "@/assets/css/font.css";
import "@/assets/js/script.js";
import { useI18n } from "vue-i18n";
import TheHeader from "./components/comn/TheHeader.vue";
import TheSideMenu from "./components/comn/TheSideMenu.vue";
import { computed, onMounted, onUnmounted, } from "vue";
import { useStore } from "vuex";
import ModalMsg from "./components/modal/ModalMsg.vue";
const { t, locale } = useI18n({ useScope: "global" });
const store = useStore();
const loginStatus = computed(()=>{
  return store.state.retriAuth.loginStatus === 200 ? true : false;
});


const createdFetch = async ()=>{
  await store.dispatch("retriAuth/postRetriAuth");
  await store.dispatch("retriAuth/getLoadUser");
  await store.dispatch("retriAuth/postCheckLogin");
}
const checkLoginStatus = async () => {
  await store.dispatch("retriAuth/postCheckLogin");
}
onMounted(()=>{
  setInterval(checkLoginStatus,60000);
});
onUnmounted(()=>{
  sessionStorage.removeItem("retri_id");
  clearInterval(checkLoginStatus);
})
createdFetch();
</script>
