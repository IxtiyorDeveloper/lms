import { IStaffViewPageInfoData } from "types/staffSettings";
import { Control, FieldValues, UseFormWatch } from "react-hook-form";

export interface INonOfficial {
  dataGetOne: IStaffViewPageInfoData | undefined;
  control: Control<FieldValues, any>;
  setValue: any;
  watch: UseFormWatch<FieldValues>;
  acceptType: {
    "image/*": never[];
    "application/pdf": string[];
    "application/vnd.ms-excel": string[];
    "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet": string[];
    "audio/*": never[];
    "video/*": never[];
    "application/msword": string[];
    "application/vnd.openxmlformats-officedocument.wordprocessingml.document": string[];
  };
}
