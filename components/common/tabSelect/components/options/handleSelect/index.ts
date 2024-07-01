import { Dispatch, SetStateAction } from "react";

export const handleSelect = ({
  onChange,
  mode,
  currentValue,
  value = [],
  setOpen,
}: {
  onChange: any;
  mode?: "multiple" | "tags";
  currentValue: any;
  value: any;
  setOpen: Dispatch<SetStateAction<boolean | undefined>>;
}) => {
  if (mode == "multiple") {
    if (value?.includes(currentValue)) {
      onChange(value?.filter((f: any) => f != currentValue));
    } else {
      onChange([...((value as any) || []), currentValue]);
    }
  } else {
    onChange(currentValue);
    setTimeout(() => {
      setOpen(false);
    }, 150);
  }
};
