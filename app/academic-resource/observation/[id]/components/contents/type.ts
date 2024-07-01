import { Control, FieldValues } from "react-hook-form";
import { IObsAspect } from "types/observation";

export interface ITimeline {
  control: Control<FieldValues, any>;
  aspects: IObsAspect | undefined;
  tab: string | undefined;
  handleSave: () => void;
}
