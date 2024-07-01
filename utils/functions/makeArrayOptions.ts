import { FC } from "react";

interface Interface {
  arr: any;
  label: string;
  value: string;
  hasChild?: boolean;
  childLabel?: string;
  childValue?: string;
  childKey?: string;
  parentDisabled?: boolean;
  childrenDisabled?: boolean;
  singleDisabled?: boolean;
  hasChildDisabled?: boolean;
}

export const makeArrayOptions: FC<Interface> = ({
  arr,
  label,
  value,
  hasChild = false,
  childValue,
  childLabel,
  childKey,
  parentDisabled = false,
  childrenDisabled = false,
  singleDisabled = false,
  hasChildDisabled = false,
}) => {
  if (!!arr && hasChild)
    return arr?.map((item: any) => ({
      label: item[label] as string,
      value: item[value]?.toString(),
      disabled: hasChildDisabled
        ? item?.[childKey ?? "children"]?.length
        : parentDisabled,
      children: item?.[childKey ?? "children"]?.map((child: any) => ({
        label: child[childLabel ?? label] as string,
        value: child[childValue ?? value],
        disabled: childrenDisabled,
      })),
    }));
  else {
    return arr?.map((item: any) => ({
      label: item[label] as string,
      value: item[value]?.toString(),
      disabled: singleDisabled,
    }));
  }
};
