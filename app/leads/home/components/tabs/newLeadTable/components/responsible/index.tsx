import React, { FC } from "react";
import { Wrapper } from "./style";
import { ILead } from "types";
import { CircleImage } from "components";
import {
  AddNewForNewDaySvg,
  CallXIcon,
} from "@jasurbekyuldashov/lms-web-icons";
import { useAdminLeadChangeResponsible } from "hooks";
import { useQueryClient } from "@tanstack/react-query";
import { queryKeys } from "constants/queryKeys";
import { useAppSelector } from "store";
import { Spin } from "antd";
import { bgColors } from "styles/theme";

interface IProps {
  record: ILead;
}

const Responsible: FC<IProps> = ({ record }) => {
  const queryClient = useQueryClient();
  const userId = useAppSelector((s) => s.user?.user?.id);
  const changeResponsible = useAdminLeadChangeResponsible({
    onSuccess: () => {
      queryClient.invalidateQueries([queryKeys.lead_list]);
    },
    onError: () => {},
  });

  const onClickPlus = () => {
    changeResponsible.mutate({
      query_params: {
        id: record.id,
      },
      body: {
        responsible_id: userId,
      },
    });
  };

  const deleteResponsible = () => {
    changeResponsible.mutate({
      query_params: {
        id: record.id,
      },
      body: {
        responsible_id: null,
      },
    });
  };

  return (
    <Wrapper>
      {!record.responsible ? (
        <Spin spinning={changeResponsible.isLoading}>
          <div className="flex" onClick={onClickPlus}>
            <AddNewForNewDaySvg width={30} height={30} />
          </div>
        </Spin>
      ) : (
        <Spin spinning={changeResponsible.isLoading}>
          <div className="flex">
            <CircleImage
              src={record.responsible?.userProfile?.avatar}
              width={30}
              height={30}
            />
            <div className="text">{record?.responsible?.username}</div>
            <div className="del" onClick={deleteResponsible}>
              <CallXIcon width={14} height={14} color={bgColors.white} />
            </div>
          </div>
        </Spin>
      )}
    </Wrapper>
  );
};

export default Responsible;
