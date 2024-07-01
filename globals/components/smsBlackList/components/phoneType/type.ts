import { IUserPhone } from "types/userPhone";
import {
  Control,
  FieldValues,
  SetFieldValue,
  SetValueConfig,
  UseFormGetValues,
  UseFormWatch,
} from "react-hook-form";

export interface IPhoneTypeC {
  phone: IUserPhone;
  control: Control;
  reset?: any;
  pageView?: any;
  open?: any;
  watch: UseFormWatch<FieldValues>;
  setValue: SetValueConfig | SetFieldValue<any>;
  getValues: UseFormGetValues<any>;
}
