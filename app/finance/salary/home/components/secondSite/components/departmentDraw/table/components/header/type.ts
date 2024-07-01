import { Control } from "react-hook-form";

export interface ISalaryHeader {
  control: Control<
    {
      increase: boolean;
      decrease: boolean;
      high: boolean;
      normal: boolean;
      low: boolean;
      full_name: string;
    },
    any,
    {
      increase: boolean;
      decrease: boolean;
      high: boolean;
      normal: boolean;
      low: boolean;
      full_name: string;
    }
  >;
}
