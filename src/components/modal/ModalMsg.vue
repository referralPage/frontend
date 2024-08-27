<template>
  <div class="modal_overlay" @click.self="closeModal">
    <div class="modal_pop_small">
      <div class="smallPop popup_block">
        <div class="pop_title">
          <p>ReTri Referral</p>
        </div>
        <!-- <div class="con_wrap" v-html="props.msg">
          <p class="fs20">
            {{$t(`common['${props.msg}']`)}}
          </p>
        </div> -->
        <div class="con_wrap">
          <p>{{ $t(`modal['${props.msg}']`) }}</p>
        </div>
        <div class="btn_bottom">
          <button class="btn_gray" @click="closeModal">
            {{
              props.msg === "noLogin" ? `${second}s` : $t("common['confirm']")
            }}
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed, onMounted, ref } from "vue";
import { useStore } from "vuex";
const store = useStore();
const props = defineProps({
  msg: { type: String },
});
let second = ref(3);
const redirect_url = computed(() => {
  return store.state.retriAuth.redirect_url;
});
const closeModal = () => {
  store.commit("referral/changeModalState", false);
};
const redirect = () => {
  location.href = redirect_url.value;
};
onMounted(() => {
  if (props.msg == "noLogin") {
    // console.log(redirect_url.value);
    setInterval(() => {
      second.value === 0 ? 0 : second.value--;
    }, 1000);
    setTimeout(() => {
      redirect;
    }, 3000);
  } else {
    clearTimeout(redirect);
  }
});
</script>

<style lang="scss" scoped></style>
