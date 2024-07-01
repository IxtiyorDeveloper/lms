import { TreeSelectLabel, Value } from "./style";

export const Options = ({ stageList }: { stageList: any }) => {
  const options = stageList?.map((status: any) => {
    return {
      value: status?.value,
      label: <TreeSelectLabel>{status?.label}</TreeSelectLabel>,
      disabled: status?.stages?.length,
      children: status?.stages
        ?.map((stage: any) => {
          return Object.entries(stage)?.map(([key, value]) => {
            return {
              value: `${status?.value}_${key}`,
              label: <Value>{value as string}</Value>,
            };
          });
        })
        .flat(),
    };
  });
  return options;
};
