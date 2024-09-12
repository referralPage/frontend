<template>
  <div class="recieve_wrap">
    <div class="header_title">
      <h1>Referral Payback</h1>
      <div class="time_area">
        <span>{{ reportDate }}</span>
      </div>
    </div>
    <div class="payback_sub_title flex_col_c_c">
      <img class="logo_l" :src="exchange.logo" :alt="`${exchange.name} 로고`" />
      <p>{{ $t("connectExc.paybackConnect") }}</p>
      <!-- <button class="animate__animated  animate__bounce" @click="goToExchange()"> -->
      <button class="bounce_animation" @click="goToExchange()">
        {{ $t("connectExc.nowSign") }}
        <img src="@/assets/image/icon_signup.png" alt="signup_icon" />
      </button>
    </div>
    <p class="warning_txt text-center">
      {{ $t("connectExc.UIDGuide") }}
      <br />
      {{ $t("connectExc.notLinkPayback") }}
    </p>
    <div class="uid_area flex_row_c_c">
      <label for="userUid"
        >{{
          localLang === "VN"
            ? `UID ${$t("myPage.exchange")}`
            : `${$t("myPage.exchange")} UID`
        }}
      </label>
      <input
        type="number"
        id="userUid"
        name="userUid"
        :value="userUid"
        @input="checkNumber"
      />
    </div>
    <div class="btn_area flex_row_c_c">
      <button class="enroll_btn" @click="enrollBtn">
        {{ $t("connectExc.connectBtn") }}
      </button>
    </div>
    <div
      v-if="
        (localLang != 'JP' || exchange.name != 'OKX') &&
        (localLang != 'CN' || exchange.name != 'BingX')
      "
    >
      <ul class="flex_row_c_c">
        <li class="flex_row_c_c">
          <p>
            {{ exchange.name }}
            {{ $t("connectExc.connectGuide") }}
          </p>
          <a
            :href="`/pdf/${exchange.name?.toLowerCase()}/${screenSize}/${exchange.name?.toLowerCase()}_${screenSize}_${localLang}.pdf`"
            :download="`${exchange.name}_pdf`"
          >
            <img src="@/assets/image/download_icon.png" alt="download"
          /></a>
          <a :href="videoLink()" target="_blank">
            <img
              class="video_icon"
              src="@/assets/image/youtube_icon.png"
              alt="youtube"
          /></a>
        </li>
        <li class="flex_row_c_c">
          <p>{{ exchange.name }} {{ $t("connectExc.UIDCheckGuide") }}</p>
          <a
            :href="`/uid/${exchange.name?.toLowerCase()}/${screenSize}/${exchange.name?.toLowerCase()}_${screenSize}_${localLang}.pdf`"
            :download="`${exchange.name}_uid`"
            ><img src="@/assets/image/download_icon.png" alt="download"
          /></a>
          <div class="bin_">&nbsp;</div>

          <!-- <button>
            <img src="@/assets/image/youtube_icon.png" alt="youtube" />
          </button> -->
        </li>
      </ul>
    </div>
  </div>
  <ModalMsg v-if="modalState" :msg="msgCode" />
</template>

<script setup>
import { computed, ref } from "vue";
import ModalMsg from "@/components/modal/ModalMsg.vue";
import { useStore } from "vuex";
import { useRouter } from "vue-router";
import { localeToUTCNow } from "@/utils/common";
const router = useRouter();
const store = useStore();
const exchange = computed(() => {
  return store.state.referral.exchange;
});
const modalState = computed(() => {
  return store.state.referral.modalState;
});
const uidState = computed(() => {
  return store.state.referral.uidState;
});
const localLang = computed(() => {
  return store.state.referral.region_code;
});
const session_id = computed(() => {
  return store.state.referral.session_id;
});
const retri_id = computed(() => {
  return store.state.referral.retri_id;
});
let locale = navigator.language.split("-")[1];
let reportDate = localeToUTCNow(locale);
let msgCode = "msgCode0"; //입력하지않았을 때
let userUid = "";
const checkNumber = (e) => {
  userUid = e.target.value;
};
const enrollBtn = async () => {
  if (userUid == "" || userUid == null) {
    msgCode = `msgCode0`;
  } else {
    store.commit("referral/setUId", userUid);
    await store.dispatch("referral/postCheckLogin");
    await store.dispatch("referral/postUid");
    msgCode = `msgCode0${uidState.value}`;
  }
  store.commit("referral/changeModalState", true);
};
let screenSize = ref("pc");

if (Object.keys(exchange.value).length === 0) {
  router.push("/payback");
}
const createdFn = async () => {
  await store.dispatch("referral/postCheckLogin");
  if (!session_id.value || !retri_id.value) {
    router.push("/404");
  }
  const screenWidth = window.innerWidth;
  if (screenWidth < 640) {
    screenSize.value = "mo";
  } else {
    screenSize.value = "pc";
  }
};
const goToExchange = () => {
  let exchangeUrl;
  if (exchange.value.name === "Toobit")
    exchangeUrl = "https://www.toobit.com/t/YOUTHMETA";
  else if (exchange.value.name === "OKX")
    exchangeUrl = "https://www.okx.com/join/YOUTHMETA";
  else if (exchange.value.name === "BingX")
    exchangeUrl = " https://bingx.com/partner/YOUTHMETA";
  else if (exchange.value.name === "Deepcoin")
    exchangeUrl = "https://s.deepcoin.com/jcfdhib";
  window.open(exchangeUrl, "");
};
const videoLink = () => {
  let link;
  switch (localLang.value) {
    case "KR":
      link = exchange.value.videoKR;
      break;
    case "EN":
      link = exchange.value.videoEN;
      break;
    case "VN":
      link = exchange.value.videoVN;
      break;
    case "CN":
      link = exchange.value.videoCN;
      break;
    case "JP":
      link = exchange.value.videoJP;
      break;
  }
  return link;
};
store.watch((state) => {
  if (state.referral.setting) {
    createdFn();
  }
}, createdFn);
</script>
