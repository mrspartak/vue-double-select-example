<script setup lang="ts">
import { ref, watch } from "vue";

import type { ConvertedState, ConvertedCountry, GeoState } from "@/types/geo";

const states = ref<ConvertedState[]>([]);

const loadStates = async (countryCode: string) => {
  const response = await fetch(`/data/states/${countryCode}.json`);
  const data = (await response.json()) as GeoState[];
  states.value = data.map((state) => ({
    name: state[2],
    code: state[1],
  }));
};

const model = defineModel<ConvertedState | null>({
  required: true,
  default: null,
});

const props = withDefaults(
  defineProps<{
    disabled?: boolean;
    country: ConvertedCountry | null;
  }>(),
  {
    disabled: false,
    country: null,
  }
);

const loading = ref(true);

watch(
  () => props.country,
  async () => {
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
    <select v-else v-model="model" :disabled="disabled" id="state-select">
      <option v-for="state in states" :key="state.code" :value="state">
        {{ state.name }}
      </option>
    </select>
  </div>
</template>
