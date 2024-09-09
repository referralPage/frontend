<template>
  <header class="header_wrap">
    <div class="header_logo">
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
import { computed } from "vue";
import { useRoute } from "vue-router";
import TheLanguage from "./TheLanguage.vue";
import { localeToUTCNow } from "@/utils/common.js";
const route = useRoute();
const mainPath = computed(() => {
  return route.path.split("/")[1];
});
let locale = navigator.language.split("-")[1];
let nowDate = localeToUTCNow(locale);
</script>

<style lang="scss" scoped></style>
