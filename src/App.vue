<script setup lang="ts">
import { onMounted, ref } from "vue";
import { currency } from "./currency";
import { dailiApi } from "./servers/daili-api";
import DropDown from "./components/DropDown.vue";

const first = ref();
const firstCurr = ref("TJS");
const second = ref();
const secondCurr = ref("USD");
const conversionInfo = ref({ Valute: ref() });

onMounted(async () => {
  const response = await dailiApi.getCurrency();
  conversionInfo.value = response;
  setInterval(async () => {
    const response = await dailiApi.getCurrency();
    conversionInfo.value = response;
  }, 1000);
});

function handleOnPage(ConversionToSec: boolean) {
  let secCurrency, secCurr, frCurrency, firCurr;

  if (secondCurr.value != "RUS") {
    secCurrency = conversionInfo.value.Valute[secondCurr.value];
    secCurr = secCurrency.Nominal / secCurrency.Value;
  } else secCurr = 1;
  if (firstCurr.value != "RUS") {
    frCurrency = conversionInfo.value.Valute[firstCurr.value];
    firCurr = frCurrency.Nominal / frCurrency.Value;
  } else firCurr = 1;

  let answer = secCurr / firCurr;

  if (ConversionToSec) {
    answer = (1 / answer) * second.value;
    first.value = +answer.toFixed(2);
    return;
  }
  answer *= first.value;
  if (Number.isNaN(answer)) answer = 0;

  second.value = +answer.toFixed(2);
}
</script>

<template>
  <div class="justify-center flex h-screen">
    <img
      src="./assets/Image-061120-sl-scaled.jpg"
      class="h-full w-full absolute"
    />
    <div
      class="w-96 min-w-min rounded-lg bg-white/40 border-cyan-600 border-2 justify-center pt-5 px-5 backdrop-opacity-10 z-10 my-auto max-sm:w-11/12"
    >
      <div class="text-black">
        <p class="text-3xl font-medium dark:text-white mx-3 text-center">
          International Currency Converter
        </p>
      </div>
      <div class="mt-8">
        <p class="font-bold text-black text-center">
          Exchange Rate: {{ first || 0 }} {{ firstCurr }} = {{ second || 0 }}
          {{ secondCurr }}
        </p>
        <div class="mt-5 text-center">
          <div class="flex justify-center">
            <input
              class="rounded-lg w-24 max-h-60 text-center mt-1"
              v-model.number="first"
              @input="handleOnPage(false)"
              placeholder="0"
            />
            <div class="w-24 ml-3">
              <DropDown v-model="firstCurr" @update="handleOnPage(false)" />
            </div>
          </div>
          <div class="flex justify-center mt-3">
            <input
              class="rounded-lg w-24 max-h-60 text-center mt-1"
              v-model.number="second"
              @input="handleOnPage(true)"
              placeholder="0"
            />
            <div class="w-24 ml-3">
              <div class="relative mt-1">
                <DropDown v-model="secondCurr" @update="handleOnPage(false)" />
              </div>
            </div>
          </div>
        </div>
        <p class="text-black my-4 text-center">
          Please Input Amount To Convert
        </p>
      </div>
    </div>
  </div>
</template>
