// 공통 함수
import { setTimeZone } from "@/utils/timezone.js";

//local시간을  utc로 변경
export const localeToUTC = (country) => {
  const date = new Date();
  const offset = date.getTimezoneOffset() * 60 * 1000;
  const utcDate = new Date(date.getTime() + offset);
  const nowDate = setTimeZone(utcDate, country); //선택한 언어탭 날짜로 변경예정
  nowDate.split(":")[1] = "00";
  let formatDate = `${nowDate.split(":")[0]}:00`;
  return formatDate;
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
    // if (Number(num) > 0 || String(num).charAt(0) != '-') return "txt_plus";
    // else if (Number(num) < 0 || String(num).charAt(0) == '-') return "txt_minus";
    // else return "txt_zero";
  }
};
//숫자 + =
export const numSign = (num, digit, type) => {
  if (num) {
    if (digit == 0 || digit) {
      num = String(Number(Number(num).toFixed(digit)).toLocaleString());
    }
    if(type){
      if (String(num).charAt(0) != "-" && num != 0) return `+$${num}`;
      else return `-$${num.split("-")[1]}`;
    }
    if (String(num).charAt(0) != "-" && num != 0) return `+${num}`;
    else return num;
  } else{
    return 0;
  }
};

//숫자 ,(콤마) , 소수점
export const formatNum = (num, digit) => {
  if (num) {
    num = Number(Number(num).toFixed(digit)).toLocaleString();
    return num;
  } else {
    return 0;
  }
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