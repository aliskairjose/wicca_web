export interface AccumulatedTimeInterfaceMonthInterface {
  year: number;
  month: number;
  types: TypeInterface[];
}

export interface TypeInterface {
  type: string;
  totalTimeInSeconds: number;
}
