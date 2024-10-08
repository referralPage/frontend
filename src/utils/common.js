// 공통 함수
import { setTimeZone } from "@/utils/timezone.js";
import moment from "moment";

//표준시간대 상관없이 현지시간으로 변경
export const localeToUTCNow = (country) => {
  const date = moment().utc().toDate(); //표준 시간 -> utc 시간으로 변경
  let localeTime = moment.utc(date).toDate();
  localeTime = moment(localeTime).format("YYYY/MM/DD HH:mm:ss");
  const nowDate = setTimeZone(localeTime, country, 0);
  if (!nowDate) {
    throw new Error("Invalid time zone or date.");
  }
  return nowDate;
};
//kst -> utc -> locale
export const kstToLocale = (localeTime) => {
  let date = moment(localeTime + "Z")
    .subtract(9, "hours")
    .format("YYYY/MM/DD HH:mm:ss"); //kst-> utc
  const locale = navigator.language.split("-")[1] || "US";
  const localeDate = setTimeZone(date, locale); // UTC to locale
  if (!localeDate) {
    throw new Error("Invalid time zone or date.");
  }
  return localeDate.split(" ")[0]; // 날짜 부분 반환
};

//type = year 1년 전, type = month 한달 전
export const preDate = (selectDate, type) => {
  let result = new Date(selectDate);
  if (type == "year") {
    result.setFullYear(result.getFullYear() - 1);
  } else if (type == "month") {
    result.setMonth(result.getMonth() - 1);
  }
  return result;
};

/**
 * 월,일 등 숫자 앞에 0 붙이기
 * @param   num     앞에 0을 붙일 숫자 값
 * @param   digit   글자의 자릿수를 지정 ( 2자릿수인 경우 00, 3자릿수인 경우 000 … )
 */
export const autoLeftPad = (num, digit) => {
  if (String(num).length < digit) {
    num = new Array(digit - String(num).length + 1).join("0") + num;
  }
  return num;
};

//숫자 class
export const numChkClass = (num) => {
  if (num) {
    if (Number(num) > 0) return "txt_plus";
    else if (Number(num) < 0) return "txt_minus";
    else return "txt_zero";
  }
};
//숫자 + =
export const numSign = (num, digit, type) => {
  if (num) {
    if (digit == 0 || digit) {
      const number = Number(num);
      const factor = Math.pow(10, digit);
      const floored = Math.floor(number * factor) / factor;
      num = String(
        floored.toLocaleString("ko-KR", { maximumFractionDigits: digit })
      );
    }
    if (type) {
      if (String(num).charAt(0) != "-" && num != 0) return `+$${num}`;
      else return `-$${num.split("-")[1]}`;
    }
    if (String(num).charAt(0) != "-" && num != 0) return `+${num}`;
    else return num;
  } else {
    return 0;
  }
};

//숫자 ,(콤마) , 소수점 내림
export const formatNum = (num, digit) => {
  const number = Number(num);
  if (isNaN(number)) {
    return "0";
  }
  const factor = Math.pow(10, digit);
  const floored = Math.floor(number * factor) / factor;
  return floored.toLocaleString("ko-KR", { maximumFractionDigits: digit });
};

// paging
export function commonSetPage(page, str) {
  if (str == "prev") {
    page--;
  } else if (str == "next") {
    page++;
  } else {
    page = 1;
  }
  return page;
}

// T형식 분까지
export const formatTime = (datetime) => {
  let date = datetime.split("T")[0];
  let time = datetime.split("T")[1].slice(0, 5);
  return `${date} ${time}`;
};

// export const setIsMobile = () =>{
//   const screenWidth = window.innerWidth;
//    return screenWidth < 480;
// }
