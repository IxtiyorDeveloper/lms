import { IAdminCallCron } from "types/autoCall";

export const generateTemplates = ({
  data,
}: {
  data: IAdminCallCron | undefined;
}) => {
  return data?.crons?.map((item, index) => ({
    label: item?.label,
    key: item?.key,
    can_run: item?.can_run,
  }));
};
