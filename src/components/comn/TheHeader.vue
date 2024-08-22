<template>
  <header class="header_wrap">
    <div class="header_logo">
        <img src="@/assets/image/logo.png" alt="retri logo" />
    </div>
    <div class="header_title pr">
      <h1>Referral {{ mainPath==='payback' ? 'Payback' : 'My Page' }} </h1>
      <span class="time_area">[24.07.01 00:00]</span>
    </div>
    <div class="header_locale">KR</div>
  </header>
</template>

<script setup>
import { computed } from 'vue';
import { useRoute } from 'vue-router';

const route = useRoute();
const mainPath = computed(()=>{
  return route.path.split("/")[1];
})
</script>

<style lang="scss" scoped></style>
