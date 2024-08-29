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
          class="logo_l"
          :src="exchange.logo"
          :alt="`${exchange.name} logo`"
        />
        <!-- <img
          class="logo_l"
          :src="exchange.text"
          :alt="`${exchange.name} logo`"
        /> -->
      </li>
    </ul>
  </div>
  <ModalMsg v-if="modalState" :msg="msgCode" />
</template>

<script setup>
import ModalMsg from "@/components/modal/ModalMsg.vue";
import exchangeList from "@/utils/exchangeList";
import { computed } from "vue";
import { useRouter } from "vue-router";
import { useStore } from "vuex";
const store = useStore();
const router = useRouter();
const modalState = computed(() => {
  return store.state.referral.modalState;
});
const postStatus = computed(() => {
  return store.state.referral.postStatus;
});
// const session_id = computed(()=>{
//   return store.state.referral.session_id;
// });
// const retri_id = computed(()=>{
//   return store.state.referral.retri_id;
// });
let msgCode = "msgCode0"; //입력하지않았을 때
const enrollCheck = async (exchange) => {
  await store.dispatch("referral/postCheckLogin");
  store.commit("referral/selectExchange", exchange);
  store.commit("referral/setExchangeFlag");
  await store.dispatch("referral/getCheckApproval");
  if(postStatus.value === 0){
    router.push("/apply");
  } else{
    store.commit("referral/changeModalState", true);
     msgCode = `msgCode0${postStatus.value}`;
    //msg code 1 = 승인대기, 2 = 승인완료, 3 =승인실패, 4 = 이미 등록
  }
  
};
const createdFn = async () =>{
  await store.dispatch("referral/postCheckLogin");
  // if(!session_id.value || !retri_id.value){
  //   router.push('/404');
  // }
}
store.watch((state)=>{
  if(state.referral.setting){
    createdFn();
  } 
},createdFn);
</script>