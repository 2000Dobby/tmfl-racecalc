<template>
  <div
    class="card short left"
    style="display: flex; flex-direction: column; gap: 1rem"
  >
    <div class="line">
      <label>Laps</label>
      <input v-model="laps" class="text-input" type="number" min="1" />
    </div>
    <div class="line">
      <label>Stops</label>
      <input v-model="stops" class="text-input" type="number" min="0" />
    </div>
    <div class="line">
      <label>Time per pitstop</label>
      <input v-model="pitStopTime" class="text-input" type="number" min="0" />
    </div>
    <div class="line">
      <label>Refueling rate</label>
      <input v-model="refuelRate" class="text-input" type="number" min="1" />
    </div>
    <div class="line">
      <label>Fuel usage per lap</label>
      <input v-model="fuelUsage" class="text-input" type="number" min="0" />
    </div>
    <div class="line">
      <label>Tire wear per lap</label>
      <input v-model="tireWear" class="text-input" type="number" min="0" />
    </div>
    <button class="button" @click="submit">Create Strategy</button>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { RaceData } from "@/scripts/StatTypes";

const laps = ref(39);
const stops = ref(3);
const pitStopTime = ref(20);
const refuelRate = ref(4);
const fuelUsage = ref(8.7);
const tireWear = ref(7);

const emit = defineEmits<{ (e: "submit", data: RaceData): void }>();

function submit() {
  emit("submit", {
    laps: laps.value,
    stops: stops.value,
    fuelUsage: fuelUsage.value,
    tireWear: tireWear.value,
    refuelRate: refuelRate.value,
    pitStopTime: pitStopTime.value,
  });
}
</script>

<style scoped>
.line {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}
</style>
