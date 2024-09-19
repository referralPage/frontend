<template>
  <div class="modal_overlay" @click.self="closeModal(false)">
    <div class="modal_pop_small">
      <div class="smallPop popup_block" :class="{ex : props.msg == 'modalExchange' && props.exchange.toLowerCase() =='toobit'}">
        <div class="pop_title">
          <p>ReTri Referral {{ props.exchange }}</p>
        </div>
        <div class="con_wrap" v-if="props.msg === 'modalExchange'">
          <p v-html="$t(`modalExchange['${props.exchange.toLowerCase()}']`)"></p>
        </div>
        <div class="con_wrap" v-else>
          <p>{{ $t(`modal['${props.msg}']`) }}</p>
        </div>
        <div class="btn_bottom">
          <button @click="goTelegram" v-if="props.msg == 'modalExchange' && props.exchange.toLowerCase() =='toobit'">
           {{ $t("modal['center']")}}
          </button>
          <button class="btn_gray" @click="closeModal(true)">
            {{
              $t("common['confirm']")
            }}
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useRouter } from "vue-router";
import { useStore } from "vuex";
const store = useStore();
const router = useRouter();
const props = defineProps({
  msg: { type: String },
  exchange: { type: String },
});
const closeModal = (boolean) => {
  store.commit("referral/changeModalState", false);
  if (props.msg == "noLogin") {
    redirect();
  }
  if(props.exchange && boolean){
    router.push("/apply");
  }
  if(props.msg == "msgCode01" || props.msg == "msgCode04"){
    router.push("/payback");
  }
};
const goTelegram = () =>{
  window.open("https://t.me/retrics");
  closeModal();

}
const redirect = () => {
  const screenWidth = window.innerWidth;
  if (screenWidth < 640) {
    location.href = "https://www.retri.io/m/";
  } else {
    location.href = "https://retri.io";
  }
};

</script>

<style lang="scss" scoped></style>
