import { IFile } from "types";
import { EDeleteProjectFile } from "../../../types/uploadFile";

export type TUploadImage = {
  name: string;
  control: any;
  error?: any;
  disabled?: boolean;
  setValue: any;
  height?: string;
  file?: IFile;
  label?: string;
  required?: boolean;
  placeholder?: string | React.ReactNode;
  text?: string;
  multiple?: boolean;
  maxFiles?: number;
  watch?: any;
  className?: string;
  deleteProjectFile?: EDeleteProjectFile;
  onSuccess?: (data: any) => void;
};
