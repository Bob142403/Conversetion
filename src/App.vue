<script setup lang="ts">
import { onMounted, ref } from "vue";
import { currency } from "./currency";
import { dailiApi } from "./servers/daili-api";

const first = ref();
const firstCurr = ref("TJS");
const second = ref();
const secondCurr = ref("USD");
const conversionInfo = ref({ Valute: ref() });

onMounted(() => {
  setInterval(async () => {
    const response = await dailiApi.getCurrency();
    conversionInfo.value = response;
  }, 1000);
});

function handleOnPage(ConversionToSec: boolean) {
  const secCurrency = conversionInfo.value.Valute[secondCurr.value];
  const secCurr = secCurrency.Nominal / secCurrency.Value;

  const frCurrency = conversionInfo.value.Valute[firstCurr.value];
  const firCurr = frCurrency.Nominal / frCurrency.Value;

  let answer = secCurr / firCurr;

  if (ConversionToSec) {
    answer = (1 / answer) * second.value;
    first.value = +answer.toFixed(2);
    return;
  }
  answer *= first.value;

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
      class="min-w-min w-1/3 rounded-lg bg-white/20 border-cyan-600 border-2 justify-center pt-5 px-5 backdrop-opacity-10 z-10 my-auto"
    >
      <div class="text-white">
        <p class="text-3xl font-medium dark:text-white mx-3 text-center">
          International Currency Converter
        </p>
      </div>
      <div class="mt-8 text-center">
        <p class="font-bold text-white">
          Exchange Rate: {{ first || 0 }} {{ firstCurr }} = {{ second || 0 }}
          {{ secondCurr }}
        </p>
        <div class="mt-5">
          <div>
            <input
              class="rounded-lg w-24 h-9 text-center"
              v-model.number="first"
              @input="handleOnPage(false)"
              placeholder="0"
            />
            <select
              id="countries_disabled"
              v-model="firstCurr"
              @change="handleOnPage(false)"
              class="ml-2 rounded-lg h-9 z-10 flex-shrink-0 inline-flex items-center bg-gray-50 border border-gray-300 text-gray-900 text-sm focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            >
              <option
                v-for="(val, key) in currency"
                :key="key"
                :value="val"
                class="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
              >
                {{ val }}
              </option>
            </select>
          </div>
          <div class="mt-2">
            <input
              class="rounded-lg w-24 h-9 text-center"
              v-model.number="second"
              @input="handleOnPage(true)"
              placeholder="0"
            />
            <select
              id="countries_disabled"
              v-model="secondCurr"
              @change="handleOnPage(false)"
              class="ml-2 rounded-lg h-9 z-10 flex-shrink-0 inline-flex items-center bg-gray-50 border border-gray-300 text-gray-900 text-sm focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            >
              <option
                v-for="(val, key) in currency"
                :key="key"
                :value="val"
                class="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
              >
                <!-- <img
                  v-if="val[0] + val[1] !== 'EU' && val[0] + val[1] !== 'XD'"
                  :src="`https://flagsapi.com/${val[0] + val[1]}/flat/64.png`"
                  class="w-3 h-3"
                /> -->
                {{ val }}
              </option>
            </select>
          </div>
        </div>
        <p class="text-white my-4">Please Input Amount To Convert</p>
      </div>
    </div>
  </div>
</template>
