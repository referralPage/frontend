import { API } from "./apiAuth";
let whileFetching = false;
let abortController;
// 승인 대기 상태 확인 api
const getCheckApprovalApi = async (retri_id, exchange) => {
  try {
    const response = await API.get(
      `check-approval?retri_id=${retri_id}&exchange=${exchange}`
    );
    return response.data;
  } catch (error) {
    return;
  }
};
// uid 등록 api
const postUidApi = async (info) => {
  try {
    if (whileFetching) abortController.abort();
    abortController = new AbortController();
    const signal = abortController.signal;
    whileFetching = true;
    const response = await API.post("main", info,{ signal });
    whileFetching = false;
    return response.data;
  } catch (error) {
    if (error.response.status === 500) {
      return error.response.data;
    }
    return;
  }
};
// 최근 5개월 페이백 및 총 적립 페이백 API api  / candle date
const getMonthlyProfitApi = async (retri_id) => {
  try {
    const response = await API.get(`monthly-profit?retri_id=${retri_id}`);
    return response;
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
    if (error.response.status === 500) {
      return error.response;
    }
    return;
  }
};
// 이번주 나의 예상 페이백 api
const getProfitWeeklyApi = async (retri_id) => {
  try {
    const response = await API.get(`week_profit?retri_id=${retri_id}`);
    return response.data;
  } catch (error) {
    if (error.response.status === 500) {
      return error.response;
    }
    return;
  }
};
// 페이백 내역 api
const getPaybackReportApi = async (info) => {
  try {
    const response = await API.get(
      `payment-report?retri_id=${info.retri_id}&page=${info.page}&per_page=${info.per_page}&start_date=${info.start_date}&end_date=${info.end_date}`
    );
    return response.data;
  } catch (error) {
    return;
  }
};
// 월말결산 조회 api
const getMonthProfitApi = async () => {
  try {
    const response = await API.get(`month-profit`);
    return response.data;
  } catch (error) {
    return;
  }
};

// 로그인 한 유저 정보 조회 api
const getLoadUserApi = async () => {
  try {
    const response = await API.get("load_user");
    return response.data;
  } catch (error) {
    return;
  }
};

// 중복 로그인 확인 api
const getCheckLoginApi = async () => {
  try {
    const response = await API.get("check_login");
    return response;
  } catch (error) {
    if (error.response.status === 409) {
      return error.response;
    }
    return;
  }
};

export default {
  getCheckApprovalApi,
  postUidApi,
  getMonthlyProfitApi,
  getCalendarApi,
  getProfitApi,
  getProfitWeeklyApi,
  getPaybackReportApi,
  getMonthProfitApi,
  getLoadUserApi,
  getCheckLoginApi,
};
