import React, { FC } from "react";
import { AntdTable } from "components";
import { IFetchList, ILead } from "types";
import Columns from "./columns";
import { useChangeColorLead, useMarkActionLead } from "hooks";
import { toast } from "react-toastify";
import { validationErrorHandler } from "utils";
import { useQueryClient } from "@tanstack/react-query";
import { updateList } from "utils/updateList";
import { Wrapper } from "./../newLeadTable/style";
import moment from "moment/moment";
import { DATE_FORMAT_YYYY_MM_DD_HH_mm } from "constants/dates";

export type Type = {
  leads: IFetchList<ILead> | undefined;
  isLoading: boolean;
};

const DeletedLeadTable: FC<Type> = ({ leads, isLoading }) => {
  const queryClient = useQueryClient();

  const changeColor = useChangeColorLead({
    onSuccess: (newData: ILead) => {
      toast.success("Lead color changed");
      updateList({
        apiKey: "lead-list",
        newData,
        queryClient,
      });
      // queryClient.invalidateQueries({ queryKey: ["lead-list"] });
    },
    onError: (err) => {
      validationErrorHandler({ err });
    },
  });

  const onSubmitChangeColor = (id: number, color: string) => {
    changeColor.mutate({ id, color });
  };

  const markAction = useMarkActionLead({
    onSuccess: async (newData: ILead) => {
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

  const handleClickCallBack = (id: number, action: number, date: Date) => {
    markAction.mutate({
      action,
      id,
      date: moment(new Date(date)).format(DATE_FORMAT_YYYY_MM_DD_HH_mm),
    });
  };

  return (
    <Wrapper
      numberedRowColors={(leads?.list ?? []).map((e, index) => ({
        id: index + 2,
        color: e.color,
      }))}
    >
      <AntdTable
        columns={Columns({ onSubmitChangeColor, handleClickCallBack })}
        dataSource={leads?.list || []}
        pagination={{
          pageSize: 100,
          current: leads?.meta?.currentPage,
          total: leads?.meta?.totalCount,
        }}
        loading={isLoading}
      />
    </Wrapper>
  );
};

export default DeletedLeadTable;
