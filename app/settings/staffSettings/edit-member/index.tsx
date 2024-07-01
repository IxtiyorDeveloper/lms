import React from "react";
import { Wrapper, CardTopSide } from "./style";
import { useGetOneAssignment, useInitialData } from "hooks";
import { useRouter } from "next/router";
import { Segmented } from "components";
import { Tabs } from "./tabs";
import {
  PersonalInfo,
  AcademicInfo,
  ExperienceInfo,
  EducationInfo,
  DocumentsInfo,
  FamilyInfo,
  MainLifeCycle,
  UserMainTitle,
  LifeCycle,
} from "./components";
import OfficeHours from "globals/components/officeHours";
import { CreateStaffJobType, StaffType } from "constants/settings";
import {
  checkTabPermission,
  getFirstAvailableTab,
  getMenu,
  typeSelect,
} from "./data";

const EditStaff = () => {
  const router = useRouter();

  const routerFiltered = {
    id: router.query.staffId,
    staff_tab: null,
  };

  const { data: dataGetOne, isLoading } = useGetOneAssignment(routerFiltered);

  const { data: initialData } = useInitialData();

  const currentTab = router.query.staff_tab?.toString() || Tabs.PERSONAL;

  const tabContents = {
    [Tabs.PERSONAL]: (
      <PersonalInfo dataGetOne={dataGetOne} isLoading={isLoading} />
    ),
    [Tabs.ACADEMIC]: (
      <AcademicInfo dataGetOne={dataGetOne} isLoading={isLoading} />
    ),
    [Tabs.DOCUMENT]: (
      <DocumentsInfo dataGetOne={dataGetOne} isLoading={isLoading} />
    ),
    [Tabs.EDUCATION]: (
      <EducationInfo dataGetOne={dataGetOne} isLoading={isLoading} />
    ),
    [Tabs.FAMILY]: (
      <FamilyInfo
        data={dataGetOne}
        initialData={initialData}
        isLoading={isLoading}
      />
    ),
    [Tabs.WORK_EXPERIENCE]: (
      <ExperienceInfo dataGetOne={dataGetOne} isLoading={isLoading} />
    ),
    [Tabs.LIFE_CYCLE]: <LifeCycle dataGetOne={dataGetOne} />,
    undefined: (
      <p style={{ textAlign: "center" }}>
        {isLoading ? "Loading..." : "No Permission"}
      </p>
    ),
  };

  const staffType =
    typeSelect[
      StaffType[
        +(
          dataGetOne?.staff?.job_type || CreateStaffJobType.official
        ) as keyof typeof StaffType
      ] as keyof typeof typeSelect
    ];

  return (
    <Wrapper>
      <CardTopSide>
        <UserMainTitle dataGetOne={dataGetOne} staffType={staffType} />
        <MainLifeCycle dataGetOne={dataGetOne} staffType={staffType} />
        <OfficeHours />
        <Segmented
          options={getMenu(dataGetOne)}
          initValue={currentTab}
          routerKey="staff_tab"
          block
        />
      </CardTopSide>
      <div className="content">
        {checkTabPermission(currentTab, dataGetOne)
          ? tabContents?.[currentTab as keyof typeof tabContents]
          : tabContents?.[
              getFirstAvailableTab(dataGetOne) as keyof typeof tabContents
            ]}
      </div>
    </Wrapper>
  );
};

export default EditStaff;
