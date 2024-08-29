<template>
  <div v-if="allLoading">
    <div class="loading_spinner">
      <div class="loading_circle"></div>
    </div>
  </div>
  <!-- <div class="blur_area flex_col_c_c" v-if="isNotReferral"> -->
  <div class="blur_area flex_col_c_c">
    <p>레퍼럴 페이백 등록 후 이용이 가능합니다.</p>
    <p>신청 페이지에서 레퍼럴 페이백 신청 후 이용 부탁드립니다.</p>
  </div>
  <div class="mypage_wrap" v-if="!allLoading">
    <ul class="mypage_ul">
      <li>
        <h3 class="title">My Referral Payback</h3>
        <div class="payback_info">
          <p>
            총 적립 페이백 :
            <span class="txt_blue"
              >${{ formatNum(monthlyInfo.total_accumulated_profit) }}</span
            >
          </p>
        </div>
        <div class="pf_chart">
          <ul :style="chartStyle()">
            <li v-for="data in monthlyInfo.monthly_data" :key="data.month">
              <div class="bar" :style="styledObj(data.total_profit)">
                <em>${{ formatNum(data.total_profit, 0) }}</em>
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
          <h3 class="title">Profit Calendar</h3>
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
        <p>이번달 나의 예상 페이백</p>
        <p class="txt_blue">± ${{ profitInfo.total_profit }}</p>
      </div>
      <div class="month_exchange">
        <ul class="flex_row_c_c">
          <li
            class="flex_col_c_c"
            v-for="exchange in exchangeArr"
            :key="exchange.name"
          >
            <img
              class="logo_s"
              :src="exchange.logo"
              :alt="`${exchange.name} logo`"
            />
            <!-- <p>{{ exchange.name }}</p> -->
            <p :class="exchange.payback !== 'X' ? 'txt_green' : 'txt_gray'">
              {{
                exchange.payback !== "X"
                  ? `±${exchange.payback}`
                  : "레퍼럴 미 가입"
              }}
            </p>
          </li>
        </ul>
      </div>
    </div>
    <form action="" id="" name="">
      <div class="pf_list_top">
        <h3 class="sub_title">Referral History</h3>
        <div class="pf_list_search">
          <h5>Search for Date</h5>
          <input type="month" v-model="start_date" :max="toDate" />
          <span class="input_hypen">-</span>
          <input type="month" v-model="end_date" :max="toDate" />
          <button type="button" class="btn_search" @click="historySearch">
            Search
          </button>
        </div>
      </div>
    </form>
    <ul class="tab_ctgy flex_row_c">
      <li
        v-for="tab in tabList"
        :key="tab.type"
        @click="selectDateBtn(tab.type)"
      >
        {{ tab.displayed }}
      </li>
    </ul>
    <div class="payback_list_head_area" @scroll="syncScroll('head', 'content')">
      <ul class="payback_list_head">
        <li>날짜<i></i></li>
        <li>거래소<i></i></li>
        <li>지급액<i></i></li>
        <li>지급일자<i></i></li>
        <li>지급내역<i></i></li>
        <li>비고<i></i></li>
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
        <em>{{ data.datetime.slice(2, 12) }}</em>
        <em>{{ data.exchange }}</em>
        <em>${{ data.payment }}</em>
        <em>{{ data.paymentdate.slice(2, 12) }}</em>
        <em>{{ data.paymentdetails }}</em>
        <em>{{ data.status }}</em>
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
import { formatNum, preDate } from "@/utils/common";
import { computed, reactive, ref } from "vue";
import { useStore } from "vuex";
import { useRouter } from "vue-router";
const store = useStore();
const router =useRouter();
const exchangeArr = ref([...exchangeList]);
const nowDate = new Date();
const toDate = nowDate.toISOString().slice(0, 7);
const modalState = computed(() => {
  return store.state.referral.modalState;
});
const monthlyInfo = computed(() => {
  return store.state.referral.monthlyInfo;
});
const profitInfo = computed(() => {
  return store.state.referral.profitInfo;
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
const session_id = computed(() => {
  return store.state.referral.session_id;
});
const retri_id = computed(() => {
  return store.state.referral.retri_id;
});
// const isNotReferral = computed(() => {
//   return store.state.referral.isNotReferral;
// });
const msg = "dateWarnig";
let allLoading = ref(false);
let max_profit;
let tabList = [
  { type: "year", displayed: "1년" },
  { type: "month_6", displayed: "6개월" },
  { type: "month_3", displayed: "3개월" },
  { type: "month_pre", displayed: "전월" },
  { type: "month_curr", displayed: "당월" },
  { type: "date_curr", displayed: "당일" },
  { type: "all", displayed: "전체" },
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
    case "month_6":
      selectDate.start_date = today.setMonth(today.getMonth() - 6);
      break;
    case "month_3":
      selectDate.start_date = today.setMonth(today.getMonth() - 3);
      break;
    case "month_pre":
      selectDate.end_date = today.setDate(0);
      today.setMonth(today.getMonth() - 1);
      selectDate.start_date = today.setDate(1);
      break;
    case "month_curr":
      selectDate.end_date = new Date();
      selectDate.start_date = today.setDate(1);
      break;
    case "date_curr":
      selectDate.start_date = new Date();
      selectDate.end_date = new Date();
      break;
    case "all":
      store.commit("referral/setType", "all");
      break;
  }
  selectDate.start_date = new Date(selectDate.start_date)
    .toISOString()
    .slice(0, 10);
  selectDate.end_date = new Date(selectDate.end_date)
    .toISOString()
    .slice(0, 10);
  store.commit("referral/setReportDate", selectDate);
  store.commit("referral/setPage", 1);
  await store.dispatch("referral/getPaybackReport");
};

const changeDate = async () => {
  let date = new Date(end_date.value);
  date.setMonth(date.getMonth() + 1);
  date.setDate(0);
  date = date.toISOString().slice(8, 10);
  let selectDate = {
    start_date: `${start_date.value}-01`,
    end_date: `${end_date.value}-${date}`,
  };
  store.commit("referral/setReportDate", selectDate);
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
  // const listItem = document.querySelector(".payback_list_box");
  // console.log(listItem);
  // listItem.scrollTo({ top: 0, behavior: "smooth" });
};
let listHeadScroll = 0;
let listContScroll = 0;
function syncScroll(el1, el2) {
  const listHead = document.querySelector(".payback_list_head_area ");
  const listCont = document.querySelector(".payback_list_box ");
  if (
    listHead.scrollLeft !== listHeadScroll ||
    listCont.scrollLeft !== listContScroll
  ) {
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
    if (!session_id.value || !retri_id.value) {
    router.push("/404");
  }
  changeDate();
  store.commit("referral/setPage", 1);
  await Promise.all([
    store.dispatch("referral/getMonthlyProfit"),
    store.dispatch("referral/getProfit"),
    store.dispatch("referral/getPaybackReport"),
  ]);
  allLoading.value = false;
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
  let numArr = [];
  monthlyInfo.value.monthly_data.forEach((item) => {
    numArr.push(item.total_profit);
  });
  max_profit = Math.max(...numArr);
};

store.watch((state)=>{
  if(state.referral.setting){
    createdFn();
  } 
},createdFn);
</script>
