import React, { memo, useMemo } from "react";
import { useForm } from "react-hook-form";
import { filterDuplicate } from "utils/filterDuplicate";
import { Wrapper } from "./style";
import { departmentAdaptor, departmentCollector } from "./functions";
import { DepartmentList, ScheduleTable } from "./components";
import { useGetScheduleData, useGetUserVacationDetails } from "hooks";
import moment from "moment/moment";
import { useRouter } from "next/router";
import { Spin } from "antd";

const DepartmentSidebar = memo(() => {
  const { control, watch } = useForm();
  const router = useRouter();

  const { data, isLoading: scheduleLoading } = useGetScheduleData({
    query_params: {
      year: router.query?.year || moment(new Date()).format("YYYY"),
      month: router.query?.month || moment(new Date()).format("MM"),
      only_expired: router.query?.is_expired === "true",
      branch_id: router.query?.branch_id,
      search: router.query?.search,
      degree: router.query?.degree,
    },
  });

  const sidebarItems: any[] | undefined = useMemo(() => {
    let departments: any = [];
    let sidebar: any = [];
    if (data) {
      departments = departmentCollector(data, departments);
      const temp = filterDuplicate(departments);
      sidebar = departmentAdaptor(data, sidebar, temp);

      return sidebar;
    }
  }, [data]);

  const { data: vacationListData, isLoading } = useGetUserVacationDetails({
    query_params: {
      branch_id: null,
      expand: "user,staff.working_periods,staff.vacation_status,createdBy",
    },
  });

  return (
    <Spin spinning={scheduleLoading || isLoading}>
      <Wrapper>
        <DepartmentList control={control} sidebarItems={sidebarItems} />
        <ScheduleTable
          control={control}
          sidebarItems={sidebarItems}
          vacationListData={vacationListData}
          data={data}
          watch={watch}
          loadVacation={isLoading}
        />
      </Wrapper>
    </Spin>
  );
});

export default DepartmentSidebar;
