<template>
    <div>
        <PaybackMain v-if="!state" @receive-exchange="receiveExchange"/>
        <PaybackReceive v-if="state" :exchange = exchange />
    </div>
</template>

<script setup>
import PaybackMain from "@/components/referral/sub/PaybackMain.vue";
import { ref } from "vue";
import PaybackReceive from "@/components/referral/sub/PaybackReceive.vue";
let exchange  = ref(null);
let state = ref(false);
const receiveExchange = (ex,boolean) =>{
    exchange.value = ex;
    state.value = boolean;
}

</script>

<style lang="scss" scoped>

</style>