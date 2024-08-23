import { API } from "./apiAuth";

// uid 등록 api
const postUid = async (info) => {
    try {
      const response = await API.post("main", info);
      return response.data;
    } catch (error) {
      return;
    }
};
// 이번달 나의 예상 페이백 api
const getProfit = async (retri_id) => {
    try {
      const response = await API.get(`profit?retri_id=${retri_id}`);
      return response.data;
    } catch (error) {
      return;
    }
};
// 페이백 캘린더 api
const getCalendar = async (retri_id,year_month) => {
    try {
      const response = await API.get(`profit?retri_id=${retri_id}&year_month=${year_month}`);
      return response.data;
    } catch (error) {
      return;
    }
};
// 최근 5개월 페이백 및 총 적립 페이백 API api
const getMonthlyProfit = async (retri_id,year_month) => {
    try {
      const response = await API.get(`monthly-profit?retri_id=${retri_id}`);
      return response.data;
    } catch (error) {
      return;
    }
};

// 월말결산 조회 api
const getMonthProfit = async (retri_id,year_month) => {
    try {
      const response = await API.get(`month-profit`);
      return response.data;
    } catch (error) {
      return;
    }
};

export default {
    postUid,
    getProfit,
    getCalendar,
    getMonthlyProfit,
    getMonthProfit,
}