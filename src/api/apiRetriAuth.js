import { API } from "./apiAuth";

// 리트리 인증 api
const postRetriAuthApi = async () => {
    try {
      const response = await API.post("retri_auth");
      return response;
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
const postCheckLoginApi = async (info) => {
    try {
      const response = await API.post("check_login",info);
      return response;
    } catch (error) {
        if(error.response.status === 409){
            return error.response;
        }
      return;
    }
};

export default {
    postRetriAuthApi,
    getLoadUserApi,
    postCheckLoginApi,
  };
  