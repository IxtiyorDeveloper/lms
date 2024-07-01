import React, { FC } from "react";
import { useGetSlotsByPeriod } from "hooks";
import { Spin } from "antd";
import { slotOptionCreator } from "utils/functions/fetchSearchFields";
import moment from "moment";

interface IProps {
  roleId: number;
  roleShiftId: number | null;
  month: string;
  assignment?: any;
}

const HoverContent: FC<IProps> = (props) => {
  const { roleId, roleShiftId, assignment, month } = props;

  const { data: slotData, isLoading } = useGetSlotsByPeriod({
    query_params: {
      role_id: roleId,
      role_shift_id: roleShiftId,
    },
  });

  const slots = slotOptionCreator(
    slotData,
    moment(month, "MMM_YYYY").format("DD-MM-YYYY"),
    true,
    assignment,
  );

  const slotsFilter = slots?.filter((f) =>
    moment(f.additional?.from_date).isSame(moment(month, "MMM_YYYY"), "month"),
  );

  return (
    <Spin spinning={isLoading}>
      <div>
        {slotsFilter?.length === 0 && (
          <p style={{ textAlign: "center" }}>No Data</p>
        )}
        {slotsFilter?.map((slot) => {
          return <div key={slot.value}>{slot.label}</div>;
        })}
      </div>
    </Spin>
  );
};

export default HoverContent;
