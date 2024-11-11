<template>
  <div class="und_wrap">
    <p>{{ $t("noAccess['msg01']") }}</p>
    <p><span class="warning_txt">{{ $t("noAccess['msg02']") }}</span></p>
    <p>{{ $t("noAccess['msg03']") }}</p>
    <button class="bg_color_main" @click="confirmBtn">{{$t("common['confirm']")}}</button>
  </div>
</template>

<script setup>
const confirmBtn = () => {
  const screenWidth = window.innerWidth;
  if (screenWidth < 640) {
    location.href = "https://www.tryex.io//m/";
  } else {
    location.href = "https://www.tryex.io/";
  }
}

</script>
