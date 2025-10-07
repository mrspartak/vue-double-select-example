<script setup lang="ts">
import { ref } from "vue";

import type { ConvertedCountry, GeoCountry } from "@/types/geo";

const countries = ref<ConvertedCountry[]>([]);

const loadCountries = async () => {
  const response = await fetch("/data/countries.json");
  const data = (await response.json()) as GeoCountry[];

  countries.value = data.map((country) => ({
    name: country[2],
    code: country[1],
  }));
};

const model = defineModel<ConvertedCountry | null>({
  required: true,
  default: null,
});

withDefaults(
  defineProps<{
    disabled?: boolean;
  }>(),
  {
    disabled: false,
  }
);

const loading = ref(true);

loadCountries().then(() => {
  loading.value = false;
});
</script>

<template>
  <div>
    <label for="country-select">Country</label>
    <span aria-busy="true" v-if="loading">Loading...</span>
    <select v-else v-model="model" :disabled="disabled" id="country-select">
      <option v-for="country in countries" :key="country.code" :value="country">
        {{ country.name }}
      </option>
    </select>
  </div>
</template>
