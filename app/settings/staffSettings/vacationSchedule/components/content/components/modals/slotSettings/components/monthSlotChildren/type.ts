import { Control, UseFormSetValue } from "react-hook-form";

export interface IMonthSlotChildren {
  control: Control<any>;
  errors: any;
  setValue: UseFormSetValue<any>;
  listOfSlots: any[];
  slotsData?: any[];
}
