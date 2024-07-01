import {
  Control,
  ControllerRenderProps,
  FieldValues,
  UseFormWatch,
} from "react-hook-form";

export interface IBranchContent {
  control: Control<FieldValues, any>;
  selects: any;
  watch: UseFormWatch<FieldValues>;
  handleSubmit: any;
  handleReset: () => void;
  handleClose: () => void;
  setCurrent: React.Dispatch<any>;
  field: ControllerRenderProps<FieldValues, "branch">;
}
