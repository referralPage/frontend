<template>
  <header class="header_wrap">
    <div class="header_logo">
      <a :href="isMobile ? 'https://www.retri.io/m/' : 'https://www.retri.io/'" target="blank">
        <img src="@/assets/image/retri_logo.png" alt="retri logo" v-if="isMobile" />
        <img src="@/assets/image/logo.png" alt="retri logo" v-else />
      </a>
    </div>
    <div class="header_locale">
      <TheLanguage />
    </div>
  </header>
</template>

<script setup>
import { computed, onMounted,} from "vue";
import TheLanguage from "./TheLanguage.vue";
import { useStore } from "vuex";
const store = useStore();
const isMobile = computed(()=>{
  return store.state.referral.isMobile;
})

// 추가
const widthChange = () => {
  const screenWidth = window.innerWidth;
  let mobile = screenWidth < 481;
  store.commit("referral/setIsMobile", mobile);
};
onMounted(() => {
  widthChange();
  window.addEventListener("resize", widthChange);
});
</script>

<style lang="scss" scoped></style>
