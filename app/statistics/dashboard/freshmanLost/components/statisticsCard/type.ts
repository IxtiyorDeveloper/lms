export interface IStatisticsCard {
  title: string;
  full?: boolean;
  data?: {
    name: string;
    value: number;
    color: string;
    total?: number;
    location?: boolean;
    user?: {
      name: string;
      image: string;
    };
  }[];
  withTab?: boolean;
  menu?: any;
  colors?: string[];
  isAreaChart?: boolean;
  findField?: string;
  count1?: string;
  count2?: string;
  x?: string;
}
