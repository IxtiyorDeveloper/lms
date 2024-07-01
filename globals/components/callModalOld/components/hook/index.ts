import { useMemo } from "react";
import {
  NEW_STUDENT_ATTENDED,
  NEW_STUDENT_NOT_ATTENDED,
  STOPPING_STUDENT,
  STUDENT_STATUS_ARCHIVED,
  STUDENT_STATUS_WAITING_LIST,
  STUDYING_STUDENT,
  TRANSFERRING_STUDENT,
} from "constants/studentStatuses";
import { IProps } from "../userCard";
import { ICallSearch } from "types";

export const useCallUserFilter = (data?: ICallSearch) => {
  return useMemo(() => {
    let result: any = [];
    if (!!data)
      result = [
        ...(data?.students?.length > 0
          ? data?.students?.map((e) => {
              const studentStatus = e.student_status;
              const contactStatus = e.contact_status;
              return {
                fullName: `${e.firstname} ${e.lastname}`,
                type: "Student",
                groupName: e.group_name,
                groupId: e.group_id,
                studentId: e.id,
                url: e.avatar_url,
                id: e.id,
                status:
                  studentStatus == STUDENT_STATUS_WAITING_LIST
                    ? 1
                    : studentStatus == STUDENT_STATUS_ARCHIVED
                      ? 2
                      : contactStatus === STUDYING_STUDENT
                        ? 6
                        : contactStatus === NEW_STUDENT_NOT_ATTENDED
                          ? 4
                          : contactStatus === NEW_STUDENT_ATTENDED
                            ? 5
                            : contactStatus === TRANSFERRING_STUDENT
                              ? 7
                              : contactStatus === STOPPING_STUDENT
                                ? 8
                                : 3,
                numberType: e.phone_type,
                statusColor: "string",
                numberColor: "string",
              };
            })
          : []),
        ...(data?.staff?.length > 0
          ? data?.staff?.map((e) => {
              return {
                fullName: `${e.firstname} ${e.lastname}`,
                type: e.role_name,
                groupName: null,
                groupId: null,
                studentId: e.id,
                url: e.avatar_url,
                status: -1,
                numberType: 100,
                statusColor: "string",
                numberColor: "string",
                id: e.id,
              };
            })
          : []),
        ...(data?.leads?.length > 0
          ? data?.leads.map((e) => {
              return {
                fullName: `${e.name}`,
                type: "Lead",
                groupName: null,
                groupId: null,
                studentId: e.id,
                id: e.id,
                url: null,
                status: 0,
                numberType: 100,
                statusColor: "string",
                numberColor: "string",
              };
            })
          : []),
      ];
    return result.filter((r: any) => !!r) as IProps["user"][];
  }, [data]);
};
