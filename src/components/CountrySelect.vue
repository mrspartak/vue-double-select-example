<script setup lang="ts">
import { ref } from "vue";

import type { ConvertedCountry, GeoCountry } from "@/types/geo";

/* 
  Local component state
*/
const loading = ref(true);
const countries = ref<ConvertedCountry[]>([]);

/* 
  Pathrough property. Same as define the property and also the update event.
*/
const model = defineModel<ConvertedCountry | null>({
  required: true,
  default: null,
});

/* 
  Load the countries when the component is mounted.
*/
loadCountries().then(() => {
  loading.value = false;
});

/* 
  Function to load the countries.
*/
async function loadCountries() {
  const response = await fetch("/data/countries.json");
  const data = (await response.json()) as GeoCountry[];

  countries.value = data.map((country) => ({
    name: country[2],
    code: country[1],
  }));
}
</script>

<template>
  <div>
    <label for="country-select">Country</label>
    <span aria-busy="true" v-if="loading">Loading...</span>
    <select v-else v-model="model" id="country-select">
      <option v-for="country in countries" :key="country.code" :value="country">
        {{ country.name }}
      </option>
    </select>
  </div>
</template>
