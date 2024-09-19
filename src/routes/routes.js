import PaybackView from "@/components/referral/ReferralPayback.vue";
import ApplyView from "@/components/referral/ReferralSubscript.vue";
import The404View from "@/components/comn/The404View.vue";
// import MypageView from "@/components/referral/ReferralMypage.vue";

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
    path: "/404",
    name: "The404View",
    component: The404View,
    props: true,
  },
  // {
  //   path: "/mypage",
  //   name: "MypageView",
  //   component: MypageView,
  //   props: true,
  // },
  { path: "/:pathMatch(.*)*", redirect: "/404" },
];
export default routes;