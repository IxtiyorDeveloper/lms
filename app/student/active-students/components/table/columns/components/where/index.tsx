import React from "react";
import { Wrapper, WaitingLabel, ArchivedLabel } from "./style";
import {
  STUDENT_STATUS_ARCHIVED,
  STUDENT_STATUS_WAITING_LIST,
} from "constants/studentStatuses";
import { toggleModal } from "store";
import { useDispatch } from "react-redux";
import { queryKeys } from "constants/queryKeys";

const WhereComponent = ({ value, record }: { value: any; record: any }) => {
  const dispatch = useDispatch();
  const id = record?.id;
  const handleChange = ({ status }: { status: string }) => {
    dispatch(
      toggleModal({
        key: "stopping",
        data: {
          open: true,
          data: {
            id,
            status,
            queryKeys: [queryKeys.studying_student_list],
            student: record,
            permissionActions: record?.permissionActions,
            isStatusChangeByWhereColumn: true,
          },
        },
      }),
    );
  };

  const content = {
    [STUDENT_STATUS_WAITING_LIST]: (
      <WaitingLabel
        onClick={() => handleChange({ status: STUDENT_STATUS_WAITING_LIST })}
      >
        Waiting List
      </WaitingLabel>
    ),
    [STUDENT_STATUS_ARCHIVED]: (
      <ArchivedLabel
        onClick={() => handleChange({ status: STUDENT_STATUS_ARCHIVED })}
      >
        Archived
      </ArchivedLabel>
    ),
  };
  return <Wrapper>{content[value as keyof typeof content]}</Wrapper>;
};

export default WhereComponent;
