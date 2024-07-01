import { IGroup } from "types";
import { WrapperLabel } from "./style";
import * as React from "react";
import { ToHourMinute } from "utils/toHourMinute";
import GroupStatus from "components/common/groupStatus";

export const makeGroupOptions = (arr?: IGroup[]) => {
  return arr
    ?.sort((a, b) => {
      const timeA: any = a.lessonTime?.time;
      const timeB: any = b.lessonTime?.time;
      return timeA?.localeCompare(timeB);
    })
    .map((item) => {
      return {
        value: item?.id?.toString(),
        name: item.name,
        label: (
          <WrapperLabel>
            <GroupStatus group={item} />
            <div className="label" />
            <div className="content">
              <p className="opt-item">{item?.name}</p>
              <p className="opt-item-time">{ToHourMinute(item?.time || "")}</p>
            </div>
          </WrapperLabel>
        ),
      };
    });
};

export const makeFilteredGroupOptions = ({
  groups,
  selectedGroups,
}: {
  groups?: IGroup[];
  selectedGroups: string[];
}) => {
  return groups
    ?.filter((f) => selectedGroups.indexOf(f.id.toString()) != -1)
    .map((item) => {
      return {
        value: item?.id?.toString(),
        name: item.name,
        label: (
          <WrapperLabel>
            <GroupStatus group={item} />
            <div className="label" />
            <div className="content">
              <p className="opt-item">{item?.name}</p>
              <p className="opt-item-time">{ToHourMinute(item?.time || "")}</p>
            </div>
          </WrapperLabel>
        ),
        disabled: false,
      };
    });
};
