<template>
  <div
    class="card short stop"
    style="margin-top: 1rem"
    :class="{ 'error-card': stop.error }"
  >
    <h2 style="margin: 0">
      <span class="text-accent">{{ stop.id + 1 }}</span
      >. Stop
    </h2>
    <span class="text-accent">{{ stop.refuelTime.toFixed(2) }}</span
    >s to refuel
    <span class="text-accent">{{ stop.fuelNeeded.toFixed(2) }}</span
    >l<br />
    <span class="text-accent">{{ stop.totalTime.toFixed(2) }}</span
    >s required for pitstop
  </div>
</template>

<script setup lang="ts">
import { Stop } from "@/scripts/StatTypes";
defineProps<{ stop: Stop | undefined }>();
</script>
