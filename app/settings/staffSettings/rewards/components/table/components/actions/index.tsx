import { useMemo } from "react";
import {
  RejectAction,
  ApproveAction,
  Unban,
  ApproveRewardAction,
} from "components";
import { TParams } from "types";
import { IconWrapper } from "./style";
import { toggleModal } from "store";
import { useDispatch } from "react-redux";
import _ from "lodash";
import { IStaffReward } from "types/staffSettings";

export enum RewardsStage {
  cancel = "rewardCancel",
  give = "rewardGive",
  restore = "rewardRestore",
  approve = "rewardApprove",
}

const CellActions = ({
  data,
  size = "small",
  activeActions,
  extra,
}: {
  data?: IStaffReward;
  size?: "small" | "medium";
  activeActions?: TParams;
  permissionActions?: TParams;
  extra?: { [key: string]: { [key: string]: any } } | { [key: string]: any };
}) => {
  const dispatch = useDispatch();

  const handleAction = (type: RewardsStage) => {
    dispatch(
      toggleModal({
        key: type,
        data: {
          data: {
            data,
            type,
          },
          open: true,
        },
      })
    );
  };

  const elements: TParams = useMemo(() => {
    return {
      restore: (
        <Unban size={size} onClick={() => handleAction(RewardsStage.restore)} />
      ),
      cancel: (
        <RejectAction
          size="medium"
          onClick={() => handleAction(RewardsStage.cancel)}
        />
      ),
      give: (
        <ApproveAction
          size={size}
          onClick={() => handleAction(RewardsStage.give)}
        />
      ),
      approve: (
        <ApproveRewardAction
          size={size}
          onClick={() => handleAction(RewardsStage.approve)}
        />
      ),
    };
  }, [extra, data]);

  return (
    <IconWrapper>
      {Object.entries(activeActions ?? {})
        ?.map(([key, value]) => ({ key, value }))
        ?.map((item, index) => {
          if (item.value) {
            return <div key={index}>{elements[item.key]}</div>;
          }
        })}
    </IconWrapper>
  );
};

export default CellActions;
