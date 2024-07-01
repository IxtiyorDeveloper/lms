import React from "react";
import { AntdModal, AntdTable, SelectMonth } from "components";
import { useDispatch, useSelector } from "react-redux";
import { IStore, toggleModal } from "store";
import { BodyWrapper, HeaderWrapper, Title } from "./style";
import moment from "moment/moment";
import { handleNavigateMonth } from "utils/handleNavigateMonth";
import { useRouter } from "next/router";
import { useGetAdminUsers } from "hooks";
import { Columns } from "./columns";

const TaskUsersModal = () => {
  const dispatch = useDispatch();
  const router = useRouter();

  const {
    taskUsers: { data, open },
  } = useSelector((store: IStore) => store.modals);

  const handleClose = () => {
    dispatch(
      toggleModal({
        key: "taskUsers",
        data: {
          data: {},
          open: false,
        },
      })
    );
  };

  const { data: usersData, isLoading } = useGetAdminUsers({
    query_params: {
      user_type: data?.user_type,
      category_id: data?.category_id,
      year: router.query?.year,
      month: router.query?.month,
    },
  });

  const dataStatus = {
    200: "Responsible",
    500: "Supervisor",
  };

  return (
    <AntdModal width={900} open={open} onCancel={handleClose}>
      <HeaderWrapper>
        <Title>{dataStatus[data?.user_type as keyof typeof dataStatus]}</Title>
        <SelectMonth
          initValue={moment(
            `${router.query.year || moment().year()} ${
              router.query.month || moment().month() + 1
            }`,
            "YYYY MM"
          ).format("MMMM YYYY")}
          onChange={(e) =>
            handleNavigateMonth({ e, router, queryKey: ["year", "month"] })
          }
        />
      </HeaderWrapper>
      <BodyWrapper>
        <AntdTable
          rowClassName="class"
          columns={Columns()}
          bordered
          dataSource={usersData}
        />
      </BodyWrapper>
    </AntdModal>
  );
};

export default TaskUsersModal;
