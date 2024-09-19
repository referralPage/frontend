<template>
  <header class="header_wrap">
    <div class="header_logo">
      <router-link to="/payback">
        <img src="@/assets/image/retri_logo.png" alt="retri logo" v-if="isMobile" />
        <img src="@/assets/image/logo.png" alt="retri logo" v-else />
      </router-link>
    </div>
    <div class="header_locale">
      <TheLanguage />
    </div>
  </header>
</template>

<script setup>
import { computed,} from "vue";
import TheLanguage from "./TheLanguage.vue";
import { useStore } from "vuex";
const store = useStore();
const isMobile = computed(()=>{
  return store.state.referral.isMobile;
})
</script>

<style lang="scss" scoped></style>
