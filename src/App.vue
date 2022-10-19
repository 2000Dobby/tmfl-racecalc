<template>
  <div style="text-align: center">
    <h1 style="margin-bottom: 0">
      <span class="text-accent">TM</span> Race Planner
    </h1>
    <p style="margin-top: 0" class="text-lesser">by 2kDobby</p>
  </div>
  <div class="planner">
    <div class="container">
      <input-component @submit="createStrategy" />
    </div>
    <div class="container">
      <overview-component :event-data="eventData" :calc-error="calcError" />
      <div v-show="calcDone">
        <div v-for="event of timeline" :key="event.id">
          <stint-card v-if="event.type === EventType.Stint" :stint="event" />
          <stop-card v-else :stop="event" />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import {
  EmptyEventData,
  Event,
  EventData,
  EventType,
  RaceData,
} from "@/scripts/StatTypes";
import { RaceStats } from "@/scripts/RaceStats";
import InputComponent from "@/components/InputComponent.vue";
import OverviewComponent from "@/components/OverviewComponent.vue";
import StintCard from "@/components/StintCard.vue";
import StopCard from "@/components/StopCard.vue";

const timeline = ref<Event[]>([]);
const eventData = ref<EventData>(EmptyEventData);

const calcError = ref(false);
const calcDone = ref(false);

function createStrategy(data: RaceData) {
  let stats = new RaceStats(data);
  timeline.value = stats.getTimeline();
  eventData.value = stats.getEventData();
  calcError.value = stats.hasError();
  calcDone.value = true;
}
</script>

<style>
@import "assets/cibumArs.css";

#app {
  overflow: auto;
}

.stop {
  background-color: var(--primary-color);
}

@media screen and (min-width: 600px) {
  .planner {
    display: grid;
    grid-template-columns: 1fr 1fr;
  }

  .card {
    margin: 0 auto 0 0;
  }

  .card.left {
    margin: 0 0 0 auto;
  }
}

.error-card {
  background-color: darkred;
  margin: 2rem auto;
}
</style>
