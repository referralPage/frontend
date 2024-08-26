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
            {{ $t("common['confirm']") }}
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useStore } from "vuex";

const store = useStore();
const props = defineProps({
  msg: { type: String },
});
const closeModal = () => {
  store.commit("referral/changeModalState", false);
};
</script>

<style lang="scss" scoped></style>
