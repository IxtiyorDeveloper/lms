import { FieldError, FieldErrorsImpl, Merge } from "react-hook-form";

export interface IErrorLabelProps {
  hasThreeDots?: boolean;
  error:
    | any
    | string
    | FieldError
    | Merge<FieldError, FieldErrorsImpl<any>>
    | undefined;
}
