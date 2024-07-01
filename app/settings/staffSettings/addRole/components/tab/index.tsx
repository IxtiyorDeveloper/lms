import React, { FC, useCallback } from "react";
import { Segmented } from "components";
import { Collapse } from "antd";
import { CaretRightOutlined } from "@ant-design/icons";
import { bgColors } from "styles/theme";
import { PanelWrapper } from "../../style";
import { SearchInput } from "../searchInput";
import { useRouter } from "next/router";
import HrPermissions from "../hrPermissions";
import LmsPermissions from "../lmsPermissions";
import debounce from "lodash/debounce";
import { IRole } from "types";
import TaskPermissions from "../taskPermissions";
import { AntPanel } from "../../../components/staff/components/departmentList/style";
import { panelStyle } from "../../../components/staff/components/departmentList";
import StockPermissions from "../stockPermissions";
import HammerPermissions from "../hammerPermissions";

const ProjectTabs: FC<{ dataOne?: IRole }> = ({ dataOne }) => {
  const router = useRouter();

  const onChangeSearch = useCallback(
    debounce((e) => {
      router.replace({
        pathname: router.pathname,
        query: {
          ...router.query,
          search: e,
        },
      });
    }, 300),
    [],
  );

  const options = [
    {
      value: "LMS",
      label: "LMS",
      children: (
        <div className="padding-top">
          <SearchInput
            onChange={onChangeSearch}
            defaultValue={router.query.search as string}
          />
          <LmsPermissions dataOne={dataOne} />
        </div>
      ),
    },
    {
      value: "ARS",
      label: "ARS",
      children: (
        <div className="padding-top">
          <SearchInput
            onChange={onChangeSearch}
            defaultValue={router.query.search as string}
          />
        </div>
      ),
    },
    {
      value: "HR",
      label: "HR",
      children: (
        <div className="padding-top">
          <SearchInput
            onChange={onChangeSearch}
            defaultValue={router.query.search as string}
          />
          <HrPermissions dataOne={dataOne} />
        </div>
      ),
    },
    {
      value: "Task",
      label: "Task",
      children: (
        <div className="padding-top">
          <SearchInput
            onChange={onChangeSearch}
            defaultValue={router.query.search as string}
          />
          <TaskPermissions dataOne={dataOne} />
        </div>
      ),
    },
    {
      value: "Stock",
      label: "Stock",
      children: (
        <div className="padding-top">
          <SearchInput
            onChange={onChangeSearch}
            defaultValue={router.query.search as string}
          />
          <StockPermissions dataOne={dataOne} />
        </div>
      ),
    },
    {
      value: "Analytics",
      label: "Analytics",
      children: (
        <div className="padding-top">
          <SearchInput
            onChange={onChangeSearch}
            defaultValue={router.query.search as string}
          />
          <HammerPermissions dataOne={dataOne} />
        </div>
      ),
    },
  ];

  return (
    <div className="mt">
      <Collapse
        bordered={false}
        accordion
        expandIcon={({ isActive }) => (
          <CaretRightOutlined rotate={isActive ? 90 : 0} />
        )}
        style={{ background: bgColors.transparent }}
      >
        <AntPanel
          header={<div style={{ display: "flex" }}>Permission</div>}
          style={panelStyle}
        >
          <PanelWrapper>
            <Segmented
              routerKey="projectId"
              initValue={router.query.projectId?.toString() || "LMS"}
              options={options}
            />
          </PanelWrapper>
        </AntPanel>
      </Collapse>
    </div>
  );
};

export default ProjectTabs;
