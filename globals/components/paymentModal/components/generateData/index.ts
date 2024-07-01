import moment from "moment/moment";
import { ICalculation } from "types/ICalculation";
import { DATE_FORMAT_DD_MMM_YYYY } from "constants/dates";
import { debtorGroupInterface } from "../../type";
import { IContacts } from "types/contact";
import { IGroup } from "types";

export const generateData = ({
  user,
  calculation,
  group,
}: {
  user?: IContacts;
  calculation?: ICalculation;
  group?: IGroup;
}) => {
  let list: debtorGroupInterface[] = [];
  if (!!calculation?.student?.debt) {
    if (user?.actualTransfers?.length)
      for (let i = 0; i < user.actualTransfers?.length; i++) {
        const actualTransfer = user.actualTransfers[i];
        if (
          +actualTransfer.actualPayment?.debt > 0 &&
          actualTransfer?.actualPayment
        ) {
          list = [
            ...list,
            {
              key: i,
              name: actualTransfer.group.name,
              period: `${moment(actualTransfer.actualPayment.start_date).format(
                DATE_FORMAT_DD_MMM_YYYY
              )}  >  ${moment(actualTransfer.actualPayment.finish_date).format(
                DATE_FORMAT_DD_MMM_YYYY
              )}`,
              lesson:
                actualTransfer.actualPayment.lesson_count?.toString() || 0,
              amount: actualTransfer.actualPayment.debt,
            },
          ];
        }
      }
    if (+(user?.actualPayment?.debt || 0) > 0)
      list = [
        ...list,
        {
          key: list.length + 1,
          name: group?.name || "",
          period: `${moment(user?.actualPayment?.start_date).format(
            DATE_FORMAT_DD_MMM_YYYY
          )}  >  ${moment(user?.actualPayment?.finish_date).format(
            DATE_FORMAT_DD_MMM_YYYY
          )}`,
          lesson: user?.actualPayment?.lesson_count?.toString() || 0,
          amount: user?.actualPayment?.debt,
        },
      ];
  }
  return list;
};
