<script setup lang="ts">
import CountrySelect from "@/components/CountrySelect.vue";
import StateSelect from "@/components/StateSelect.vue";
import { ref } from "vue";

import { type ConvertedCountry, type ConvertedState } from "@/types/geo";

/* 
  Local component state
*/
const country = ref<ConvertedCountry | null>(null);
const state = ref<ConvertedState | null>(null);
</script>

<template>
  <h1>Double Select Example</h1>
  <CountrySelect v-model="country" />
  <StateSelect v-model="state" :country="country" />

  <p style="margin-top: 2rem">
    <span v-if="country">{{ country.name }}</span>
    <span v-if="state">, {{ state.name }}</span>
  </p>
</template>
