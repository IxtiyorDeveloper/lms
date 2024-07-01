import React, { useState } from "react";
import { AntdModal, AntdTable, RedBadgeTitle, SelectMonth } from "components";
import { useDispatch, useSelector } from "react-redux";
import { IStore, toggleModal } from "store";
import { LifeCycleWrapper } from "./style";
import moment from "moment/moment";
import {
  DATE_FORMAT_MMMM_YYYY_MONTH_SELECT,
  DATE_FORMAT_YYYY_MM_DD,
} from "constants/dates";
import { useLeadLists } from "hooks";
import Columns from "./columns";
import { useRouter } from "next/router";
import { funcCheckPermission } from "../../../utils";
import { COMPONENTS_VIEWS } from "../../../constants/permissions";

const RegisteredLead = () => {
  const can_see_lead = funcCheckPermission([COMPONENTS_VIEWS.can_see_lead]);

  const router = useRouter();
  const [month, setMonth] = useState<string>(
    moment().format(DATE_FORMAT_MMMM_YYYY_MONTH_SELECT)
  );
  const dispatch = useDispatch();
  const {
    registeredLead: { open, data },
  } = useSelector((state: IStore) => state.modals);
  const handleClose = () => {
    const { page, pageSize, ...rest } = router.query;
    router.replace({
      pathname: router.pathname,
      query: rest,
    });
    setMonth(moment().format(DATE_FORMAT_MMMM_YYYY_MONTH_SELECT));
    dispatch(
      toggleModal({
        key: "registeredLead",
        data: {
          data: {},
          open: false,
        },
      })
    );
  };

  const currenMonth = moment();
  const startOfMonth = moment(month).startOf("month");
  const today =
    moment(month).month() == currenMonth?.month()
      ? currenMonth
      : moment(month).endOf("month");

  const {
    isLoading: isLoading,
    isPreviousData,
    data: leads,
  } = useLeadLists({
    toast_off: true,
    enabled: can_see_lead,
    query_params: {
      start_date: startOfMonth.format(DATE_FORMAT_YYYY_MM_DD),
      end_date: today.format(DATE_FORMAT_YYYY_MM_DD),
      updated_by: data?.id,
      status: 400,
      pageSize: 20,
      ...router.query,
    },
  });

  return (
    <AntdModal
      open={open}
      onCancel={handleClose}
      centered
      width="60%"
      padding="2px"
    >
      <LifeCycleWrapper>
        <div className="top">
          <RedBadgeTitle
            title="Registered leads"
            count={leads?.meta?.totalCount}
          />
          <SelectMonth
            initValue={month}
            onChange={(e) => {
              setMonth(e);
            }}
          />
        </div>
        <div className="lifecycle-table">
          <AntdTable
            dataSource={leads?.list ?? []}
            columns={Columns()}
            loading={isLoading || isPreviousData}
            pagination={{
              current: leads?.meta?.currentPage,
              total: leads?.meta?.totalCount,
            }}
          />
        </div>
      </LifeCycleWrapper>
    </AntdModal>
  );
};

export default RegisteredLead;
