import { EventPeriod } from './EventPeriod'

export interface EventState {
  filters: {
    searchText: string;
    inflow: boolean;
    outflow: boolean;
  },
  eventPeriods: EventPeriod[];
}
