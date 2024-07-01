import { IDepartListVacancy } from "types";
import { TreeSelectLabel, Value } from "../../style";

export const Options = ({
  data,
}: {
  data: IDepartListVacancy[] | undefined;
}) => {
  const options = data?.map((item) => {
    return {
      value: item?.id,
      label: <TreeSelectLabel>{item?.name}</TreeSelectLabel>,
      disabled: true,
      children: item?.vacancyList?.map((vacancy) => {
        return {
          value: `${item?.id}_${vacancy?.id}`,
          label: <Value>{vacancy.title}</Value>,
        };
      }),
    };
  });
  return options;
};
