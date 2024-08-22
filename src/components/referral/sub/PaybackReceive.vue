<template>
  <div class="recieve_wrap">
    <div class="payback_sub_title flex_row_c_c">
      <div class="flex_row_c_c">
        <img
          class="logo_s"
          :src="props.exchange.logo"
          :alt="`${props.exchange.name} 로고`"
        />
        <img
          class="logo_l"
          :src="props.exchange.text"
          :alt="props.exchange.name"
        />
      </div>
      <p>레퍼럴 페이백 신청</p>
      <button class="gradient_green">지금 가입하기</button>
    </div>
    <p class="warning_txt">
      ※ 반드시 사이트에 있는 레퍼럴 코드로 가입한 후 UID 입력해주시기 바랍니다 ※
      <br />
      (다른 링크나 코드로 가입 시 페이백이 이루어지지 않습니다.)
    </p>
    <div class="uid_area flex_row_c_c">
      <label for="userUid"
        >{{ props.exchange.name.toUpperCase() }} 거래소 본인 UID :
      </label>
      <input type="text" id="userUid" name="userUid" />
    </div>
    <div class="btn_area flex_row_c_c">
      <button class="gradient_blue" @click="enrollBtn">신청하기</button>
    </div>
    <div>
      <ul class="flex_row_c_c">
        <li class="flex_row_c_c">
          <p>{{ props.exchange.name.toUpperCase() }} 가입 방법</p>
          <button>
            <img src="@/assets/image/download_icon.png" alt="download" />
          </button>
          <button>
            <img src="@/assets/image/youtube_icon.png" alt="youtube" />
          </button>
        </li>
        <li class="flex_row_c_c">
          <p>{{ props.exchange.name.toUpperCase() }} UID 확인 방법</p>
          <button>
            <img src="@/assets/image/download_icon.png" alt="download" />
          </button>
          <button>
            <img src="@/assets/image/youtube_icon.png" alt="youtube" />
          </button>
        </li>
      </ul>
    </div>
  </div>
  <ModalMsg v-if="modalState" :msg = msgCode />
</template>

<script setup>
import { computed, defineProps } from "vue";
import ModalMsg from "@/components/modal/ModalMsg.vue";
import { useStore } from "vuex";
const store = useStore();
const props = defineProps({
  exchange: { type: Object },
});
const modalState = computed(()=>{
  return store.state.referral.modalState;
})
let msgCode = "";

const enrollBtn = () => {
  store.commit("referral/changeModalState",true);
  //msg code 1 =성공적으로 등록 code 2 = 이미 등록, 3 = 올바르지않은uid, 4 = 올바르지않은 레퍼럴코드 
  msgCode = "msgCode01"
  // msg = "이미 등록된 UID 입니다.";
  // msg = "올바르지 않은 UID 입니다";
  // msg = "성공적으로 등록되었습니다.";
  // msg = "올바른 레퍼럴코드로 가입되지 않은 UID 입니다. 탈퇴 후 올바른 레퍼럴 코드로 재 가입 해주시기 바랍니다";
}
</script>