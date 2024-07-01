import React, { useEffect, useState } from "react";
import { Wrapper, TabHeader, containerStyles } from "./style";
import { RoundedTab } from "components";
import { bgColors } from "styles/theme";
import { Registering, Staff } from "./components";
import { useInitialData } from "hooks";
import { ITypeStaffWorkingStatus } from "types/staffSettings";
import { TModalType } from "../../../types/modal";
import { DepartmentModal } from "./components/staff";
import { useForm } from "react-hook-form";
import HeadSite from "./components/staff/components/headSite";
import { useRouter } from "next/router";

const StaffSettings = () => {
  const router = useRouter();
  const { data: initialData, isLoading } = useInitialData();

  const {
    control,
    handleSubmit,
    formState: { errors },
    reset: departmentReset,
  } = useForm();

  const [modals, setModals] = useState<{ [key: string]: any }>({
    departmentModal: false,
    deleteModal: {
      isOpen: false,
      id: null,
    },
  });

  const handleClose = (type: DepartmentModal) => {
    switch (type) {
      case "departmentModal":
        departmentReset();
        return setModals({
          ...modals,
          departmentModal: { isOpen: false },
        });
    }
    switch (type) {
      case "deleteModal":
        return setModals({
          ...modals,
          deleteModal: {
            isOpen: false,
            id: null,
          },
        });
    }
  };

  const handleOpen = (
    type: DepartmentModal,
    id?: number,
    modalType?: TModalType,
    data?: any,
  ) => {
    switch (type) {
      case "departmentModal":
        return setModals({
          ...modals,
          departmentModal: {
            isOpen: true,
            id,
            type: modalType,
            data,
          },
        });
    }
    switch (type) {
      case "deleteModal":
        return setModals({
          ...modals,
          deleteModal: {
            isOpen: true,
            id,
          },
        });
    }
  };

  const handleChangeStatus = () => {
    delete router.query?.status;
    router.push({
      query: router.query,
    });
  };

  useEffect(() => {
    handleChangeStatus();
  }, [router.query?.roundedTabIndex]);

  /**
   * Bu yerda <Staff /> componenti ham staff va ham archived tablari uchun
   * bir xilda ishlaydi va bitta component
   * **/
  const tabs = [
    {
      children: <Registering initialData={initialData} loading={isLoading} />,
      title: (isActive: boolean) => (
        <TabHeader isActive={isActive} color={bgColors.primary}>
          Registering ({initialData?.statusCountList[0]?.count})
        </TabHeader>
      ),
    },
    {
      children: (
        <Staff
          status={ITypeStaffWorkingStatus.WORKING}
          initialData={initialData}
          loading={isLoading}
          handleOpen={handleOpen}
          handleClose={handleClose}
          modals={modals}
          handleSubmit={handleSubmit}
          errors={errors}
          control={control}
        />
      ),
      title: (isActive: boolean) => (
        <TabHeader isActive={isActive} color={bgColors.midori}>
          Staff ({initialData?.statusCountList[1]?.count})
        </TabHeader>
      ),
    },
    {
      children: (
        <Staff
          status={ITypeStaffWorkingStatus.ARCHIVED}
          initialData={initialData}
          loading={isLoading}
          handleOpen={handleOpen}
          handleClose={handleClose}
          modals={modals}
          handleSubmit={handleSubmit}
          errors={errors}
          control={control}
        />
      ),
      title: (isActive: boolean) => (
        <TabHeader isActive={isActive} color={bgColors.blueGray}>
          Archived ({initialData?.statusCountList[2]?.count})
        </TabHeader>
      ),
    },
  ];

  return (
    <Wrapper>
      <HeadSite handleOpen={() => handleOpen("departmentModal", 1, "add")} />
      <RoundedTab containerStyle={containerStyles} tabs={tabs} />
    </Wrapper>
  );
};

export default StaffSettings;
