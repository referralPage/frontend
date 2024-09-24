<template>
  <div v-if="allLoading">
    <div class="loading_spinner">
      <div class="loading_circle"></div>
    </div>
  </div>
  <div class="blur_area flex_col_c" v-if="isNotReferral">
    <div>
      <p>{{ $t(`prevGuide['guideTitle']`) }}</p>
      <p>{{ $t(`prevGuide['guideMsg']`) }}</p>
      <p>{{ $t(`prevGuide['guideMsg2']`) }}</p>
      <p>{{ $t(`prevGuide['guideMsg3']`) }}</p>
      <p class="warning_txt">{{ $t(`prevGuide['guideMsg4']`) }}</p>
    </div>
  </div>
  <div class="mypage_wrap" v-if="!allLoading">
    <div class="header_title">
      <h1>Referral Payback</h1>
      <!-- <div class="time_area">
        <span>{{ reportDate }}</span>
      </div> -->
    </div>
    <ul class="mypage_ul" :class="{ nochart: monthlyInfo.monthly_data?.length < 1 }">
      <li>
        <h3 class="title">My Payback</h3>
        <div class="payback_info">
          <p class="totalp">
            {{ $t("myPage.totalPayback") }}
            <span class="txt_main"
              >${{ formatNum(monthlyInfo.total_accumulated_profit, 4) ?? 0 }}</span
            >
          </p>
          <p class="paybackp">
            {{ $t("myPage.monthPayback") }}
            <span class="txt_main"
              >±${{ formatNum(profitInfo.total_profit, 4) ?? 0 }}</span
            >
          </p>
          <div class="month_division">
            <ul class="flex_row_c_c">
              <li class="flex_col_c_c" v-for="(exchange, i) in exchangeArr" :key="i">
                <img
                  class="logo_xs"
                  :src="exchange.logo"
                  :alt="`${exchange.name} logo`"
                />
                <p :class="exchange.payback !== 'X' ? 'txt_main' : 'txt_gray'">
                  {{
                    exchange.payback !== "X"
                      ? `±${formatNum(exchange.payback, 4)}`
                      : $t("myPage.notSubscribed")
                  }}
                </p>
              </li>
            </ul>
          </div>
        </div>
        <div class="pf_chart" v-if="monthlyInfo.monthly_data?.length > 0">
          <ul :style="chartStyle()">
            <li v-for="data in monthlyInfo.monthly_data" :key="data.month">
              <div class="bar" :style="styledObj(data.total_profit)">
                <em>${{ formatNum(data.total_profit, 4) }}</em>
              </div>
              <i>{{ data.month.slice(2, 7) }}</i>
            </li>
          </ul>
          <ul class="chart_line">
            <li></li>
            <li></li>
            <li></li>
            <li></li>
          </ul>
        </div>
      </li>
      <li class="pf_calendar">
        <div class="cal_set">
          <h3 class="title">Payback Calendar</h3>
          <div class="cal_inner">
            <form action="" id="" name="">
              <select id="year" name="year" v-model="select.year">
                <option v-for="year in yearArr" :key="year" :value="year">
                  {{ year }}
                </option>
              </select>
              <select id="month" name="month" v-model="select.month">
                <option v-for="i in 12" :key="i" :value="i">{{ i }}</option>
              </select>
            </form>
          </div>
        </div>
        <TheCalender :select="select" />
      </li>
    </ul>
    <div class="month_payback flex_row_c_c">
      <div class="month_txt">
        <p>{{ $t("myPage.weekPayback") }}</p>
        <p class="txt_main">± ${{ formatNum(profitWeekInfo.total_profit, 4) ?? 0 }}</p>
      </div>
      <div class="month_exchange">
        <ul class="flex_row_c_c">
          <li
            class="flex_col_c_c"
            v-for="exchange in exchangeArrWeekly"
            :key="exchange.name"
          >
            <img class="logo_s" :src="exchange.logo" :alt="`${exchange.name} logo`" />
            <!-- <p>{{ exchange.name }}</p> -->
            <p :class="exchange.payback !== 'X' ? 'txt_main' : 'txt_gray'">
              {{
                exchange.payback !== "X"
                  ? `±${formatNum(exchange.payback, 4) ?? 0}`
                  : $t("myPage.notSubscribed")
              }}
            </p>
          </li>
        </ul>
      </div>
    </div>
    <form action="" id="" name="">
      <div class="pf_list_top">
        <h3 class="sub_title">Payback History</h3>
        <div class="pf_list_search">
          <h5>Search for Date</h5>
          <input type="month" v-model="start_date" :max="toDate" />
          <span class="input_hypen">-</span>
          <input type="month" v-model="end_date" :max="toDate" />
          <button type="button" class="btn_search" @click="historySearch">Search</button>
        </div>
      </div>
    </form>
    <ul class="tab_ctgy flex_row_c">
      <li
        v-for="tab in tabList"
        :key="tab.type"
        @click="selectDateBtn(tab.type)"
        :class="{ active: selectReportTab == tab.type }"
      >
        {{ $t(`myPage.${tab.type}`) }}
      </li>
    </ul>
    <div class="payback_list_head_area" @scroll="syncScroll('head', 'content')">
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
        <!-- <em>{{ kstToLocale(`${data.datetime} 00:00`) }}</em> -->
        <em>{{ data.exchange }}</em>
        <em>${{ formatNum(data.payment, 4) ?? 0 }}</em>
        <!-- <em>{{ kstToLocale(`${data.paymentdate} 00:00`) }}</em> -->
        <em>{{ $t("myPage.referralPayback") }}</em>
        <em>{{
          data.status == 1 ? $t("myPage.expectedPayment") : $t("myPage.paymentCompleted")
        }}</em>
      </li>
    </ul>
    <ThePaging
      v-if="totalPages > 1 && !listLoading"
      :page="page"
      :changePage="changePage"
      :totalPages="totalPages"
    />
  </div>
  <ModalMsg v-if="modalState" :msg="msg" />
