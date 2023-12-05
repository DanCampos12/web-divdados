export interface OverviewAccumulatedValue {
  description: string;
  valuesByDates: {
    date: string;
    value: number;
  }[];
}
