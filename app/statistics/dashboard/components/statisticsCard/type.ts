import { CSSProperties, ReactElement, ReactNode } from "react";

export interface IStatisticsCard {
  title?: string | ReactNode;
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
  withTabGroup?: boolean;
  menu?: any;
  colors?: string[];
  customToolTipForPieChart?: (payload: any) => ReactElement;
  isAreaChart?: boolean;
  reversedComplexThinTab?: boolean;
  isCustomTooltip?: boolean;
  initialTabValue?: number | string;
  findField?: string;
  count1?: string;
  routerKey?: string;
  count2?: string;
  x?: string;
  isTinyBar?: boolean;
  selectNode?: ReactNode;
  children?: ReactNode;
  containerStyle?: CSSProperties;
  isLoading?: boolean;
}
