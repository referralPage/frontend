<template>
  <div>
    <div :class="`${(locale, t)}`"></div>
    <TheHeader></TheHeader>
    <TheSideMenu></TheSideMenu>
    <div class="main_wrap">
      <router-view></router-view>
      <!-- <ModalMsg msg="noLogin" v-if="!loginStatus"/> -->
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
import { useStore } from "vuex";
import { computed } from "vue";
// import ModalMsg from "./components/modal/ModalMsg.vue";
import { useRouter } from "vue-router";
const { t, locale } = useI18n({ useScope: "global" });
const store = useStore();
const router =useRouter();
const session_id = computed(()=>{
  return store.state.referral.session_id;
});
const retri_id = computed(()=>{
  return store.state.referral.retri_id;
});

// const loginStatus = computed(()=>{
//   return store.state.referral.loginStatus === 200 ? true : false;
// });
const createdFetch = async () =>{
  // await store.dispatch("referral/postRetriAuth");
  await store.dispatch("referral/getLoadUser");
  store.commit("referral/initSetting",true);
  if(!session_id.value || !retri_id.value){
    router.push('/404');
  }
}
createdFetch();

</script>
