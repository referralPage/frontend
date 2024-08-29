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
import { useStore } from "vuex";
import { computed } from "vue";
import ModalMsg from "./components/modal/ModalMsg.vue";
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
const loginStatus = computed(()=>{
  return store.state.referral.loginStatus === 200 ? true : false;
});
// router.beforeEach(function (to, from, next) {
//   // to: 이동할 url에 해당하는 라우팅 객체
//   if (to.matched.some(function(routeInfo) {
//     return routeInfo.meta.authRequired;
//   })) {
//     // 이동할 페이지에 인증 정보가 필요하면 경고 창을 띄우고 페이지 전환은 하지 않음
//     alert('Login Please!');
//   } else {
//     console.log("routing success : '" + to.path + "'");
//     next(); // 페이지 전환
//   };
// });
const createdFetch = async () =>{
  // await store.dispatch("referral/postRetriAuth");
  await store.dispatch("referral/getLoadUser");
  store.commit("referral/initSetting",true);
  // console.log(session_id.value);
  // console.log(retri_id.value);
  if(!session_id.value || !retri_id.value){
    router.push('/404');
  }
}
createdFetch();

</script>
