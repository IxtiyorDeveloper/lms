import React from "react";
import {
  DeleteCircle,
  EditAction,
  TeacherChangeAction,
  Transfer,
} from "components";
import { IGroup, TParams } from "types";
import { IconWrapper } from "./style";
import { toggleModal } from "store";
import { useDispatch } from "react-redux";
import LifeCycle from "../../elements/labels/lifeCycle";

const GroupActions = ({
  groupId,
  activeActions,
  queryKeys,
  group,
}: {
  groupId?: number;
  activeActions?: TParams;
  queryKeys?: string[];
  group?: IGroup;
}) => {
  const dispatch = useDispatch();
  const elements: TParams = {
    take: (
      <Transfer
        size="small"
        onClick={() =>
          dispatch(
            toggleModal({
              key: "takeGroup",
              data: {
                data: {
                  id: groupId,
                  queryKeys: queryKeys,
                  group: group,
                },
                open: true,
              },
            })
          )
        }
      />
    ),
    edit: (
      <EditAction
        size="small"
        onClick={() =>
          dispatch(
            toggleModal({
              key: "group",
              data: {
                open: true,
                data: {
                  id: groupId,
                  action: "update",
                  queryKeys: queryKeys,
                  group,
                },
              },
            })
          )
        }
      />
    ),
    changeTeacher: (
      <TeacherChangeAction
        size="small"
        onClick={() =>
          dispatch(
            toggleModal({
              key: "changeTeacher",
              data: {
                open: true,
                data: {
                  id: groupId,
                  queryKeys: queryKeys,
                  group,
                },
              },
            })
          )
        }
      />
    ),
    lifeCycle: (
      <LifeCycle
        size="small"
        onClick={() =>
          dispatch(
            toggleModal({
              key: "groupLifeCycle",
              data: {
                data: {
                  id: groupId,
                  queryKeys: queryKeys,
                },
                open: true,
              },
            })
          )
        }
      />
    ),
    delete: (
      <DeleteCircle
        size="small"
        onClick={() =>
          dispatch(
            toggleModal({
              key: "deleteGroup",
              data: {
                data: {
                  id: groupId,
                  queryKeys: queryKeys,
                },
                open: true,
              },
            })
          )
        }
      />
    ),
  };
  return (
    <IconWrapper>
      {Object.entries(activeActions ?? {})
        ?.map(([key, value]) => ({ key, value }))
        ?.map((item) => {
          if (item.value) {
            return elements[item.key];
          }
        })}
    </IconWrapper>
  );
};

export default GroupActions;