</template>

<script setup>
import ModalMsg from "@/components//modal/ModalMsg.vue";
import TheCalender from "@/components/comn/TheCalender.vue";
import ThePaging from "@/components/comn/ThePaging.vue";
import exchangeList from "@/utils/exchangeList";
import {
  autoLeftPad,
  formatNum,
  // kstToLocale,
  // localeToUTCNow,
  preDate,
} from "@/utils/common";
import { computed, reactive, ref } from "vue";
import { useStore } from "vuex";
const store = useStore();
const exchangeArr = ref([...exchangeList]);
const exchangeArrWeekly = ref([...exchangeList]);
const nowDate = new Date();
const toDate = nowDate.toISOString().slice(0, 7);
// let locale = navigator.language.split("-")[1] || "en";
// let reportDate = localeToUTCNow(locale);
const modalState = computed(() => {
  return store.state.referral.modalState;
});
const monthlyInfo = computed(() => {
  return store.state.referral.monthlyInfo;
});
const profitInfo = computed(() => {
  return store.state.referral.profitInfo;
});
const profitWeekInfo = computed(() => {
  return store.state.referral.profitWeekInfo;
});
const paybackList = computed(() => {
  return store.state.referral.paybackList;
});
const page = computed(() => {
  return store.state.referral.page;
});
const totalPages = computed(() => {
  return store.state.referral.totalPages;
});
const listLoading = computed(() => {
  return store.state.referral.listLoading;
});
const isNotReferral = computed(() => {
  return store.state.referral.isNotReferral;
});
let selectReportTab = "";
const msg = "dateWarnig";
let allLoading = ref(false);
let max_profit;
let tabList = [
  { type: "year" },
  { type: "monthSix" },
  { type: "monthThree" },
  { type: "monthPrev" },
  { type: "monthCurr" },
  { type: "today" },
  { type: "all" },
];
let select = reactive({
  year: nowDate.getFullYear(),
  month: nowDate.getMonth() + 1,
});
let start_date = ref(preDate(new Date(), "month").toISOString().slice(0, 7));
let end_date = ref(toDate);
let yearArr = [nowDate.getFullYear(), nowDate.getFullYear() - 1];
const styledObj = (profit) => {
  return {
    // 최고값을 기준으로 백분율
    height: (profit / max_profit) * 100 + "%",
  };
};
const chartStyle = () => {
  if (monthlyInfo.value.monthly_data?.length < 3) {
    return { justifyContent: "flex-start", gap: "50px" };
  }
  return;
};
const selectDateBtn = async (type) => {
  await store.dispatch("referral/postCheckLogin");
  let selectDate = {
    start_date: nowDate,
    end_date: nowDate,
  };
  let today = new Date();
  switch (type) {
    case "year":
      selectDate.start_date = today.setFullYear(today.getFullYear() - 1);
      break;
    case "monthSix":
      selectDate.start_date = today.setMonth(today.getMonth() - 6);
      break;
    case "monthThree":
      selectDate.start_date = today.setMonth(today.getMonth() - 3);
      break;
    case "monthPrev":
      selectDate.end_date = today.setDate(0);
      // today.setMonth(today.getMonth() - 1);
      selectDate.start_date = today.setDate(1);
      break;
    case "monthCurr":
      selectDate.end_date = new Date();
      selectDate.start_date = today.setDate(1);
      break;
    case "today":
      selectDate.start_date = new Date();
      selectDate.end_date = new Date();
      break;
    case "all":
      store.commit("referral/setReportDate", {
        start_date: "",
        end_date: "",
      });
      break;
  }
  let [sYear, sMonth, sDate] = new Date(selectDate.start_date)
    .toLocaleDateString()
    .split(".");
  let [eYear, eMonth, eDate] = new Date(selectDate.end_date)
    .toLocaleDateString()
    .split(".");
  let formatDate = {
    start_date: `${sYear}-${autoLeftPad(Number(sMonth), 2)}-${autoLeftPad(
      Number(sDate),
      2
    )}`,
    end_date: `${eYear}-${autoLeftPad(Number(eMonth), 2)}-${autoLeftPad(
      Number(eDate),
      2
    )}`,
  };
  if (type !== "all") store.commit("referral/setReportDate", formatDate);
  store.commit("referral/setPage", 1);
  await store.dispatch("referral/getPaybackReport");
  selectReportTab = type;
};

