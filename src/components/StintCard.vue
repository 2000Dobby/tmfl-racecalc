<template>
  <div
    class="card short"
    style="margin-top: 1rem"
    :class="{ 'error-card': stint.error }"
  >
    <h2 style="margin: 0">
      Stint <span class="text-accent">{{ stint.id + 1 }}</span>
    </h2>
    <span class="text-accent">{{ stint.laps }}</span> lap(s) <br />
    <span class="text-accent">{{ stint.fuelRemaining.toFixed(2) }}</span
    >l of fuel remaining <br />
    <span class="text-accent">{{ stint.tireRemaining.toFixed(2) }}</span
    >% tire left
  </div>
</template>

<script setup lang="ts">
import { Stint } from "@/scripts/StatTypes";
defineProps<{ stint: Stint }>();
</script>
