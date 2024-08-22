import PaybackView from "@/components/referral/ReferralPayback.vue";
import MypageView from "@/components/referral/ReferralMypage.vue";

const routes = [
  { path: "/", redirect: "/payback" },
  {
    path: "/payback",
    name: "PaybackView",
    component: PaybackView,
    props: true,
  },
  {
    path: "/mypage",
    name: "MypageView",
    component: MypageView,
    props: true,
  },
];

export default routes;