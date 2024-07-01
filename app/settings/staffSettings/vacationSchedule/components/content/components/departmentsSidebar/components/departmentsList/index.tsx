import React, { FC, memo } from "react";
import { DepartmentsWrapper } from "./style";
import { InputWithIcon, SearchSvg } from "components";
import { Affix, Anchor } from "antd";
import Sidebar from "./sidebar";
import { Control } from "react-hook-form";
import { CreateVacationModal, SlotSettingsModal } from "../../../index";
import { useAppSelector } from "store";

interface IProps {
  control: Control;
  sidebarItems?: any[];
}

const DepartmentsList = memo((props: IProps) => {
  const modals = useAppSelector((state) => state.modals);
  const { control, sidebarItems } = props;

  return (
    <Affix offsetTop={70}>
      <DepartmentsWrapper>
        <div className="header">
          <p className="title-department">Departments</p>
        </div>
        <div className="body">
          <div className="search">
            <InputWithIcon
              icon={SearchSvg}
              name="search"
              control={control}
              placeholder="Search"
            />
          </div>
          <ul>
            <Anchor affix={false} offsetTop={125}>
              <Sidebar sidebarItems={sidebarItems} />
            </Anchor>
          </ul>
        </div>
      </DepartmentsWrapper>
      {modals.slotCreateModal ? <SlotSettingsModal /> : null}
      {modals.createVacationModal ? <CreateVacationModal /> : null}
    </Affix>
  );
});

export default DepartmentsList;
