import React from "react";
import {
  CallRequest,
  Coming,
  DontTakeMot,
  LifeCycleLabel,
  NotAnswered,
  Paint,
  Podo,
  PotentialFail,
  StartDate,
  WillPay,
} from "components";
import { TParams, TStatuses, UpdateLabelPages } from "types";
import { IconWrapper } from "../style";
import moment from "moment/moment";
import {
  LABEL_CALL_REQUEST,
  LABEL_COLOR_CHANGE,
  LABEL_COMING,
  LABEL_NOT_ANSWERED,
  LABEL_PODO,
  LABEL_POTENTIAL_FAIL,
  LABEL_START_DATE,
  LABEL_WILL_PAY,
  LABEL_CHECKED,
  DONT_TAKE_MOT,
} from "constants/labels";
import {
  useAddActionStudent,
  useRemoveActionStudent,
  useRemovePotential,
} from "hooks";
import { toast } from "react-toastify";
import { useQueryClient } from "@tanstack/react-query";
import {
  DATE_FORMAT_CREATED_AT,
  DATE_FORMAT_DD_MM_HH_mm,
  DATE_FORMAT_DD_MMM_HH_mm,
  DATE_FORMAT_SHOW_MMM,
  DATE_FORMAT_STANDARD,
  DATE_FORMAT_YYYY_MM_DD,
} from "constants/dates";
import { toggleModal } from "store";
import { useDispatch } from "react-redux";
import {
  removeContactLabel,
  updateContactLabel,
} from "utils/updateContactLabel";
import { funcCheckPermission } from "utils";
import { COMPONENTS_VIEWS } from "constants/permissions";
import CheckedLabel from "../../../elements/labels/checked";
import Router from "next/router";
import GiveBook from "../../../elements/actions/giveBook";

