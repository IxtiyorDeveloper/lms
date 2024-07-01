import { Accept } from "react-dropzone";
import { EDeleteProjectFile } from "types/uploadFile";
import { ControllerRenderProps, FieldValues } from "react-hook-form";

export type TUploadImage = {
  name: string;
  control: any;
  error?: any;
  disabled?: boolean;
  isCircle?: boolean;
  setValue: any;
  height?: string;
  image?: string | null;
  label?: string;
  isVideo?: boolean;
  required?: boolean;
  clearError?: (name?: string) => void;
  placeholder?: string | JSX.Element;
  text?: string | JSX.Element;
  isNecessaryAllFields?: boolean;
  id?: number;
  action?: "create" | "update";
  watch?: any;
  filename?: string;
  isVideoPreview?: boolean;
  isViewOnly?: boolean;
  canCheckFileType?: boolean;
  accept?: Accept | undefined;
  deleteProjectFile?: EDeleteProjectFile;
  frontDelete?: boolean;
  iconPr?: {
    size?: number;
    color?: string;
  };
  onClear?: ({
    field,
    path,
    event,
  }: {
    field: ControllerRenderProps<FieldValues, string>;
    path?: string;
    event?: React.MouseEvent<HTMLDivElement, MouseEvent>;
    setUrl?: React.Dispatch<React.SetStateAction<string | null | undefined>>;
  }) => void;
};
