<template>
  <div class="payback_main_wrap pr">
    <div class="header_title">
      <h1>Referral Payback</h1>
      <div class="time_area">
        <span>{{ reportDate }}</span>
      </div>
    </div>
    <div class="explan_area">
      <p class="txt_main">{{ $t("dashboardPrev['referralSystem']") }}</p>
      <p>{{ $t("dashboardPrev['mainGuide']") }}</p>
    </div>
    <div class="middle_area flex_row_c_c">
      <img src="@/assets/image/icon_logo.png" />
      <p>Select an exchange you want</p>
    </div>
    <ul class="exchange_area flex_row_c">
      <li
        class="flex_col_c_c ex_name"
        v-for="exchange in exchangeArr"
        :key="exchange.name"
        @click="enrollCheck(exchange)"
      >
        <img
          class="logo_l"
          :src="exchange.logo"
          :alt="`${exchange.name} logo`"
        />
        <p :class="exchange.payback !== 'X' ? 'txt_main' : 'txt_gray'">
          {{ exchange.payback !== "X" ?  $t("connectExc.connected") :  $t("connectExc.notConnected") }}
        </p>
      </li>
    </ul>
  </div>
  <ModalMsg v-if="modalState" :msg="msgCode" :exchange="selectExchange" />
</template>

<script setup>
import ModalMsg from "@/components/modal/ModalMsg.vue";
import { localeToUTCNow } from "@/utils/common";
import exchangeList from "@/utils/exchangeList";
import { computed, ref } from "vue";
import { useStore } from "vuex";
const store = useStore();
const modalState = computed(() => {
  return store.state.referral.modalState;
});
const postStatus = computed(() => {
  return store.state.referral.postStatus;
});
const exchangeArr = ref([...exchangeList]);
const profitInfo = computed(() => {
  return store.state.referral.profitInfo;
});
let locale = navigator.language.split("-")[1];
let reportDate = localeToUTCNow(locale);
let selectExchange = ref(null);
let msgCode = "msgCode0"; //입력하지않았을 때
const enrollCheck = async (exchange) => {
  await store.dispatch("referral/postCheckLogin");
  store.commit("referral/selectExchange", exchange);
  store.commit("referral/setExchangeFlag");
  await store.dispatch("referral/getCheckApproval");
  store.commit("referral/changeModalState", true);
  if (postStatus.value === 0) {
    selectExchange.value = exchange.name;
    msgCode = `modalExchange`;
  } else {
    if (postStatus.value === 1) {
      msgCode = `msgCode06`;
    }
    msgCode = `msgCode0${postStatus.value}`;
    //msg code 1 = 승인대기, 2 = 승인완료, 3 =승인실패, 4 = 이미 등록
  }
};
const createdFn = async () => {
  await store.dispatch("referral/postCheckLogin");
  await store.dispatch("referral/getProfit");
  exchangeArr.value.forEach((obj) => {
    switch (obj.name) {
      case "OKX":
        obj.payback = profitInfo.value.okx_profit ?? 0;
        break;
      case "Toobit":
        obj.payback = profitInfo.value.toobit_profit ?? 0;
        break;
      case "BingX":
        obj.payback = profitInfo.value.bingx_profit ?? 0;
        break;
      case "Deepcoin":
        obj.payback = profitInfo.value.deepcoin_profit ?? 0;
        break;
    }
  });
};
store.watch((state) => {
  if (state.referral.setting) {
    createdFn();
  }
}, createdFn);
</script>
