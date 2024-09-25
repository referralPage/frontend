<template>
  <div class="payback_main_wrap pr">
    <div class="header_title">
      <h1>Referral Payback</h1>
      <!-- <div class="time_area">
        <span>{{ reportDate }}</span>
      </div> -->
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
        <p
          :class="
            exchange.payback == 'X' ||
            exchange.payback == undefined ||
            exchange.payback == '승인대기'
              ? 'txt_gray'
              : 'txt_main'
          "
        >
          {{
            exchange.payback == "X" || exchange.payback == undefined
              ? $t("connectExc.notConnected")
              : exchange.payback == "승인대기"
              ? $t("connectExc.connectWaiting")
              : $t("connectExc.connected")
          }}
        </p>
      </li>
    </ul>
  </div>
  <!-- <div class="payback_list_head_area" @scroll="syncScroll('head', 'content')">
    <ul class="payback_list_head">
      <li>{{ $t("myPage.date") }}<i></i></li>
      <li>{{ $t("myPage.exchange") }}<i></i></li>
      <li>{{ $t("myPage.paymentAcount") }}<i></i></li>
      <li>{{ $t("myPage.paymentDate") }}<i></i></li>
      <li>{{ $t("myPage.paymentDetail") }}<i></i></li>
      <li>{{ $t("myPage.remarks") }}<i></i></li>
    </ul>
  </div>
  <div class="list_loading" v-if="listLoading">
    <div class="loading_spinner">
      <div class="loading_circle"></div>
    </div>
  </div>
  <ul class="payback_list_box" @scroll="syncScroll('content', 'head')" v-else>
    <li class="nodata_list" v-if="paybackList.length == 0">
      <span class="nodata">No data!</span>
    </li>
    <li v-for="data in paybackList" :key="data.date">
      <em>{{ kstToLocale(`${data.datetime} 00:00`) }}</em>
      <em>{{ data.exchange }}</em>
      <em>${{ formatNum(data.payment, 4) ?? 0 }}</em>
      <em>{{ kstToLocale(`${data.paymentdate} 00:00`) }}</em>
      <em>{{ $t("myPage.referralPayback") }}</em>
      <em>{{
        data.status == 1
          ? $t("myPage.expectedPayment")
          : $t("myPage.paymentCompleted")
      }}</em>
    </li>
  </ul>
  <ThePaging
    v-if="totalPages > 1 && !listLoading"
    :page="page"
    :changePage="changePage"
    :totalPages="totalPages"
  /> -->
  <ModalMsg v-if="modalState" :msg="msgCode" :exchange="selectExchange" />
</template>

<script setup>
import ModalMsg from "@/components/modal/ModalMsg.vue";
// import { kstToLocale } from "@/utils/common";
import exchangeList from "@/utils/exchangeList";
// import ThePaging from "@/components/comn/ThePaging.vue";
import { computed, ref } from "vue";
import { useStore } from "vuex";
// import { formatNum } from "@/utils/common";
// import moment from "moment";
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
// const paybackList = computed(() => {
//   return store.state.referral.paybackList;
// });
// const page = computed(() => {
//   return store.state.referral.page;
// });
// const totalPages = computed(() => {
//   return store.state.referral.totalPages;
// });
// const listLoading = computed(() => {
//   return store.state.referral.listLoading;
// });
// let start_date = ref(moment().subtract(1,'months').format('YYYY-MM'));
// let end_date = ref(moment().format('YYYY-MM'));
// let locale = navigator.language.split("-")[1] || "en";
// let reportDate = localeToUTCNow(locale);
let selectExchange = ref(null);
let msgCode = "msgCode0"; //입력하지않았을 때
const enrollCheck = async (exchange) => {
  await store.dispatch("referral/postCheckLogin");
  store.commit("referral/selectExchange", exchange);
  store.commit("referral/setExchangeFlag");
  await store.dispatch("referral/getCheckApproval");
  store.commit("referral/changeModalState", true);
  selectExchange.value = exchange.name;
  if (postStatus.value === 0) {
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
        obj.payback = profitInfo.value.okx_profit;
        break;
      case "Toobit":
        obj.payback = profitInfo.value.toobit_profit;
        break;
      case "BingX":
        obj.payback = profitInfo.value.bingx_profit;
        break;
      case "Deepcoin":
        obj.payback = profitInfo.value.deepcoin_profit;
        break;
    }
  });
  // changeDate();
  // store.commit("referral/setPage", 1);
  // store.dispatch("referral/getPaybackReport");
};
// const changeDate = async () => {
//   let date = new Date(end_date.value);
//   date.setMonth(date.getMonth() + 1);
//   date.setDate(0);
//   let eDate = date.toLocaleDateString().split(".")[2].trim();
//   let selectDate = {
//     start_date: `${start_date.value}-01`,
//     end_date: `${end_date.value}-${eDate}`,
//   };
//   store.commit("referral/setReportDate", selectDate);
// };
// let listHeadScroll = 0;
// let listContScroll = 0;
// function syncScroll(el1, el2) {
//   const listHead = document.querySelector(".payback_list_head_area ");
//   const listCont = document.querySelector(".payback_list_box ");
//   if (listHead.scrollLeft !== listHeadScroll || listCont.scrollLeft !== listContScroll) {
//     el1 == "head" ? (el1 = listHead) : (el1 = listCont);
//     el2 == "head" ? (el2 = listHead) : (el2 = listCont);
//     el2.scrollLeft = el1.scrollLeft;
//     listHeadScroll = listHead.scrollLeft;
//     listContScroll = listCont.scrollLeft;
//   }
// }
store.watch((state) => {
  if (state.referral.setting) {
    createdFn();
  }
}, createdFn);
</script>
