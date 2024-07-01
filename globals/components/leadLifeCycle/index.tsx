import * as React from "react";
import { LifeCycleModal } from "./type";
import {
  AntdModal,
  AntdTable,
  Button,
  Segmented,
  SelectMonth,
} from "components";
import {
  ModalTitle,
  ButtonWrapper,
  RoundedWrapper,
  WrapperLifeCycleModal,
} from "./style";
import { bgColors, textColors } from "styles/theme";
import moment from "moment";
import { useLeadCallHistory, useLeadHistory } from "hooks";
import { Spin } from "antd";
import { toggleLifecycleModal, useAppSelector } from "store";
import { useDispatch } from "react-redux";
import { useRef, useState } from "react";
import Columns from "./columns";
import CallColumns from "app/student/[studentId]/components/callTable/columns";

export enum TabType {
  MAIN = "main",
  CALL = "call",
}

const LeadLifeCycleModal = ({}: LifeCycleModal) => {
  const ref = useRef<any>();
  const dispatch = useDispatch();
  const [tab, setTab] = useState(TabType.MAIN);

  const { open, id } = useAppSelector((state) => state.ui.lifecycle);
  const [date, setDate] = useState<{ year: string; month: string }>({
    year: moment().format("YYYY"),
    month: moment().format("MM"),
  });

  const { isLoading, data: leadHistory } = useLeadHistory({
    id,
    open,
    ...date,
  });

  const { data: callList, isLoading: callLoading } = useLeadCallHistory({
    id,
    ...date,
    enabled: open && id && tab === TabType.CALL,
    expand: "createdBy.rbacAssignment.rbacRole,data",
  });

  const options = [
    {
      label: "Main",
      value: TabType.MAIN,
      children: (
        <AntdTable
          columns={Columns()}
          dataSource={leadHistory || []}
          scroll={{ y: 400 }}
        />
      ),
    },
    {
      label: "Call",
      value: TabType.CALL,
      children: (
        <AntdTable
          dataSource={callList ?? []}
          columns={CallColumns()}
          loading={callLoading}
          scroll={{ y: 400 }}
        />
      ),
    },
  ];

  const handleClose = () => {
    setTab(TabType.MAIN);
    dispatch(toggleLifecycleModal({ open: false, id: 0 }));
  };

  return (
    <AntdModal
      open={open}
      afterClose={() => ref.current?.reset()}
      onCancel={handleClose}
      width={880}
    >
      <Spin spinning={isLoading}>
        <WrapperLifeCycleModal>
          <ModalTitle>Lifecycle</ModalTitle>

          <SelectMonth
            ref={ref}
            initValue={moment().format("MMMM YYYY")}
            onChange={(date) => {
              const m = moment(date, "MMMM YYYY");
              setDate({ year: m.format("YYYY"), month: m.format("MM") });
            }}
          />
        </WrapperLifeCycleModal>

        <RoundedWrapper>
          <Segmented
            options={options}
            initValue={tab}
            onChange={(e: any) => setTab(e)}
            // routerKey="config_type"
          />
        </RoundedWrapper>

        <ButtonWrapper>
          <Button
            onClick={handleClose}
            style={{
              backgroundColor: bgColors.whiteSmoke,
              color: textColors.yourShadow,
            }}
          >
            Cancel
          </Button>
        </ButtonWrapper>
      </Spin>
    </AntdModal>
  );
};
export default LeadLifeCycleModal;
