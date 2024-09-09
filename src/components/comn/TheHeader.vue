<template>
  <header class="header_wrap">
    <div class="nav_btn" v-if="isMobile" @click="clickSideMenu()">
      <span class="line line1"></span>
      <span class="line line2"></span>
      <span class="line line3"></span>
    </div>
    <div class="header_logo" v-else>
      <router-link :to="mainPath === '404' ? '/404' : '/payback'">
        <img src="@/assets/image/logo.png" alt="retri logo" />
      </router-link>
    </div>
    <div class="header_title pr">
      <h1>Referral {{ mainPath === "mypage" ? "My Page" : "Payback" }}</h1>
      <span class="time_area">[{{ nowDate }}]</span>
    </div>
    <div class="header_locale">
      <TheLanguage />
    </div>
  </header>
</template>

<script setup>
import { computed, onMounted, ref } from "vue";
import { useRoute } from "vue-router";
import TheLanguage from "./TheLanguage.vue";
import { localeToUTCNow } from "@/utils/common.js";
import { useStore } from "vuex";
const route = useRoute();
const store = useStore();
const mainPath = computed(() => {
  return route.path.split("/")[1];
});
let locale = navigator.language.split("-")[1];
let nowDate = localeToUTCNow(locale);
const isMobile = ref(false);
const widthChange = () => {
  const screenWidth = window.innerWidth;
  isMobile.value = screenWidth < 480;
  store.commit("referral/setIsMobile",isMobile.value);
};
const clickSideMenu = () => {
  store.commit("referral/setSideMenu",true);
}
onMounted(()=>{
  widthChange();
  window.addEventListener('resize',widthChange);
})

</script>

<style lang="scss" scoped></style>