const CellActions = ({
  shouldPay = true,
  data,
  queryKeys,
  size = "small",
  activeLabels,
  className,
  disabledLabels,
  isSelectableNoneColor = false,
  clientUpdate = false,
  tableKey,
  page = UpdateLabelPages.REGULAR,
  disabledActions,
  countGivenBooksOnThisLevel = 0,
  onSuccess,
}: {
  status?: TStatuses;
  shouldPay?: boolean;
  onSuccess?: any;
  countGivenBooksOnThisLevel?: number;
  data?: any;
  queryKeys?: string[];
  size?: "medium" | "small";
  activeLabels?: TParams;
  className?: string;
  disabledLabels?: TParams;
  isSelectableNoneColor?: boolean;
  clientUpdate?: boolean;
  tableKey?: string;
  page?: UpdateLabelPages;
  disabledActions?: boolean;
}) => {
  const dispatch = useDispatch();
  const studentLabels =
    activeLabels ??
    data?.permissionLabels ??
    data?.user?.student?.permissionLabels;

  const userId = data?.user?.id;
  const userLabels = data?.user?.userLabels;
  const willPay = userLabels?.find?.((e: any) => e.type === LABEL_WILL_PAY);
  const notAnswer = userLabels?.find?.(
    (e: any) => e.type === LABEL_NOT_ANSWERED
  );
  const checked = userLabels?.find?.((e: any) => e.type === LABEL_CHECKED);
  const podo = userLabels?.find((e: any) => e.type === LABEL_PODO);
  const callRequest = userLabels?.find(
    (e: any) => e.type === LABEL_CALL_REQUEST
  );
  const coming = userLabels?.find?.((e: any) => e.type === LABEL_COMING);
  const mot = userLabels?.find?.((e: any) => e.type === DONT_TAKE_MOT);
  const startDate = userLabels?.find?.((e: any) => e.type === LABEL_START_DATE);
  const paint = userLabels?.find?.((e: any) => e.type === LABEL_COLOR_CHANGE);
  const potential_fail = userLabels?.find?.(
    (e: any) => e.type === LABEL_POTENTIAL_FAIL
  );
  const can_manage_potential_fail = funcCheckPermission([
    COMPONENTS_VIEWS.can_manage_potential_fail,
  ]);

  const can_manage_user_label = funcCheckPermission([
    COMPONENTS_VIEWS.can_manage_user_label,
  ]);

  const queryClient = useQueryClient();
  const addAction = useAddActionStudent({
    onSuccess: async (newData) => {
      toast.success("Student action changed");
      if (clientUpdate && tableKey) {
        updateContactLabel({
          apiKey: tableKey,
          newData,
          queryClient,
          page,
        });
      } else {
        if (Array.isArray(queryKeys)) {
          for (let i = 0; i < queryKeys.length; i++) {
            queryClient.invalidateQueries({
              queryKey: [queryKeys[i]],
            });
          }
        } else {
          queryClient.invalidateQueries({
            queryKey: queryKeys,
          });
        }
      }
      onSuccess?.();
    },
    onError: (e: any) => {
      if (e.status === 422) {
        e.data?.client_error?.errors?.map((err: any) => {
          toast.error(err?.message);
        });
        if (
          e.data?.client_error?.errors?.some(
            (obj: { field: string }) => obj.field === "type"
          )
        ) {
          if (Array.isArray(queryKeys)) {
            for (let i = 0; i < queryKeys.length; i++) {
              queryClient.invalidateQueries({
                queryKey: [queryKeys[i]],
              });
            }
          } else {
            queryClient.invalidateQueries({
              queryKey: queryKeys,
            });
          }
        }
      } else toast.error(e.data?.client_error?.exception?.message);
    },
  });
  const removeAction = useRemoveActionStudent({
    onError: (e: any) => {
      if (e.status === 422) {
        e.data?.client_error?.errors?.map((err: any) => {
          toast.error(err?.message);
        });
        if (
          e.data?.client_error?.errors?.some(
            (obj: { field: string }) => obj.field === "type"
          )
        ) {
          if (Array.isArray(queryKeys)) {
            for (let i = 0; i < queryKeys.length; i++) {
              queryClient.invalidateQueries({
                queryKey: [queryKeys[i]],
              });
            }
          } else {
            queryClient.invalidateQueries({
              queryKey: queryKeys,
            });
          }
        }
      } else toast.error(e.data?.client_error?.description);
    },
    onSuccess: () => {
      onSuccess?.();
    },
  });

  const removePotential = useRemovePotential({
    onError: (e: any) => {
      if (e.status === 422) {
        e.data?.client_error?.errors?.map((err: any) => {
          toast.error(err?.message);
        });
        if (
          e.data?.client_error?.errors?.some(
            (obj: { field: string }) => obj.field === "type"
          )
        ) {
          if (Array.isArray(queryKeys)) {
            for (let i = 0; i < queryKeys.length; i++) {
              queryClient.invalidateQueries({
                queryKey: [queryKeys[i]],
              });
            }
          } else {
            queryClient.invalidateQueries({
              queryKey: queryKeys,
            });
          }
        }
      } else
        toast.error(
          e.data?.client_error?.message ?? e.data?.client_error?.description
        );
    },
  });
  const onSubmitAddAction = (isHave: boolean, data: any) => {
    isHave
      ? removeAction.mutate(data, {
          onSuccess: async () => {
            toast.success("Student action deleted");
            if (clientUpdate && tableKey) {
              removeContactLabel({
                apiKey: tableKey,
                type: data?.type,
                user_id: data?.id,
                queryClient,
                page,
              });
            } else {
              if (Array.isArray(queryKeys)) {
                for (let i = 0; i < queryKeys.length; i++) {
                  queryClient.invalidateQueries({
                    queryKey: [queryKeys[i]],
                  });
                }
              } else {
                queryClient.invalidateQueries({
                  queryKey: queryKeys,
                });
              }
            }
          },
        })
      : addAction.mutate(data);
  };
  const onRemovePotential = (isHave: boolean, data: any) => {
    removePotential.mutate(data, {
      onSuccess: async () => {
        toast.success("Student action deleted");
        if (clientUpdate && tableKey) {
          removeContactLabel({
            apiKey: tableKey,
            type: data?.type,
            user_id: data?.id,
            queryClient,
            page,
          });
        } else {
          if (Array.isArray(queryKeys)) {
            for (let i = 0; i < queryKeys.length; i++) {
              queryClient.invalidateQueries({
                queryKey: [queryKeys[i]],
              });
            }
          } else {
            queryClient.invalidateQueries({
              queryKey: queryKeys,
            });
          }
        }
      },
    });
  };

  const paintObject = !isSelectableNoneColor
    ? {
        defaultValue: paint,
        isOpen: paint?.color,
        colored: !!paint?.color,
      }
    : {};

  const elements = {
    start_date: (
      <StartDate
        key={`start_date_${userId}_key`}
        defaultValue={startDate}
        size={size}
        isOpen={startDate}
        label={
          startDate && moment(startDate.datetime).format(DATE_FORMAT_SHOW_MMM)
        }
        onChange={(date) => {
          onSubmitAddAction?.(!!startDate, {
            id: userId,
            datetime: moment(new Date(date)).format(DATE_FORMAT_YYYY_MM_DD),
            type: LABEL_START_DATE,
          });
        }}
      />
    ),
    will_pay: (
      <WillPay
        key={`will_pay_${userId}_key`}
        defaultValue={willPay}
        isOpen={willPay}
        size={size}
        label={
          willPay &&
          moment(new Date(willPay.datetime)).format(DATE_FORMAT_STANDARD)
        }
        onChange={(date) => {
          onSubmitAddAction?.(!!willPay, {
            id: userId,
            datetime: moment(new Date(date)).format(DATE_FORMAT_YYYY_MM_DD),
            type: LABEL_WILL_PAY,
          });
        }}
      />
    ),
    not_answered: (
      <NotAnswered
        key={`not_answered_${userId}_key`}
        defaultValue={notAnswer}
        size={size}
        label={
          notAnswer &&
          moment(notAnswer.datetime, DATE_FORMAT_CREATED_AT).format(
            DATE_FORMAT_DD_MMM_HH_mm
          )
        }
        isOpen={notAnswer}
        onClick={() => {
          onSubmitAddAction?.(!!notAnswer, {
            id: userId,
            datetime: moment().format(DATE_FORMAT_CREATED_AT),
            type: LABEL_NOT_ANSWERED,
          });
        }}
      />
    ),
    checked: (
      <CheckedLabel
        key={`checked_${userId}_key`}
        defaultValue={checked}
        size={size}
        label={
          checked &&
          moment(checked.datetime, DATE_FORMAT_CREATED_AT).format(
            DATE_FORMAT_DD_MM_HH_mm
          )
        }
        isOpen={checked}
        onClick={() => {
          onSubmitAddAction?.(!!checked, {
            id: userId,
            datetime: moment().format(DATE_FORMAT_CREATED_AT),
            type: LABEL_CHECKED,
          });
        }}
      />
    ),
    podo: (
      <Podo
        key={`podo_${userId}_key`}
        defaultValue={podo}
        size={size}
        label={
          podo &&
          moment(podo.datetime, DATE_FORMAT_CREATED_AT).format(
            DATE_FORMAT_SHOW_MMM
          )
        }
        disabled={disabledLabels?.podo}
        isOpen={podo}
        onClick={() => {
          if (!disabledActions && can_manage_user_label) {
            !!podo
              ? onSubmitAddAction?.(!!podo, {
                  id: userId,
                  datetime: moment(new Date(new Date())).format(
                    DATE_FORMAT_CREATED_AT
                  ),
                  type: LABEL_PODO,
                })
              : dispatch(
                  toggleModal({
                    key: "podo",
                    data: {
                      data: {
                        user: data?.user,
                        student: data,
                        queryKeys,
                      },
                      open: true,
                    },
                  })
                );
          }
        }}
      />
    ),
    potential_fail: (
      <PotentialFail
        key={`potential_fail_${userId}_key`}
        defaultValue={potential_fail}
        size={size}
        label={
          potential_fail &&
          moment(potential_fail.datetime, DATE_FORMAT_CREATED_AT).format(
            DATE_FORMAT_SHOW_MMM
          )
        }
        disabled={disabledLabels?.potential_fail}
        isOpen={potential_fail}
        onClick={() => {
          if (!disabledActions && can_manage_potential_fail) {
            !!potential_fail
              ? onRemovePotential?.(!!potential_fail, {
                  id: userId,
                  datetime: moment(new Date(new Date())).format(
                    DATE_FORMAT_CREATED_AT
                  ),
                  type: LABEL_POTENTIAL_FAIL,
                })
              : dispatch(
                  toggleModal({
                    key: "potentialFail",
                    data: {
                      data: {
                        user: data?.user,
                        student: data,
                        queryKeys,
                      },
                      open: true,
                    },
                  })
                );
          }
        }}
      />
    ),
    call_request: (
      <CallRequest
        key={`call_request_${userId}_key`}
        defaultValue={callRequest}
        isOpen={callRequest}
        size={size}
        label={
          callRequest &&
          moment(callRequest.datetime, DATE_FORMAT_CREATED_AT).format(
            DATE_FORMAT_DD_MMM_HH_mm
          )
        }
        onChange={(date) => {
          onSubmitAddAction?.(!!callRequest, {
            id: userId,
            datetime: moment(new Date(new Date(date))).format(
              DATE_FORMAT_CREATED_AT
            ),
            type: LABEL_CALL_REQUEST,
          });
        }}
      />
    ),
    coming: (
      <Coming
        key={`coming_${userId}_key`}
        defaultValue={coming}
        size={size}
        isOpen={coming}
        label={
          coming &&
          moment(coming.datetime, DATE_FORMAT_CREATED_AT).format(
            DATE_FORMAT_SHOW_MMM
          )
        }
        onChange={(date) => {
          onSubmitAddAction?.(!!coming, {
            id: userId,
            datetime: moment(new Date(new Date(date))).format(
              DATE_FORMAT_CREATED_AT
            ),
            type: LABEL_COMING,
          });
        }}
      />
    ),
    colour_change: (
      <Paint
        key={`colour_change_${userId}_key`}
        size={size}
        onSubmit={(color: string) =>
          onSubmitAddAction(!!paint, {
            id: userId,
            color: color,
            type: LABEL_COLOR_CHANGE,
          })
        }
        {...paintObject}
      />
    ),
    lifecycle: (
      <LifeCycleLabel
        key={`lifecycle_${userId}_key`}
        size={size}
        onClick={() => {
          dispatch(
            toggleModal({
              key: "archiveLifeCycle",
              data: {
                data: {
                  id: userId,
                  queryKeys: queryKeys,
                  student: data,
                },
                open: true,
              },
            })
          );
        }}
      />
    ),
    giveStationary: (
      <GiveBook
        key={`give_stationary_${userId}_key`}
        size={size}
        count={countGivenBooksOnThisLevel}
        onClick={() => {
          dispatch(
            toggleModal({
              key: "giveStationary",
              data: {
                data: {
                  id: userId,
                  queryKeys: queryKeys,
                  student: data,
                },
                open: true,
              },
            })
          );
        }}
      />
    ),
    dont_take_mot: (
      <DontTakeMot
        key={`DONT_TAKE_MOT_${userId}_key`}
        defaultValue={mot}
        size={size}
        isOpen={mot}
        onClick={(date) => {
          onSubmitAddAction?.(!!mot, {
            id: userId,
            type: DONT_TAKE_MOT,
          });
        }}
      />
    ),
  };
  return (
    <IconWrapper className={className}>
      <div className="label">
        {Object.entries(studentLabels ?? {})
          ?.map(([key, value]) => ({ key, value }))
          ?.map((item) => {
            if (item.value) {
              return elements[item.key as keyof typeof elements];
            }
          })}
      </div>
    </IconWrapper>
  );
};

export default CellActions;
