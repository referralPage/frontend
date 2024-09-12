<template>
  <aside class="side_menu mobile_side" v-if="isMobile">
    <ul class="flex_row_c_c" :class="{ mgt70: !isMobile }">
      <li
        :class="mainPath === 'payback' || mainPath === 'apply' ? 'active' : ''"
      >
        <div>
          <router-link to="/payback" v-if="mainPath !== '404'"></router-link>
        </div>
      </li>
      <li :class="mainPath === 'mypage' ? 'active' : ''">
        <div>
          <router-link to="/mypage" v-if="mainPath !== '404'"></router-link>
        </div>
      </li>
    </ul>
  </aside>
  <aside class="side_menu" v-else>
    <ul class="flex_col_center mgt90">
      <li
        :class="mainPath === 'payback' || mainPath === 'apply' ? 'active' : ''"
      >
        <div>
          <router-link to="/payback" v-if="mainPath !== '404'"></router-link>
        </div>
      </li>
      <li :class="mainPath === 'mypage' ? 'active' : ''">
        <div>
          <router-link to="/mypage" v-if="mainPath !== '404'"></router-link>
        </div>
      </li>
    </ul>
  </aside>
</template>

<script setup>
import { computed, onMounted } from "vue";
import { useRoute } from "vue-router";
import { useStore } from "vuex";
const route = useRoute();
const store = useStore();
const mainPath = computed(() => {
  return route.path.split("/")[1];
});
const isMobile = computed(()=>{
  return store.state.referral.isMobile;
})
const widthChange = () => {
  const screenWidth = window.innerWidth;
  let mobile = screenWidth < 480;
  store.commit("referral/setIsMobile",mobile);
};
onMounted(() => {
  widthChange();
  window.addEventListener("resize", widthChange);
});
</script>

<style lang="scss" scoped></style>