const changeDate = async () => {
  let date = new Date(end_date.value);
  date.setMonth(date.getMonth() + 1);
  date.setDate(0);
  let eDate = date.toLocaleDateString().split(".")[2].trim();
  let selectDate = {
    start_date: `${start_date.value}-01`,
    end_date: `${end_date.value}-${eDate}`,
  };
  store.commit("referral/setReportDate", selectDate);
  selectReportTab = "";
};

const historySearch = async () => {
  if (start_date.value > end_date.value) {
    store.commit("referral/changeModalState", true);
  } else {
    changeDate();
    store.commit("referral/setPage", 1);
    await store.dispatch("referral/postCheckLogin");
    await store.dispatch("referral/getPaybackReport");
  }
};

const changePage = async (str) => {
  store.commit("referral/setPage", str);
  await store.dispatch("referral/postCheckLogin");
  await store.dispatch("referral/getPaybackReport");
};
let listHeadScroll = 0;
let listContScroll = 0;
function syncScroll(el1, el2) {
  const listHead = document.querySelector(".payback_list_head_area ");
  const listCont = document.querySelector(".payback_list_box ");
  if (listHead.scrollLeft !== listHeadScroll || listCont.scrollLeft !== listContScroll) {
    el1 == "head" ? (el1 = listHead) : (el1 = listCont);
    el2 == "head" ? (el2 = listHead) : (el2 = listCont);
    el2.scrollLeft = el1.scrollLeft;
    listHeadScroll = listHead.scrollLeft;
    listContScroll = listCont.scrollLeft;
  }
}
allLoading.value = true;
const createdFn = async () => {
  await store.dispatch("referral/postCheckLogin");
  changeDate();
  store.commit("referral/setPage", 1);
  await Promise.all([
    store.dispatch("referral/getMonthlyProfit"),
    store.dispatch("referral/getProfit"),
    store.dispatch("referral/getProfitWeekly"),
    store.dispatch("referral/getPaybackReport"),
  ]);
  allLoading.value = false;
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
  let numArr = [];
  monthlyInfo.value.monthly_data.forEach((item) => {
    numArr.push(item.total_profit);
  });
  max_profit = Math.max(...numArr);
  // weekly
  exchangeArrWeekly.value.forEach((obj) => {
    switch (obj.name) {
      case "OKX":
        obj.payback = profitWeekInfo.value.okx_profit ?? 0;
        break;
      case "Toobit":
        obj.payback = profitWeekInfo.value.toobit_profit ?? 0;
        break;
      case "BingX":
        obj.payback = profitWeekInfo.value.bingx_profit ?? 0;
        break;
      case "Deepcoin":
        obj.payback = profitWeekInfo.value.deepcoin_profit ?? 0;
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
