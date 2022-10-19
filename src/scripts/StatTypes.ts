export type RaceData = {
  laps: number;
  stops: number;
  fuelUsage: number;
  tireWear: number;
  refuelRate: number;
  pitStopTime: number;
};

export enum EventType {
  Stop,
  Stint,
}

export type Event = {
  id: number;
  type: EventType;
  error: boolean;
};

export type Stop = Event & {
  type: EventType.Stop;
  fuelNeeded: number;
  refuelTime: number;
  totalTime: number;
  newFuelLevel: number;
  newTireWear: number;
  error: boolean;
};

export type Stint = Event & {
  type: EventType.Stint;
  laps: number;
  fuelRemaining: number;
  tireRemaining: number;
  error: boolean;
};

export type EventData = {
  stops: string;
  stints: string;
  fuelTime: string;
  pitTime: string;
  lowTireWear: string;
  lowTireWearStints: string;
  lowTireWearRounds: string;
};

export const EmptyEventData: EventData = {
  stops: "-",
  stints: "-",
  fuelTime: "-",
  pitTime: "-",
  lowTireWear: "-",
  lowTireWearStints: "-",
  lowTireWearRounds: "-",
};
