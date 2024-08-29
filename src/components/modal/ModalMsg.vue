<template>
  <div class="modal_overlay" @click.self="closeModal">
    <div class="modal_pop_small">
      <div class="smallPop popup_block">
        <div class="pop_title">
          <p>ReTri Referral {{ props.exchange }}</p>
        </div>
        <div class="con_wrap" v-if="props.msg === 'modalExchange'">
          <p>{{ $t(`modalExchange['${props.exchange.toLowerCase()}']`) }}</p>
        </div>
        <div class="con_wrap" v-else>
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
import { onMounted, ref } from "vue";
import { useRouter } from "vue-router";
import { useStore } from "vuex";
const store = useStore();
const router = useRouter();
const props = defineProps({
  msg: { type: String },
  exchange: { type: String },
});
let second = ref(3);
const closeModal = () => {
  store.commit("referral/changeModalState", false);
  if(props.exchange){
    router.push("/apply");
  }
  if(props.msg == "msgCode01" || props.msg == "msgCode04"){
    router.push("/payback");
  }
};
const redirect = () => {
  location.href = "https://retri.io";
};
onMounted(() => {
  if (props.msg == "noLogin") {
    setInterval(() => {
      second.value === 0 ? 0 : second.value--;
    }, 1000);
    setTimeout(() => {
      redirect();
    }, 3000);
  } else {
    clearTimeout(redirect);
  }
});
</script>

<style lang="scss" scoped></style>
