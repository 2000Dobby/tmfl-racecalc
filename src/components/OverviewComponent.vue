<template>
  <div class="card short" v-show="eventData" style="margin-bottom: 2rem">
    <h1 style="margin: 0">Race Overview</h1>
    <span v-show="calcError" class="error">
      Configuration not possible! <br />
    </span>
    <span class="text-accent">{{ eventData?.stints }}</span> Stints with
    <span class="text-accent">{{ eventData?.stops }}</span> Stops <br />
    Time spent refueling:
    <span class="text-accent">{{ eventData?.fuelTime }}</span
    >s <br />
    Time spent in pit:
    <span class="text-accent">{{ eventData?.pitTime }}</span
    >s <br />
    Lowest tire wear at
    <span class="text-accent">{{ eventData?.lowTireWear }}</span
    >% in Stint
    <span class="text-accent">{{ eventData?.lowTireWearStints }}</span>
    (<span class="text-accent">{{ eventData?.lowTireWearRounds }}</span>
    laps)
  </div>
</template>

<script setup lang="ts">
import { EventData } from "@/scripts/StatTypes";
defineProps<{
  eventData: EventData | undefined;
  calcError: boolean;
}>();
</script>
