<template>
  <aside class="side_menu">
    <ul class="flex_col_center mgt70">
      <li :class="mainPath === 'payback' || mainPath === 'apply' ? 'active' : ''">
        <router-link to="/payback"></router-link>
      </li>
      <li :class="mainPath === 'mypage' ? 'active' : ''">
        <router-link to="/mypage"></router-link>
      </li>
    </ul>
  </aside>
</template>

<script setup>
import { computed } from "vue";
import { useRoute } from "vue-router";

const route = useRoute();
const mainPath = computed(() => {
  return route.path.split("/")[1];
});
</script>

<style lang="scss" scoped></style>
