import React, { FC } from "react";
import { PlaceBadge, SlotsCustom, SlotWrapper, WrapperCustom } from "./style";
import moment from "moment";
import { toggleModal } from "../../../store";
import { VacationModalType } from "../../../app/settings/staffSettings/vacationSchedule/components/content/components/modals/createVacation";
import { useDispatch } from "react-redux";

interface IProps {
  data: any;
  assignment?: any;
}

const LabelSlotHoveredMonth: FC<IProps> = (props) => {
  const dispatch = useDispatch();
  const handleOpenModal = () => {
    dispatch(
      toggleModal({
        key: "createVacationModal",
        data: {
          data: {
            user_id: props?.assignment?.user_id,
            role_id: props?.assignment?.rbac_role_id,
            role_shift_id: props?.assignment?.rbac_role_shift_id,
            recommended_date: props?.assignment?.staff?.recommended_date,
            slot_id: props?.data?.id,
            slot_option: readyContent,
            note: "",
            type: VacationModalType.CREATE,
          },
          open: true,
        },
      }),
    );
  };

  const readyContent = (
    <WrapperCustom onClick={handleOpenModal}>
      <SlotsCustom>
        <SlotWrapper>
          <p className="slot-name">
            {moment(props.data?.from_date).format("MMMM")}{" "}
            {moment(props.data?.from_date).format("DD")}-
            {moment(props.data?.to_date).format("DD")}{" "}
            <span className="year">
              {moment(props.data?.from_date).format("YYYY")}
            </span>
          </p>
          <PlaceBadge>
            {props.data?.free_place}{" "}
            {props.data?.free_place > 1 ? "places" : "place"} left
          </PlaceBadge>
        </SlotWrapper>
      </SlotsCustom>
    </WrapperCustom>
  );

  return readyContent;
};

export default LabelSlotHoveredMonth;
