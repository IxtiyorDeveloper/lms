import { toast } from "react-toastify";

interface IProps {
  setError?: any;
  callBackSetError?: (err: { field: string; message: string }) => void;
  err: any;
  showToast?: boolean;
  formHookMainField?: string | boolean;
}

// backend dan kelgan errorlarni handle qilish uchun qilingan
// va barcha error ushlani kerak bo'lgan joylarda foydalanish kerak
export const validationErrorHandler = ({
  setError,
  err,
  showToast = true,
  formHookMainField,
  callBackSetError,
}: IProps) => {
  if (err.status === 422) {
    const validationErrors =
      (err.data?.client_error?.errors as any[]) || (err.data?.errors as any[]);

    if (Array.isArray(validationErrors)) {
      validationErrors.map((err: any) => {
        showToast && toast.error(err.message);
        setError?.(
          formHookMainField
            ? `${
                typeof formHookMainField === "boolean"
                  ? "general"
                  : formHookMainField
              }.${err.field}`
            : err.field,
          { message: err.message }
        );
        callBackSetError?.(err);
      });
    } else {
      const error = err.data?.client_error?.errors.message;
      showToast && toast.error(err.data?.errors?.message || error);
    }
  } else {
    toast.error(
      err.data?.client_error?.message ?? err.data?.client_error?.description
    );
  }
};
