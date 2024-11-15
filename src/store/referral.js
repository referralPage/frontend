import api from "@/api/apiReferral";
import { autoLeftPad } from "@/utils/common";
import { changeLang } from "@/utils/language.js";
import i18n from '@/i18n/index';

export default {
  namespaced: true,
  state() {
    return {
      isMobile : false,
      modalState: false,
      exchange: {},
      exchangeFlag: "",
      retri_id: "",
      session_id: "",
      uid: "",
      calenderDate: "",
      totalPages: 1,
      page: 1,
      per_page: 6,
      start_date: "",
      end_date: "",
      listLoading: false,
      isNotReferral: false,
      status: "",
      region_code: "",
      loginStatus: 200,
      setting: false,
      isPostLoading : false,
      // res
      uidState: "",
      calenderInfo: [],
      monthlyInfo: {},
      profitInfo: {},
      profitWeekInfo : {},
      paybackList: [],
      postStatus : 1,
      loadCheck: false,
    };
  },
  mutations: {
    setIsMobile(state,payload){
      state.isMobile = payload;
    },
    changeModalState(state, payload) {
      state.modalState = payload;
      const body = document.querySelector("body");
      if (state.modalState === true) {
        body.style.overflow = "hidden";
      } else {
        body.style.overflow = "auto";
      }
    },
    selectExchange(state, payload) {
      state.exchange = {
        name: payload.name,
        logo: payload.logo,
        videoKR: payload.videoKR,
        videoEN: payload.videoEN,
        videoVN: payload.videoVN,
        videoCN: payload.videoCN,
        videoJP: payload.videoJP,
      };
    },
    setExchangeFlag(state) {
      switch (state.exchange.name) {
        case "OKX":
          state.exchangeFlag = 1;
          break;
        case "BingX":
          state.exchangeFlag = 2;
          break;
        case "Toobit":
          state.exchangeFlag = 3;
          break;
        case "Deepcoin":
          state.exchangeFlag = 4;
          break;
      }
    },
    setUId(state, payload) {
      state.uid = payload;
    },
    setCalenderDate(state, payload) {
      state.calenderDate = `${payload.year}${autoLeftPad(payload.month, 2)}`;
    },
    setReportDate(state, payload) {
      state.start_date = payload.start_date;
      state.end_date = payload.end_date;
    },
    setPage(state, str) {
      if (str == "prev") {
        state.page--;
      } else if (str == "next") {
        state.page++;
      } else {
        state.page = 1;
      }
    },
    initSetting(state, payload) {
      state.setting = payload;
    },
    setLanugage(state,payload){
      state.region_code = payload;
    }
  },
  actions: {
    async getCheckApproval(context) {
      try {
        let retri_id = context.state.retri_id;
        let exchange = context.state.exchangeFlag;
        let response = await api.getCheckApprovalApi(retri_id,exchange);
        context.state.postStatus = response.status;
      } catch (error) {
        return;
      }
    },
    async postUid(context) {
      try {
        if(context.state.isPostLoading == false){
          context.state.isPostLoading = true;
          let info = {
            retri_id: context.state.retri_id,
            UID: context.state.uid,
            exchange: context.state.exchangeFlag,
            datetime: new Date().toISOString(),
          };
          let response = await api.postUidApi(info);
          if(response.reCode === 0){
            context.state.uidState = 1; // msg 신청완료
          } else if (response.reCode === 1){ 
            context.state.uidState = 4; // msg 중복
          } else if (response.reCode === 2){
            context.state.uidState = ""; // msg 유효하지않는 uid
          } else if (response.reCode === 3){
            context.state.uidState = 3; // msg 등록실패
          }
          context.state.isPostLoading = false;
        }
        
      } catch (error) {
        return;
      }
    },
    async getMonthlyProfit(context) {
      try {
        let retri_id = context.state.retri_id;
        let response = await api.getMonthlyProfitApi(retri_id);
        if (response.status === 200) {
          context.state.monthlyInfo = response.data;
          context.state.monthlyInfo.monthly_data =
            response.data.monthly_data.reverse();
        }
      } catch (error) {
        context.state.monthlyInfo = {
          total_accumulated_profit: 0,
          monthly_data: [
            {
              total_profit: 0,
              month: "0000",
            },
          ],
        };
        return;
      }
    },
    async getCalendar(context) {
      try {
        let retri_id = context.state.retri_id;
        let year_month = context.state.calenderDate;
        let response = await api.getCalendarApi(retri_id, year_month);
        context.state.calenderInfo = response.result;
      } catch (error) {
        return;
      }
    },
    async getProfit(context) {
      try {
        let retri_id = context.state.retri_id;
        let response = await api.getProfitApi(retri_id);
        if (response.status === 500) {
          context.state.isNotReferral = true;
        } else {
          context.state.profitInfo = response.result[0];
        }
      } catch (error) {
        return;
      }
    },
    async getProfitWeekly(context) {
      try {
        let retri_id = context.state.retri_id;
        let response = await api.getProfitWeeklyApi(retri_id);
        if (response.status === 500) {
          context.state.isNotReferral = true;
        } else {
          context.state.profitWeekInfo = response.result[0];
        }
      } catch (error) {
        return;
      }
    },
    async getPaybackReport(context) {
      try {
        context.state.listLoading = true;
        let info = {
          retri_id: context.state.retri_id,
          page: context.state.page,
          per_page: context.state.per_page,
          start_date: context.state.start_date,
          end_date: context.state.end_date,
        };
        let response = await api.getPaybackReportApi(info);
        context.state.paybackList = response.result;
        context.state.totalPages = response.pagination.total_pages;
        setTimeout(() => {
          context.state.listLoading = false;
        }, 200);
      } catch (error) {
        return;
      }
    },
    async getLoadUser(context) {
      try {
        let response = await api.getLoadUserApi();
        // let response = {
        //   "result": {
        //     "user_id": "retri60",
        //     // "retri_id": "25576",
        //     // "retri_id": "23915",
        //     "retri_id": "28629",
        //     // "retri_id": "24621",
        //     "session_id": "882288638",
        //     "na_code": "KR"
        //   }
        // }
        context.state.region_code = response.result.na_code;
        context.state.session_id = response.result.session_id;
        context.state.retri_id = response.result.retri_id;
        let load = context.state.loadCheck
        // 이전 접속 링크에 ref.tryex.xyz 가 포함되어 있지 않으면 로컬 스토리지에 설정
        if (!document.referrer.includes('ref.tryex.xyz')) {
          // if (!document.referrer.includes('local')) {
          let lang = changeLang(context.state.region_code)
          localStorage.setItem("localeLangDisplayed", context.state.region_code);
          localStorage.setItem("localeLang", lang);
          i18n.locale = lang;
          load = true;
          if (load) {
            location.reload();
            load = false;
          }
        }
      } catch (error) {
        return;
      }
    },
    async postCheckLogin(context) {
      try {
        let response = await api.getCheckLoginApi();
        context.state.loginStatus = response.status;
        // context
      } catch (error) {
        return;
      }
    },
  },
};
