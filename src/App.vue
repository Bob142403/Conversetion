<script setup lang="ts">
import { onMounted, ref } from "vue";
import { valute } from "./valute";

const first = ref(0);
const first_curs = ref("TJS");
const second = ref(0);
const second_curs = ref("USD");
const qwe = ref({});

onMounted(() => {
  setInterval(async () => {
    const baseURL = "https://www.cbr-xml-daily.ru/daily_json.js";
    const result = await fetch(baseURL);
    const res = await result.json();
    qwe.value = res;
  }, 10);
});

function convertSToF() {
  const sc =
    (qwe.value.Valute[second_curs.value].Value * second.value) /
    qwe.value.Valute[second_curs.value].Nominal;
  const fr =
    qwe.value.Valute[first_curs.value].Nominal /
    qwe.value.Valute[first_curs.value].Value;
  first.value = fr * sc;
}

function convertFToS() {
  const sc =
    qwe.value.Valute[second_curs.value].Nominal /
    qwe.value.Valute[second_curs.value].Value;
  const fr =
    (qwe.value.Valute[first_curs.value].Value * first.value) /
    qwe.value.Valute[first_curs.value].Nominal;
  second.value = fr * sc;
}
</script>

<template>
  <div class="mt-4 flex">
    <div class="flex mx-auto">
      <select
        id="countries_disabled"
        v-model="first_curs"
        @change="convertFToS"
        class="rounded-l-lg z-10 flex-shrink-0 inline-flex items-center bg-gray-50 border border-gray-300 text-gray-900 text-sm focus:ring-blue-500 focus:border-blue-500 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
      >
        <option
          v-for="(val, key) in valute"
          :key="key"
          :value="val"
          class="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
        >
          {{ val }}
        </option>
      </select>
      <div class="relative">
        <input
          v-model="first"
          @input="convertFToS"
          type="number"
          id="search-dropdown"
          class="block p-2.5 w-full z-20 text-sm text-gray-900 bg-gray-50 rounded-r-lg border-l-gray-100 border-l-2 border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:border-blue-500"
          placeholder="Search"
          required
        />
      </div>
    </div>

    <div class="flex mx-auto">
      <select
        v-model="second_curs"
        @change="convertFToS"
        class="rounded-l-lg z-10 flex-shrink-0 inline-flex items-center bg-gray-50 border border-gray-300 text-gray-900 text-sm focus:ring-blue-500 focus:border-blue-500 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
      >
        <option
          v-for="(val, key) in valute"
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
          @input="convertSToF"
          class="block p-2.5 w-full z-20 text-sm text-gray-900 bg-gray-50 rounded-r-lg border-l-gray-100 border-l-2 border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:border-blue-500"
          placeholder="Search"
          required
        />
      </div>
    </div>
  </div>
</template>
