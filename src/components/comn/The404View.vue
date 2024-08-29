<template>
  <div class="und_wrap">
    <p>{{ $t("noAccess['msg01']") }}</p>
    <p><span class="warning_txt">{{ $t("noAccess['msg02']") }}</span></p>
    <p>{{ $t("noAccess['msg03']") }}</p>
    <button class="gradient_blue" @click="confirmBtn">{{$t("common['confirm']")}}</button>
  </div>
</template>

<script setup>
const confirmBtn = () => {
  const screenWidth = window.innerWidth;
  if (screenWidth < 640) {
    location.href = "https://www.retri.io/m/";
  } else {
    location.href = "https://retri.io";
  }
}

</script>
