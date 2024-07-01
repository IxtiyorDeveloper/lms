import { ETabStatuses } from "types";
import { Label } from "./style";
import { RedBadgeTitle } from "components";
import { ITabs } from "./type";
import { useMemo } from "react";

export const menu = ({ data }: ITabs) => {
  return useMemo(() => {
    return [
      {
        label: (
          <Label>
            <RedBadgeTitle
              title="Waiting list"
              count={data?.tabs?.[ETabStatuses.TAB_WAITING]}
            />
          </Label>
        ),
        value: ETabStatuses.TAB_WAITING,
      },
      {
        label: (
          <Label>
            <RedBadgeTitle
              title="Not attended"
              count={data?.tabs?.[ETabStatuses.TAB_NEW_STUDENT_NOT_ATTENDED]}
            />
          </Label>
        ),
        value: ETabStatuses.TAB_NEW_STUDENT_NOT_ATTENDED,
      },
      {
        label: (
          <Label>
            <RedBadgeTitle
              title="Attended"
              count={data?.tabs?.[ETabStatuses.TAB_NEW_STUDENT_ATTENDED]}
            />
          </Label>
        ),
        value: ETabStatuses.TAB_NEW_STUDENT_ATTENDED,
      },
      {
        label: (
          <Label>
            <RedBadgeTitle
              title="Studying"
              count={data?.tabs?.[ETabStatuses.TAB_STUDYING]}
            />
          </Label>
        ),
        value: ETabStatuses.TAB_STUDYING,
      },
      {
        label: (
          <Label>
            <RedBadgeTitle
              title="Transferring"
              count={data?.tabs?.[ETabStatuses.TAB_TRANSFERRING]}
            />
          </Label>
        ),
        value: ETabStatuses.TAB_TRANSFERRING,
      },
      {
        label: (
          <Label>
            <RedBadgeTitle
              title="Stopping"
              count={data?.tabs?.[ETabStatuses.TAB_STOPPING]}
            />
          </Label>
        ),
        value: ETabStatuses.TAB_STOPPING,
      },
      {
        label: (
          <Label>
            <RedBadgeTitle
              title="Archived"
              count={data?.tabs?.[ETabStatuses.TAB_ARCHIVED]}
            />
          </Label>
        ),
        value: ETabStatuses.TAB_ARCHIVED,
      },
    ];
  }, [data?.tabs]);
};
