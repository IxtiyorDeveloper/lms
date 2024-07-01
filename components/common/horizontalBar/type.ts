export interface IHorizontalBar {
  data: IBarPart[];
}

export interface IBarPart {
  percentage: number;
  color: string;
  label: string;
}
