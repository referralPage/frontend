<template>
  <div class="table_area">
    <table class="pf_calendar_table">
      <thead>
        <tr>
          <th>S</th>
          <th>M</th>
          <th>T</th>
          <th>W</th>
          <th>T</th>
          <th>F</th>
          <th>S</th>
        </tr>
      </thead>
      <tbody></tbody>
    </table>
  </div>
</template>

<script setup>
import { autoLeftPad, numSign } from "@/utils/common";
import { computed, onMounted, watch } from "vue";
import { useStore } from "vuex";
const store = useStore();
const props = defineProps({
  select: { type: Object },
});
const calenderInfo = computed(() => {
  return store.state.referral.calenderInfo;
});
async function buildCalendar() {
  let doMonth = new Date(props.select.year, props.select.month - 1, 1);
  let lastDate = new Date(props.select.year, props.select.month, 0);
  let tbCalendar = document.querySelector(".pf_calendar_table > tbody");
  await store.dispatch("referral/getCalendar");
  while (tbCalendar.rows.length > 0) {
    tbCalendar.deleteRow(tbCalendar.rows.length - 1);
  }
  let row = tbCalendar.insertRow();
  let dom = 1;
  let daysLength =
    Math.ceil((doMonth.getDay() + lastDate.getDate()) / 7) * 7 - doMonth.getDay();
  // 달력 출력
  for (let day = 1 - doMonth.getDay(); daysLength >= day; day++) {
    let column = row.insertCell();
    // 날짜 데이터 삽입
    if (Math.sign(day) == 1 && lastDate.getDate() >= day) {
      let selectDate = `${doMonth.getFullYear()}-${autoLeftPad(
        doMonth.getMonth() + 1,
        2
      )}-${autoLeftPad(day, 2)}`;
      column.innerText = autoLeftPad(day, 2);
      const calenderData = calenderInfo.value.find((obj) => obj.date === selectDate);
      let data = document.createElement("em");
      if (calenderData || calenderData?.total_profit == 0) {
        if (String(calenderData?.total_profit).charAt(0) == "-") {
          data.classList.add("txt_zero");
        } else if (calenderData?.total_profit == 0) {
          data.classList.add("txt_zero");
        } else {
          data.classList.add("txt_main");
          calenderData.total_profit = numSign(calenderData.total_profit, 4);
        }
        data.textContent = `${calenderData?.total_profit}`;
      } else {
        data.textContent = "-";
        data.classList.add("txt_gray");
      }
      column.appendChild(data);
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
    dom++;
  }
}
onMounted(() => {
  store.commit("referral/setCalenderDate", props.select);
  buildCalendar();
});
watch(props.select, () => {
  store.commit("referral/setCalenderDate", props.select);
  buildCalendar();
});
</script>

<style lang="scss" scoped></style>
