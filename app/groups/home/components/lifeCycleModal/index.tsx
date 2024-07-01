import * as React from "react";
import { LifeCycleModal } from "./type";
import { AntdModal, AntdTable, Button, SelectMonth } from "components";
import {
  ModalTitle,
  ButtonWrapper,
  RoundedWrapper,
  WrapperLifeCycleModal,
} from "./style";
import { bgColors, textColors } from "styles/theme";
import moment from "moment";
import { useGroupLifeCycle } from "hooks";
import { Spin } from "antd";
import { toggleModal, useAppSelector } from "store";
import { useDispatch } from "react-redux";
import { useRef, useState } from "react";
import Columns from "./columns";

const LifeCycleModal = ({}: LifeCycleModal) => {
  const ref = useRef<any>();
  const dispatch = useDispatch();
  const {
    groupLifeCycle: { open, data: modalData },
  } = useAppSelector((state) => state.modals);
  const [date, setDate] = useState<{ year: string; month: string }>({
    year: moment().format("YYYY"),
    month: moment().format("MM"),
  });

  const { isLoading, data: leadHistory } = useGroupLifeCycle({
    query_params: {
      ...date,
      group_id: modalData.id,
      expand: "createdBy",
    },
    enabled: open,
    keepPreviousData: true,
  });
  const handleClose = () => {
    dispatch(
      toggleModal({
        key: "groupLifeCycle",
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
      afterClose={() => ref.current?.reset()}
      onCancel={handleClose}
      centered
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
          <AntdTable columns={Columns} dataSource={leadHistory || []} />
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
export default LifeCycleModal;
