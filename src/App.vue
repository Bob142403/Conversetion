<script setup lang="ts">
import { onMounted, ref } from "vue";
import { currency } from "./currency";
import { dailiApi } from "./servers/daili-api";

const first = ref(0);
const firstCurr = ref("TJS");
const second = ref(0);
const secondCurr = ref("USD");
const conversionInfo = ref({ Valute: ref() });

onMounted(() => {
  setInterval(async () => {
    const response = await dailiApi.getCurrency();
    conversionInfo.value = response;
  }, 10);
});

function handleOnPage(ConversionToSec: boolean) {
  const secCurrency = conversionInfo.value.Valute[secondCurr.value];
  const secCurr = secCurrency.Nominal / secCurrency.Value;

  const frCurrency = conversionInfo.value.Valute[firstCurr.value];
  const firCurr = frCurrency.Nominal / frCurrency.Value;

  let answer = secCurr / firCurr;

  if (ConversionToSec) {
    answer = (1 / answer) * second.value;
    first.value = answer;
    return;
  }
  answer *= first.value;

  second.value = answer;
}
</script>

<template>
  <div class="mt-4 flex">
    <div class="flex mx-auto">
      <select
        id="countries_disabled"
        v-model="firstCurr"
        @change="handleOnPage(false)"
        class="rounded-l-lg z-10 flex-shrink-0 inline-flex items-center bg-gray-50 border border-gray-300 text-gray-900 text-sm focus:ring-blue-500 focus:border-blue-500 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
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
      <div class="relative">
        <input
          v-model.number="first"
          @input="handleOnPage(false)"
          id="search-dropdown"
          class="block p-2.5 w-full z-20 text-sm text-gray-900 bg-gray-50 rounded-r-lg border-l-gray-100 border-l-2 border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:border-blue-500"
          placeholder="Search"
          required
        />
      </div>
    </div>

    <div class="flex mx-auto">
      <select
        v-model="secondCurr"
        @change="handleOnPage(false)"
        class="rounded-l-lg z-10 flex-shrink-0 inline-flex items-center bg-gray-50 border border-gray-300 text-gray-900 text-sm focus:ring-blue-500 focus:border-blue-500 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
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
      <div class="relative">
        <input
          v-model.number="second"
          @input="handleOnPage(true)"
          class="block p-2.5 w-full z-20 text-sm text-gray-900 bg-gray-50 rounded-r-lg border-l-gray-100 border-l-2 border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:border-blue-500"
          placeholder="Search"
          required
        />
      </div>
    </div>
  </div>
</template>
