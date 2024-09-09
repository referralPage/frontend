<template>
  <aside
    class="side_menu mobile_side"
    :class="{ active: isSideMenu }"
    v-if="isMobile"
  >
  <div class="side_logo">
      <router-link :to="mainPath === '404' ? '/404' : '/payback'" @click="changeSideMenu">
        <img src="@/assets/image/logo.png" alt="retri logo" />
      </router-link>
    </div>
    <button type="button" class="menu_close" @click="changeSideMenu"></button>

    <ul class="flex_col_center" :class="{ mgt70: !isMobile }">
      <li
        :class="mainPath === 'payback' || mainPath === 'apply' ? 'active' : ''" @click="changeSideMenu"
      >
        <router-link to="/payback" v-if="mainPath !== '404'"></router-link>
      </li>
      <li :class="mainPath === 'mypage' ? 'active' : ''" @click="changeSideMenu">
        <router-link to="/mypage" v-if="mainPath !== '404'"></router-link>
      </li>
    </ul>
  </aside>
  <aside class="side_menu" v-else>
    <ul class="flex_col_center mgt70">
      <li
        :class="mainPath === 'payback' || mainPath === 'apply' ? 'active' : ''"
      >
        <router-link to="/payback" v-if="mainPath !== '404'"></router-link>
      </li>
      <li :class="mainPath === 'mypage' ? 'active' : ''">
        <router-link to="/mypage" v-if="mainPath !== '404'"></router-link>
      </li>
    </ul>
  </aside>
</template>

<script setup>
import { computed } from "vue";
import { useRoute } from "vue-router";
import { useStore } from "vuex";
const route = useRoute();
const store = useStore();
const mainPath = computed(() => {
  return route.path.split("/")[1];
});
const isMobile = computed(() => {
  return store.state.referral.isMobile;
});
const isSideMenu = computed(() => {
  return store.state.referral.isSideMenu;
});
const changeSideMenu = () => {
  store.commit("referral/setSideMenu", false);
};
</script>

<style lang="scss" scoped></style>
