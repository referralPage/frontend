<template>
  <div class="payback_main_wrap pr">
    <div class="explan_area">
      <p class="gradient_yellow">레퍼럴 페이백 시스템</p>
      <p>신청 후 거래할 때 마다 수수료를 페이백 받으세요.</p>
    </div>
    <div class="middle_area">
      <p>
        원하는 거래소를 선택하세요<br />
        <span>ReTri</span>
      </p>
    </div>
    <ul class="exchange_area flex_col_c">
      <li
        class="flex_row_c_c"
        v-for="exchange in exchangeList"
        :key="exchange.name"
        @click="enrollCheck(exchange)"
      >
        <img
          class="logo_s"
          :src="exchange.logo"
          :alt="`${exchange.name} logo`"
        />
        <img
          class="logo_l"
          :src="exchange.text"
          :alt="`${exchange.name} logo`"
        />
      </li>
    </ul>
  </div>
</template>

<script setup>
import exchangeList from "@/utils/exchangeList";
import { useRouter } from "vue-router";
import { useStore } from "vuex";
const store = useStore();
const router = useRouter();
const enrollCheck = (exchange) => {
  //등록됐는지 체크하고, 등록됐을 시 '이미 등록되었습니다.' 팝업 띄우기
  // 안됐을 시 페이백 신청 페이지로 변경
  store.commit("referral/selectExchange", exchange);
  store.commit("referral/setExchangeFlag");
  router.push("/apply");
};
const createdFecth = async () =>{
  await store.dispatch("retriAuth/getLoadUser");
  await store.dispatch("retriAuth/postCheckLogin");
}
createdFecth();
</script>