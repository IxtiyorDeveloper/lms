import React from "react";
export interface IClickablaTagProps {
  data?: { name: string | React.ReactNode; id: number | string }[];
  name: string;
  control: any;
  defaultValue?: number[] | string;
  oneChoice?: boolean;
  alwaysSelected?: boolean;
}
