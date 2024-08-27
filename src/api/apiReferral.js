import { API } from "./apiAuth";

// uid 등록 api
const postUidApi = async (info) => {
  try {
    const response = await API.post("main", info);
    return response.data;
  } catch (error) {
    if (error.response.status === 500) {
      return error.response;
    }
    return;
  }
};
// 최근 5개월 페이백 및 총 적립 페이백 API api
const getMonthlyProfitApi = async (retri_id) => {
  try {
    const response = await API.get(`monthly-profit?retri_id=${retri_id}`);
    return response.data;
  } catch (error) {
    return;
  }
};
// 페이백 캘린더 api
const getCalendarApi = async (retri_id, year_month) => {
  try {
    const response = await API.get(
      `calendar?retri_id=${retri_id}&year_month=${year_month}`
    );
    return response.data;
  } catch (error) {
    return;
  }
};
// 이번달 나의 예상 페이백 api
const getProfitApi = async (retri_id) => {
  try {
    const response = await API.get(`profit?retri_id=${retri_id}`);
    return response.data;
  } catch (error) {
    if(error.response.status === 500){
      return error.response;
    }
    return;
  }
};
// 페이백 내역 api
const getPaybackReportApi = async (info, type) => {
  try {
    if (type == "all") {
      const response = await API.get(
        `payment-report?retri_id=${info.retri_id}&page=${info.page}&per_page=${info.per_page}`
      );
      return response.data;
    } else {
      const response = await API.get(
        `payment-report?retri_id=${info.retri_id}&page=${info.page}&per_page=${info.per_page}&start_date=${info.start_date}&end_date=${info.end_date}`
      );
      return response.data;
    }
  } catch (error) {
    // console.log(error);
    return;
  }
};
// 월말결산 조회 api
const getMonthProfitApi = async () => {
  try {
    const response = await API.get(`month-profit`);
    return response.data;
  } catch (error) {
    // console.log(error);
    return;
  }
};

export default {
  postUidApi,
  getMonthlyProfitApi,
  getCalendarApi,
  getProfitApi,
  getPaybackReportApi,
  getMonthProfitApi,
};
