import { STATE_CLOSED, STATE_CLOSING } from "constants/groupStatus";
import { IPaymentStatisticsGroup } from "types/finance/paymentStatistics";
import { groupReasons } from "static/group/reasons";

export const titleIdentifier = ({
  group,
}: {
  group?: IPaymentStatisticsGroup;
}) => {
  if (
    group?.state == STATE_CLOSED?.toString() ||
    group?.state == STATE_CLOSING?.toString()
  ) {
    return groupReasons?.find((r) => r.value == group?.closing_reason)?.label;
  } else return null;
};
