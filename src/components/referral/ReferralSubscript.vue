<template>
  <div class="recieve_wrap">
    <div class="payback_sub_title flex_row_c_c">
      <div class="flex_row_c_c">
        <img
          class="logo_l"
          :src="exchange.logo"
          :alt="`${exchange.name} 로고`"
        />
        <!-- <img class="logo_l" :src="exchange.text" :alt="exchange.name" /> -->
      </div>
      <p>{{$t('connectExc.paybackConnect')}}</p>
      <button class="gradient_green">{{$t('connectExc.nowSign')}}</button>
    </div>
    <p class="warning_txt">
      {{$t('connectExc.UIDGuide')}}
      <br />
      {{$t('connectExc.notLinkPayback')}}
    </p>
    <div class="uid_area flex_row_c_c">
      <label for="userUid">{{ exchange.name }} {{$t('connectExc.UIDInput')}}: </label>
      <input
        type="number"
        id="userUid"
        name="userUid"
        :value="userUid"
        @input="checkNumber"
      />
    </div>
    <div class="btn_area flex_row_c_c">
      <button class="gradient_blue" @click="enrollBtn">{{$t('connectExc.connectBtn')}}</button>
    </div>
    <div>
      <ul class="flex_row_c_c">
        <li class="flex_row_c_c">
          <p>{{ exchange.name }} {{$t('connectExc.PCConnectGuide')}}</p>
          <button>
            <img src="@/assets/image/download_icon.png" alt="download" />
          </button>
          <button>
            <img src="@/assets/image/youtube_icon.png" alt="youtube" />
          </button>
        </li>
        <li class="flex_row_c_c">
          <p>{{ exchange.name }} {{$t('connectExc.UIDCheckGuide')}}</p>
          <a href="/pdf/toobit/mo/toobit_mo_CN.pdf" download="toobit.pdf"><img src="@/assets/image/download_icon.png" alt="download" /></a>
          <button>
            <img src="@/assets/image/youtube_icon.png" alt="youtube" />
          </button>
        </li>
      </ul>
    </div>
  </div>
  <ModalMsg v-if="modalState" :msg="msgCode" />
</template>

<script setup>
import { computed } from "vue";
import ModalMsg from "@/components/modal/ModalMsg.vue";
import { useStore } from "vuex";
import { useRouter } from "vue-router";
// import axios from "axios";
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
// const session_id = computed(() => {
//   return store.state.referral.session_id;
// });
// const retri_id = computed(() => {
//   return store.state.referral.retri_id;
// });
let msgCode = "msgCode0"; //입력하지않았을 때
let userUid = "";
const checkNumber = (e) => {
  userUid = e.target.value;
};
const enrollBtn = async () => {
  store.commit("referral/setUId", userUid);
  await store.dispatch("referral/postUid");
  store.commit("referral/changeModalState", true);
  msgCode = `msgCode0${uidState.value}`;
  //msg code 1 = 승인대기, 2 = 승인완료, 3 =승인실패
};
if (Object.keys(exchange.value).length === 0) {
  router.push("/payback");
}
const createdFn = async () => {
  await store.dispatch("referral/postCheckLogin");
  // if (!session_id.value || !retri_id.value) {
  //   router.push("/404");
  // }
};
// const downloadPDF = async () => {
//   try {
//     const response = await axios.get("/api/download", {
//       responseType: "blob",
//     });

//     const url = window.URL.createObjectURL(new Blob([response.data]));
//     const link = document.createElement("a");
//     link.href = url;
//     link.setAttribute("download", "file.pdf");
//     document.body.appendChild(link);
//     link.click();
//   } catch (error) {
//     console.error(error);
//   }
// };
store.watch((state) => {
  if (state.referral.setting) {
    createdFn();
  }
}, createdFn);
</script>
