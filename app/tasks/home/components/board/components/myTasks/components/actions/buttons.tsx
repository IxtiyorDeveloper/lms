import { ETaskState } from "types";
import {
  DoubleCheckSvg,
  EditSvg,
  TickSvg,
  XIconSvg,
} from "@jasurbekyuldashov/lms-web-icons";
import { textColors } from "styles/theme";
import React from "react";

export const generateButtons = ({ props }: { props: any }) => {
  return {
    canDone: (
      <button
        onClick={(e) => {
          e.stopPropagation();
          props.handleChangeStatus(ETaskState.ON_DONE);
        }}
        className="done"
      >
        <TickSvg color={textColors.white} />
        Done
      </button>
    ),
    canProcess: (
      <button
        onClick={(e) => {
          e.stopPropagation();
          props.handleChangeStatus(ETaskState.ON_PROCESS);
        }}
        style={{
          color:
            props.state === Number(ETaskState.ON_PROCESS)
              ? textColors.white
              : textColors.dark,
        }}
        className={
          props.state === Number(ETaskState.ON_PROCESS)
            ? "stop-process"
            : "processing"
        }
      >
        Processing
      </button>
    ),
    canStopProcess: (
      <button
        onClick={(e) => {
          e.stopPropagation();
          props.handleChangeStatus(ETaskState.ON_STOP_PROCESS);
        }}
        style={{
          color:
            props.state === Number(ETaskState.ON_STOP_PROCESS)
              ? textColors.white
              : textColors.dark,
        }}
        className={
          props.state === Number(ETaskState.ON_STOP_PROCESS)
            ? "stop-process"
            : "processing"
        }
      >
        Stop process
      </button>
    ),
    canRated: (
      <button
        onClick={(e) => {
          e.stopPropagation();
          props.handleChangeStatus(ETaskState.ON_CHECKED);
        }}
        className="checked"
      >
        <DoubleCheckSvg color={textColors.white} />
        Checked
      </button>
    ),
    canNotDone: (
      <button
        onClick={(e) => {
          e.stopPropagation();
          props.handleChangeStatus(ETaskState.ON_STOP_PROCESS);
        }}
        className="dissatisfied"
      >
        <XIconSvg color={textColors.white} />
        Dissatisfied
      </button>
    ),
    canReject: (
      <button
        onClick={(e) => {
          e.stopPropagation();
          props.handleChangeStatus(ETaskState.ON_IMPOSSIBLE);
        }}
        className="reject"
      >
        <XIconSvg color={textColors.white} />
        Reject
      </button>
    ),
    edist: (
      <button
        className="edit"
        onClick={(e) => {
          e.stopPropagation();
          props.handleOpenUpdateTaskModal();
        }}
      >
        <EditSvg color={textColors.inDark} />
        Edit
      </button>
    ),
    canEdit: (
      <button
        className="edit"
        onClick={(e) => {
          e.stopPropagation();
          props.handleOpenUpdateTaskModal();
        }}
      >
        <EditSvg color={textColors.inDark} />
        Edit
      </button>
    ),
    cancel: (
      <button onClick={props.onCancel} className="cancel">
        Cancel
      </button>
    ),
  };
};
