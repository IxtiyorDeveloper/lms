import React from "react";
import { AntdModal, AntdTable, Button } from "components";
import { useDispatch, useSelector } from "react-redux";
import { IStore, toggleModal } from "store";
import { ButtonWrapper, LifeCycleWrapper } from "./style";
import Columns from "./columns";
import { IObjTimeTable } from "types";
import { ToHourMinute } from "utils/toHourMinute";
import { bgColors, textColors } from "styles/theme";

const OfficeHours = () => {
  const dispatch = useDispatch();
  const {
    officeHours: { open, data },
  } = useSelector((state: IStore) => state.modals);
  const handleClose = () => {
    dispatch(
      toggleModal({
        key: "officeHours",
        data: {
          data: {},
          open: false,
        },
      })
    );
  };
  const dataSource = data as IObjTimeTable;
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
          <p className="title">Timetable</p>
          <p className="time">
            ({ToHourMinute(dataSource?.officeHour?.time || "")})
          </p>
        </div>
        <div className="lifecycle-table">
          <AntdTable
            dataSource={dataSource?.officeHour?.activeOfficeHourCandidates}
            columns={Columns()}
          />
        </div>
        <ButtonWrapper>
          <Button
            onClick={handleClose}
            textColor={textColors.yourShadow}
            bgColor={bgColors.wildSand}
          >
            Close
          </Button>
        </ButtonWrapper>
      </LifeCycleWrapper>
    </AntdModal>
  );
};

export default OfficeHours;
