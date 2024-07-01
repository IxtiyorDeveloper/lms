import React, { useState } from "react";
import { AntdModal, AntdTable, RedBadgeTitle, SelectMonth } from "components";
import { useDispatch, useSelector } from "react-redux";
import { IStore, toggleModal } from "store";
import { LifeCycleWrapper } from "./style";
import moment from "moment/moment";
import { DATE_FORMAT_MMMM_YYYY_MONTH_SELECT } from "constants/dates";
import { useFreshmanList } from "hooks";
import Columns from "./columns";
import { useRouter } from "next/router";
import { expand } from "app/statistics/dashboard/freshmanLost/freshman/expand";
import { getMonth } from "utils/getDates";
import { funcCheckPermission } from "utils";
import { COMPONENTS_VIEWS } from "constants/permissions";

const FreshmanForProfile = () => {
  const router = useRouter();
  const [month, setMonth] = useState<string>(
    moment().format(DATE_FORMAT_MMMM_YYYY_MONTH_SELECT)
  );
  const can_see_dashboard_own_student_flow = funcCheckPermission([
    COMPONENTS_VIEWS.can_see_dashboard_own_student_flow,
  ]);
  const dispatch = useDispatch();
  const {
    freshmanForProfile: { open, data },
  } = useSelector((state: IStore) => state.modals);

  const {
    data: freshman,
    isLoading,
    isPreviousData,
  } = useFreshmanList({
    toast_off: true,
    enabled: can_see_dashboard_own_student_flow,
    query_params: {
      created_by: data?.id,
      month: getMonth({
        format: DATE_FORMAT_MMMM_YYYY_MONTH_SELECT,
        date: month,
      }).month,
      year: getMonth({
        format: DATE_FORMAT_MMMM_YYYY_MONTH_SELECT,
        date: month,
      }).year,
      page: router?.query?.page || 1,
      "per-page": router?.query?.pageSize || 20,
      expand,
    },
  });
  const handleClose = () => {
    const { page, pageSize, ...rest } = router.query;
    router.replace({
      pathname: router.pathname,
      query: rest,
    });
    setMonth(moment().format(DATE_FORMAT_MMMM_YYYY_MONTH_SELECT));
    dispatch(
      toggleModal({
        key: "freshmanForProfile",
        data: {
          data: {},
          open: false,
        },
      })
    );
  };

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
          <RedBadgeTitle title="Freshman" count={freshman?.meta?.totalCount} />
          <SelectMonth
            initValue={month}
            onChange={(e) => {
              setMonth(e);
            }}
          />
        </div>
        <div className="lifecycle-table">
          <AntdTable
            dataSource={freshman?.list ?? []}
            columns={Columns()}
            loading={isLoading || isPreviousData}
            pagination={{
              current: freshman?.meta?.currentPage,
              total: freshman?.meta?.totalCount,
            }}
          />
        </div>
      </LifeCycleWrapper>
    </AntdModal>
  );
};

export default FreshmanForProfile;
