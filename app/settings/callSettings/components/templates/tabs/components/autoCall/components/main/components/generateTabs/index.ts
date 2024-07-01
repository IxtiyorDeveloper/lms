import { IAutoCallCron } from "types/autoCall";

export const generateTabs = ({
  callCron,
}: {
  callCron: IAutoCallCron | undefined;
}) => {
  return {
    menu: callCron?.templates?.map((item, index) => ({
      label: item?.scenarioLabel,
      value: item?.id?.toString(),
      templateObj: item,
    })),
    templates: callCron?.templates,
  };
};
