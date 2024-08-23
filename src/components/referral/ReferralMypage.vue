<template>
  <!-- <div>
    <div class="loading_spinner">
      <div class="loading_circle"></div>
    </div>
  </div> -->
  <!-- <div class="blur_area flex_col_c_c">
    <p>레퍼럴 페이백 등록 후 이용이 가능합니다.</p>
    <p>신청 페이지에서 레퍼럴 페이백 신청 후 이용 부탁드립니다.</p>
  </div> -->
  <div class="mypage_wrap">
    <ul class="mypage_ul">
      <li>
        <h3 class="title">My Referral Payback</h3>
        <div class="payback_info">
          <p>총 적립 페이백 : <span class="txt_blue">$2,500</span></p>
        </div>
        <!--수익차트-->
        <div class="pf_chart">
          <ul :style="chartStyle()">
            <li v-for="bar in barList" :key="bar.height">
              <div class="bar" :style="styledObj(bar.height)">
                <em>{{ bar.height }}%</em>
              </div>
              <i>{{ bar.date }}</i>
            </li>
            <!-- <li v-for="day in dashboard?.days" :key="day">
            <div
              :class="`bar ${
                day.day_profit.charAt(0) != '-' ? 'bar_plus' : 'bar_minus'
              }`"
              :style="styledObj(Number(day.day_profit) + 10)"
            >
              <em>{{ formatNum(Number(day.day_profit) + 10, 0) }}%</em>
            </div>
            <i>{{ dateFormat(day.datetime) }}</i>
          </li> -->
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
              <select
                id="year"
                name="year"
                v-model="select.year"
                @change="selectCalender()"
              >
                <option v-for="year in yearArr" :key="year" :value="year">
                  {{ year }}
                </option>
              </select>
              <select
                id="month"
                name="month"
                v-model="select.month"
                @change="selectCalender()"
              >
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
        <p class="txt_blue">± $250</p>
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
            <p>{{ exchange.name }}</p>
            <p :class="exchange.payback ? 'txt_green' : 'txt_gray'">
              {{ exchange.payback ? `±${exchange.payback}` : "레퍼럴 미 가입" }}
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

    <ul class="payback_list_box" @scroll="syncScroll('content', 'head')">
      <li>
        <span class="nodata">No data!</span>
      </li>
      <li>
        <em>24.09.10</em>
        <em>okx</em>
        <em>135.2</em>
        <em>24.09.10</em>
        <em>레퍼럴 페이백</em>
        <em>지급 확정</em>
      </li>
      <li>
        <em>24.09.10</em>
        <em>tobbit</em>
        <em>135.2</em>
        <em>24.09.10</em>
        <em>레퍼럴 페이백</em>
        <em>예상지급</em>
      </li>
      <li>
        <em>24.09.10</em>
        <em>tobbit</em>
        <em>135.2</em>
        <em>24.09.10</em>
        <em>레퍼럴 페이백</em>
        <em>예상지급</em>
      </li>
      <li>
        <em>24.09.10</em>
        <em>tobbit</em>
        <em>135.2</em>
        <em>24.09.10</em>
        <em>레퍼럴 페이백</em>
        <em>예상지급</em>
      </li>
      <li>
        <em>24.09.10</em>
        <em>tobbit</em>
        <em>135.2</em>
        <em>24.09.10</em>
        <em>레퍼럴 페이백</em>
        <em>예상지급</em>
      </li>
    </ul>
  </div>
  <ModalMsg v-if="modalState" :msg="msg" />
</template>

<script setup>
import ModalMsg from "@/components//modal/ModalMsg.vue";
import { computed, reactive, ref } from "vue";
import TheCalender from "@/components/comn/TheCalender.vue";
import exchangeList from "@/utils/exchangeList";
import { preDate } from "@/utils/common";
import { useStore } from "vuex";
const store = useStore();
const exchangeArr = [...exchangeList];
const nowDate = new Date();
const toDate = nowDate.toISOString().slice(0, 7);
const modalState = computed(() => {
  return store.state.referral.modalState;
});
const barList = [
  { date: "24-01", height: "50" },
  { date: "24-02", height: "20" },
  { date: "24-03", height: "80" },
];
const msg = "dateWarnig";
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
  year: "",
  month: "",
});
let start_date = ref(preDate(new Date(), "month").toISOString().slice(0, 7));
let end_date = ref(toDate);
let yearArr = [nowDate.getFullYear(), nowDate.getFullYear() - 1];

const styledObj = (profit) => {
  return {
    height: profit + "%",
  };
};
const chartStyle = () => {
  if (barList.length < 3) {
    return { justifyContent: "flex-start", gap: "50px" };
  }
  return;
};
function selectCalender() {
  console.log(select);
  // calender 컴포넌트에서 해도댐
  // store.commit("userinfo/setCalendarInfo", select);
}

const selectDateBtn = (type) => {
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
      console.log("all"); //flag값 다르게
      break;
  }
  selectDate.start_date = new Date(selectDate.start_date)
    .toISOString()
    .slice(0, 10);
  selectDate.end_date = new Date(selectDate.end_date)
    .toISOString()
    .slice(0, 10);
  console.log(selectDate);
};

const historySearch = async () => {
  // let info = {
  //   start_date: start_date.value,
  //   end_date: end_date.value,
  // };
  if (start_date.value > end_date.value) {
    console.log("aa");
    store.commit("referral/changeModalState", true);
    // store.commit("userinfo/isChangeOpenModal", true);
  } else {
    console.log("bb");
    // store.commit("userinfo/setTradeInfo", info);
    // await store.dispatch("userinfo/loadTrade");
  }
};

// const changeNumber = async (str) => {
//   store.commit("userinfo/setTradePage",str);
//   await store.dispatch("userinfo/loadTrade");
//   const listItem = document.querySelector(".pr_list_box");
//   listItem.scrollTo({ top: 0, behavior: "smooth" });
// };

select.year = nowDate.getFullYear();
select.month = nowDate.getMonth() + 1;
exchangeArr.forEach((obj) => {
  let toobitPayback = 150;
  let okxPayback = 200;
  let bingxPayback = null;
  obj.payback =
    obj.name === "toobit"
      ? toobitPayback
      : obj.name === "okx"
      ? okxPayback
      : bingxPayback;
});
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
</script>

<style lang="scss" scoped></style>
