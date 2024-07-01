import Tabs from "./tab";
import { RoundedTab } from "components";
import { RoundedTabWrapper } from "./style";
import { Skeleton } from "antd";
import { IGroup } from "types";
import { useMemo } from "react";
import { GROUP_STATE } from "./type";

const GroupsTab = ({
  groups,
  isLoading,
}: {
  groups: IGroup[] | undefined;
  isLoading: boolean;
}) => {
  const filterGroups = useMemo(() => {
    return (
      groups?.filter((group) => Number(group.state) !== GROUP_STATE.CLOSED) ||
      []
    );
  }, [groups]);

  return (
    <RoundedTabWrapper>
      <RoundedTab tabs={Tabs({ groups: filterGroups, isLoading })} />
      {isLoading && (
        <Skeleton.Button
          block
          active
          size="large"
          style={{
            minHeight: 42,
          }}
        />
      )}
    </RoundedTabWrapper>
  );
};

export default GroupsTab;
