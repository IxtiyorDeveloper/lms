import { FieldValues, UseFormReturn } from "react-hook-form";

export function checkLabelVisible({
  methods,
  labelKey,
}: {
  // @ts-ignore
  methods: UseFormReturn<FieldValues, any, undefined>;
  labelKey: number;
}) {
  if (!!methods.watch("user_label_type")) {
    if (Array.isArray(methods.watch("user_label_type"))) {
      return !!methods
        .watch("user_label_type")
        ?.some((s: string) => s == labelKey.toString());
    } else {
      return methods.watch("user_label_type") == labelKey.toString();
    }
  } else return false;
}
