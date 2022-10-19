import {
  Event,
  EventData,
  EventType,
  RaceData,
  Stint,
  Stop,
} from "@/scripts/StatTypes";

export class RaceStats {
  private data: RaceData;
  private readonly timeline: Event[];
  private readonly eventData: EventData;
  private error = false;

  constructor(data: RaceData) {
    this.data = data;
    this.timeline = this.createTimeline();
    this.eventData = this.createEventData();
  }

  public getTimeline(): Event[] {
    return this.timeline;
  }

  public getEventData(): EventData {
    return this.eventData;
  }

  public hasError(): boolean {
    return this.error;
  }

  private createEventData(): EventData {
    let fuelTime = 0;
    let pitTime = 0;
    let lowTireWear = 100;
    let lowTireWearStints: number[] = [];

    this.timeline.forEach((e) => {
      if (e.type === EventType.Stint) {
        if ((e as Stint).tireRemaining == lowTireWear) {
          lowTireWearStints.push(e.id + 1);
        } else if ((e as Stint).tireRemaining < lowTireWear) {
          lowTireWearStints = [e.id + 1];
          lowTireWear = (e as Stint).tireRemaining;
        }
      } else {
        fuelTime += (e as Stop).refuelTime;
        pitTime += (e as Stop).totalTime;
      }
    });

    return {
      stops: this.data.stops.toString(),
      stints: (this.data.stops + 1).toString(),
      fuelTime: fuelTime.toFixed(2),
      pitTime: pitTime.toFixed(2),
      lowTireWear: lowTireWear.toFixed(2),
      lowTireWearStints: this.getArrayAsList(lowTireWearStints),
      lowTireWearRounds: (this.timeline[0] as Stint).laps.toString(),
    };
  }

  private createTimeline(): Event[] {
    const timeline = [];
    const avgLaps = Math.floor(this.data.laps / (this.data.stops + 1));
    const extraLaps = (this.data.laps % (this.data.stops + 1)) * 2;

    let lastStint: Stint = this.getEmptyStint();
    let lastStop: Stop = this.getEmptyStop();

    for (let i = 0; i <= this.data.stops * 2; i++) {
      if (i % 2 == 0) {
        const lapsNeeded = i < extraLaps ? avgLaps + 1 : avgLaps;
        lastStint = timeline[i] = this.getNewStint(i, lapsNeeded, lastStop);
      } else {
        const lapsNeeded = i + 1 < extraLaps ? avgLaps + 1 : avgLaps;
        lastStop = timeline[i] = this.getNewStop(i, lapsNeeded, lastStint);
      }
    }

    return timeline;
  }

  private getNewStint(i: number, lapsNeeded: number, lastStop: Stop): Stint {
    const fuelRemaining =
      lastStop.newFuelLevel - this.data.fuelUsage * lapsNeeded;
    const tireRemaining =
      lastStop.newTireWear - this.data.tireWear * lapsNeeded;
    const error = fuelRemaining < 0 || tireRemaining < 0;
    if (error) this.error = true;

    return {
      id: i / 2,
      type: EventType.Stint,
      laps: lapsNeeded,
      fuelRemaining: fuelRemaining,
      tireRemaining: tireRemaining,
      error: error,
    };
  }

  private getNewStop(i: number, lapsNeeded: number, lastStint: Stint): Stop {
    const fuelRemaining = lastStint.fuelRemaining;
    let fuelNeeded = 100 - fuelRemaining;
    const refuelTime = fuelNeeded / this.data.refuelRate;
    if (i === this.data.stops * 2 - 1) {
      fuelNeeded = lapsNeeded * this.data.fuelUsage - fuelRemaining + 5;
    }
    const error = fuelNeeded > 100;
    if (error) this.error = true;

    return {
      id: Math.floor(i / 2),
      type: EventType.Stop,
      fuelNeeded: fuelNeeded,
      refuelTime: refuelTime,
      totalTime: refuelTime + this.data.pitStopTime,
      newFuelLevel: fuelRemaining + fuelNeeded,
      newTireWear: 100,
      error: error,
    };
  }

  private getEmptyStint(): Stint {
    return {
      id: -1,
      laps: 0,
      fuelRemaining: 100,
      tireRemaining: 100,
    } as Stint;
  }

  private getEmptyStop(): Stop {
    return {
      id: -1,
      fuelNeeded: 0,
      refuelTime: 0,
      totalTime: 0,
      newFuelLevel: 100,
      newTireWear: 100,
    } as Stop;
  }

  private getArrayAsList(array: number[]) {
    let val = "";
    array.forEach((s) => (val += s + ", "));
    if (array.length == 0) return "-";
    else val = val.substring(0, val.length - 2);
    return val;
  }
}
