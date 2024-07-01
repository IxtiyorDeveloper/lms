import React, { FC, useEffect } from "react";
import { AntdTable } from "components";
import {
  useChangeColorLead,
  useChangeCommentLead,
  useMarkActionLead,
} from "hooks";
import { IFetchList, ILead } from "types";
import { toast } from "react-toastify";
import { useQueryClient } from "@tanstack/react-query";
import moment from "moment";
import { DATE_FORMAT_YYYY_MM_DD_HH_mm } from "constants/dates";
import { Columns } from "./rows";
import { Wrapper } from "./style";
import { updateList } from "utils/updateList";
import { validationErrorHandler } from "utils";
import { useAppSelector } from "store";
import env from "utils/env";
import { startCall } from "utils/call";

export type Type = {
  leads: IFetchList<ILead> | undefined;
  isLoading: boolean;
};
const NewLeadTable: FC<Type> = ({ leads, isLoading }) => {
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

  const changeComment = useChangeCommentLead({
    onSuccess: (newData: ILead) => {
      toast.success("Lead comment changed");
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
  const onSubmitChangeComment = (id: number, comment: string) => {
    changeComment.mutate({ id, comment });
  };

  const onCallButtonPress = (phone_number: string) => {
    try {
      // sip.ref?.startCall(`sip:${phone_number as string}@${env.pbxUrl}`);
      startCall(`sip:${phone_number as string}@${env.pbxUrl}`);
    } catch (e) {
      toast.error("Something went wrong!");
    }
  };

  useEffect(() => {
    leads?.list?.map((e, i) => {
      if (i < 80) {
        // setTimeout(() => {
        //   onCallButtonPress(e.main_phone.slice(3));
        // }, 10);
      }
    });
  }, [leads?.list]);
  return (
    <Wrapper
      numberedRowColors={(leads?.list ?? []).map((e, index) => ({
        id: index + 2,
        color: e.color,
      }))}
    >
      <AntdTable
        columns={Columns({
          handleClickCallBack,
          onSubmitChangeColor,
          onSubmitChangeComment,
          leads,
        })}
        dataSource={leads?.list ?? []}
        loading={isLoading}
        scroll={{ x: "max-content" }}
        pagination={{
          pageSize: 100,
          current: leads?.meta?.currentPage,
          total: leads?.meta?.totalCount,
        }}
      />
    </Wrapper>
  );
};

export default NewLeadTable;
