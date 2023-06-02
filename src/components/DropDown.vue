<script setup lang="ts">
import { currency } from "../currency";
import { Dropdown, ListGroup, ListGroupItem } from "flowbite-vue";
import {
  Listbox,
  ListboxLabel,
  ListboxButton,
  ListboxOptions,
  ListboxOption,
} from "@headlessui/vue";
import { CheckIcon, ChevronUpDownIcon } from "@heroicons/vue/20/solid";

interface Props {
  modelValue: string;
}

defineProps<Props>();
defineEmits(["update:modelValue", "update"]);
</script>

<template>
  <Listbox
    :modelValue="modelValue"
    @update:modelValue="
      (newValue) => {
        $emit('update:modelValue', newValue);
        $emit('update');
      }
    "
  >
    <div class="relative mt-1">
      <ListboxButton
        class="relative w-28 cursor-default rounded-lg bg-white py-2 pl-3 pr-10 text-left shadow-md focus:outline-none focus-visible:border-indigo-500 focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75 focus-visible:ring-offset-2 focus-visible:ring-offset-orange-300 sm:text-sm"
      >
        <span class="truncate flex">
          <img
            :src="`https://flagcdn.com/20x15/${modelValue
              .slice(0, 2)
              .toLocaleLowerCase()}.png`"
            class="mr-2"
          />{{ modelValue }}</span
        >
        <span
          class="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2"
        >
          <ChevronUpDownIcon class="h-5 w-5 text-gray-400" aria-hidden="true" />
        </span>
      </ListboxButton>

      <transition
        leave-active-class="transition duration-100 ease-in"
        leave-from-class="opacity-100"
        leave-to-class="opacity-0"
      >
        <ListboxOptions
          class="z-50 absolute mt-1 max-h-60 w-28 overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm"
        >
          <ListboxOption
            v-slot="{ active, selected }"
            v-for="person in currency"
            :key="person"
            :value="person"
            as="template"
          >
            <li
              :class="[
                active ? 'bg-amber-100 text-amber-900' : 'text-gray-900',
                'relative cursor-default select-none py-2 px-2 flex',
              ]"
            >
              <img
                :src="`https://flagcdn.com/20x15/${person
                  .slice(0, 2)
                  .toLocaleLowerCase()}.png`"
                class="mr-2"
              />
              <span
                :class="[
                  selected ? 'font-medium' : 'font-normal',
                  'block truncate',
                ]"
                >{{ person }}</span
              >
            </li>
          </ListboxOption>
        </ListboxOptions>
      </transition>
    </div>
  </Listbox>
</template>
