<script setup lang="ts">
import { ref, watch } from "vue";

import type { ConvertedState, ConvertedCountry, GeoState } from "@/types/geo";

/* 
  Local component state
*/
const states = ref<ConvertedState[]>([]);
const loading = ref(true);

/* 
  Pathrough property. Same as define the property and also the update event.
*/
const model = defineModel<ConvertedState | null>({
  required: true,
  default: null,
});

/* 
  Component properties with default values.
*/
const props = withDefaults(
  defineProps<{
    country: ConvertedCountry | null;
  }>(),
  {
    country: null,
  }
);

/* 
  Function to load the states for the given country.
*/
const loadStates = async (countryCode: string) => {
  const response = await fetch(`/data/states/${countryCode}.json`);
  const data = (await response.json()) as GeoState[];
  states.value = data.map((state) => ({
    name: state[2],
    code: state[1],
  }));
};

/* 
  Watch the country property changes and load the states when it changes.
*/
watch(
  () => props.country,
  async () => {
    model.value = null;
    if (props.country) {
      loading.value = true;
      await loadStates(props.country.code);
      loading.value = false;
    }
  },
  { immediate: true }
);
</script>

<template>
  <div>
    <label for="state-select">State</label>
    <p v-if="!country">Select a country first</p>
    <span aria-busy="true" v-else-if="loading">Loading...</span>
    <select v-else v-model="model" id="state-select">
      <option v-for="state in states" :key="state.code" :value="state">
        {{ state.name }}
      </option>
    </select>
  </div>
</template>
