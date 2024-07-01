import React from "react";
import {
  Button,
  CallRequest,
  Coming,
  LifeCycleLabel,
  NotAnswered,
  Paint,
} from "components";
import {
  ACTION_CALL_BACK,
  ACTION_R_CALL,
  ACTION_WILL_COME,
} from "constants/lifeCycle";
import moment from "moment/moment";
import {
  DATE_FORMAT_CREATED_AT,
  DATE_FORMAT_DD_MMM_HH_mm,
  DATE_FORMAT_YYYY_MM_DD_HH_mm,
} from "constants/dates";
import { store, toggleLifecycleModal } from "store";
import { ResetButtonWrapper } from "./style";
import { bgColors, textColors } from "styles/theme";
import { useQueryClient } from "@tanstack/react-query";
import { useChangeColorLead, useMarkActionLead } from "hooks";
import { ILead, TLeadActions } from "types";
import { toast } from "react-toastify";
import { updateList } from "utils/updateList";
import { validationErrorHandler } from "utils";

const ProcessingLabels = ({ record }: { record: any }) => {
  const data = record;
  const id = data?.id || null;
  const isHaveColor = data?.color;
  const leadActions = data?.leadActions || [];
  const isCallBack = leadActions.find(
    (e: TLeadActions) => e.action === ACTION_CALL_BACK
  );
  const isNotAnswered = leadActions.find(
    (e: TLeadActions) => e.action === ACTION_R_CALL
  );
  const isComing = leadActions.find(
    (e: TLeadActions) => e.action === ACTION_WILL_COME
  );
  const queryClient = useQueryClient();

  const markAction = useMarkActionLead({
    onSuccess: (newData: ILead) => {
      toast.success("Action changed");
      updateList({
        apiKey: "lead-list",
        newData,
        queryClient,
      });
    },
    onError: (err) => {
      validationErrorHandler({ err });
    },
  });

  const handleClickCallBack = (action: number, date: Date | null) => {
    markAction.mutate({
      action,
      id,
      date: date
        ? moment(new Date(date)).format(DATE_FORMAT_YYYY_MM_DD_HH_mm)
        : null,
    });
  };

  const changeColor = useChangeColorLead({
    onSuccess: (newData: ILead) => {
      toast.success("Lead color changed");
      updateList({
        apiKey: "lead-list",
        newData,
        queryClient,
      });
    },
    onError: (err) => {
      validationErrorHandler({ err });
    },
  });
  const onSubmitChangeColor = (id: number, color: string) => {
    changeColor.mutate({ id, color });
  };

  return (
    <div
      style={{
        display: "flex",
        gap: "20px",
        justifyContent: "center",
      }}
    >
      <CallRequest
        onChange={(date) => {
          handleClickCallBack(ACTION_CALL_BACK, date);
        }}
        size="small"
        label={
          isCallBack &&
          moment(isCallBack.datetime, DATE_FORMAT_CREATED_AT).format(
            DATE_FORMAT_DD_MMM_HH_mm
          )
        }
        isOpen={isCallBack}
        defaultValue={isCallBack}
      />
      <NotAnswered
        size="small"
        label={
          isNotAnswered &&
          moment(isNotAnswered.datetime, DATE_FORMAT_CREATED_AT).format(
            DATE_FORMAT_DD_MMM_HH_mm
          )
        }
        isOpen={isNotAnswered}
        defaultValue={isNotAnswered}
        onClick={() => handleClickCallBack(ACTION_R_CALL, new Date())}
      />
      <LifeCycleLabel
        onClick={() => {
          store.dispatch(
            toggleLifecycleModal({
              open: true,
              id: record?.id,
            })
          );
        }}
        size="small"
      />
      <Coming
        size="small"
        isOpen={isComing}
        defaultValue={isComing}
        onChange={(date) => {
          handleClickCallBack(ACTION_WILL_COME, date);
        }}
        showTime
        label={
          isComing &&
          moment(isComing.datetime, DATE_FORMAT_CREATED_AT).format(
            DATE_FORMAT_DD_MMM_HH_mm
          )
        }
        hasCalendar
        isHasReset
        renderExtraButtons={() => (
          <ResetButtonWrapper>
            <Button
              onClick={() => {
                handleClickCallBack(ACTION_WILL_COME, null);
              }}
              textStyle={{ color: textColors.white }}
              text="Reset"
              textColor={textColors.brilliance}
              bgColor={bgColors.pop}
            />
          </ResetButtonWrapper>
        )}
      />
      <Paint
        size="small"
        isOpen={isHaveColor}
        onSubmit={(color: string) => onSubmitChangeColor(id, color)}
      />
    </div>
  );
};

export default ProcessingLabels;
