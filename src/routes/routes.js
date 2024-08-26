import PaybackView from "@/components/referral/ReferralPayback.vue";
import ApplyView from "@/components/referral/ReferralSubscript.vue";
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
    path: "/apply",
    name: "ApplyView",
    component: ApplyView,
    props: true,
  },
  {
    path: "/mypage",
    name: "MypageView",
    component: MypageView,
    props: true,
  },
  { path: "/:pathMatch(.*)*", redirect: "/payback" },
];

export default routes;