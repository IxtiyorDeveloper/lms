import React from "react";
import { DeleteCircle, EditAction, LifeCycleLabel, Paint } from "components";
import { TParams } from "types";
import { IconWrapper } from "./style";
import { toggleModal } from "store";
import { useDispatch } from "react-redux";
import { useQueryClient } from "@tanstack/react-query";
import { useChangeExpenseColor } from "hooks";
import { toast } from "react-toastify";
import { validationErrorHandler } from "utils";

const ExpenseActions = ({
  activeActions,
  queryKeys,
  data,
  size = "small",
}: {
  activeActions: TParams;
  queryKeys?: string[];
  data?: any;
  size?: "small" | "medium";
}) => {
  const queryClient = useQueryClient();
  const dispatch = useDispatch();

  const color = data?.color;
  const id = data?.id;

  const changeExpenseColor = useChangeExpenseColor({
    onSuccess: () => {
      if (queryKeys)
        for (let i = 0; i < queryKeys?.length; i++) {
          queryClient.invalidateQueries([queryKeys[i]]);
        }
      toast.success("Success");
    },
    onError: (err) => {
      validationErrorHandler({ err });
    },
  });
  const onSubmit = (data: { color: string; id: number }) => {
    const { id, color } = data;
    changeExpenseColor.mutate({
      query_params: {
        id: id,
        expand: "linkedTasks",
      },
      body: {
        color,
      },
    });
  };
  const elements: TParams = {
    coloration: (
      <Paint
        key={`${id}_coloration`}
        size={size}
        onSubmit={(newColor) => {
          !color
            ? onSubmit({ id, color: newColor })
            : onSubmit({ id, color: "" });
        }}
        colored={color}
        isOpen={color}
      />
    ),
    edit: (
      <EditAction
        key={`${id}_edit`}
        size={size}
        onClick={() =>
          dispatch(
            toggleModal({
              key: "createExpense",
              data: {
                open: true,
                data: {
                  queryKeys: queryKeys,
                  action: "update",
                  id: id,
                },
              },
            })
          )
        }
      />
    ),
    delete: (
      <DeleteCircle
        key={`${id}_delete`}
        size={size}
        onClick={() =>
          dispatch(
            toggleModal({
              key: "deleteExpense",
              data: {
                open: true,
                data: {
                  id: id,
                },
              },
            })
          )
        }
      />
    ),
    lifecycle: (
      <LifeCycleLabel
        key={`lifecycle_${id}_key`}
        size={size}
        onClick={() => {
          dispatch(
            toggleModal({
              key: "transactionLifeCycle",
              data: {
                data,
                open: true,
              },
            })
          );
        }}
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

export default ExpenseActions;
