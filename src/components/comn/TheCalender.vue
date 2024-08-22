<template>
  <table class="pf_calendar_table">
    <thead>
      <tr>
        <th>SUN</th>
        <th>MON</th>
        <th>TUE</th>
        <th>WED</th>
        <th>THU</th>
        <th>FRI</th>
        <th>SAT</th>
      </tr>
    </thead>
    <tbody></tbody>
  </table>
</template>

<script setup>
import { autoLeftPad } from '@/utils/common';
import { onMounted, watch } from 'vue';

const props = defineProps({
   select: {type : Object},
});
async function buildCalendar() {  
  let doMonth = new Date(props.select.year, props.select.month -1, 1);
  let lastDate = new Date(props.select.year, props.select.month, 0);
  let tbCalendar = document.querySelector(".pf_calendar_table > tbody");
//   await store.dispatch("userinfo/loadCalendar");
  while (tbCalendar.rows.length > 0) {
    tbCalendar.deleteRow(tbCalendar.rows.length - 1);
  }
  let row = tbCalendar.insertRow();
  let dom = 1;
  let daysLength =
    Math.ceil((doMonth.getDay() + lastDate.getDate()) / 7) * 7 -
    doMonth.getDay();
  // 달력 출력
  for (let day = 1 - doMonth.getDay(); daysLength >= day; day++) {
    let column = row.insertCell();
    // 날짜 데이터 삽입
    if (Math.sign(day) == 1 && lastDate.getDate() >= day) {
      //   let selectDate = `${doMonth.getFullYear()}-${autoLeftPad(
      //     doMonth.getMonth() + 1,
      //     2
      //   )}-${autoLeftPad(day, 2)}`;
      column.innerText = autoLeftPad(day, 2);
      let data = document.createElement("em");
      data.textContent = day;
      column.appendChild(data);
      //   if (calendar.value[selectDate] == 0 || calendar.value[selectDate]) {
      //     if (String(calendar.value[selectDate]).charAt(0) == "-") {
      //       data.classList.add("txt_minus");
      //       calendar.value[selectDate] = numSign(calendar.value[selectDate], 0);
      //     } else if (calendar.value[selectDate] == 0) {
      //       data.classList.add("txt_zero");
      //     } else {
      //       data.classList.add("txt_plus");
      //       calendar.value[selectDate] = numSign(calendar.value[selectDate], 0);
      //     }
      //     data.textContent = `${calendar.value[selectDate]}$`;
      //     column.appendChild(data);
      //   } else {
      //     data.textContent = "-";
      //     data.classList.add("dn");
      //     column.appendChild(data);
      //   }
      column.style.color = "#fff";
      //일요일
      if (dom % 7 == 1) {
        column.style.color = "#FF4D4D";
      }
      //토요일
      if (dom % 7 == 0) {
        column.style.color = "#4D4DFF";
        row = tbCalendar.insertRow();
      }
    }
    //현재 날짜
    // if (
    //   props.today.getFullYear() == nowDate.getFullYear() &&
    //   props.today.getMonth() == nowDate.getMonth() &&
    //   nowDate.getDate() == day
    // ) {
    //   column.style.backgroundColor = "#4D4DFF";

    // }
    dom++;
  }
}
onMounted(()=>{
    buildCalendar();
});
watch(props.select,()=>{
    buildCalendar();
});
</script>

<style lang="scss" scoped></style>
