import React, { FC } from "react";
import { PlaceBadge, Slots, SlotWrapper, Wrapper } from "./style";
import moment from "moment";

interface IProps {
  data: any;
}

const LabelSlotSearchSelect: FC<IProps> = (props) => {
  return (
    <Wrapper>
      <p className="label-title">
        {moment(props.data?.slotMonth?.split(":")[1]).format("MMMM YYYY")}
      </p>
      <Slots>
        <SlotWrapper>
          <p className="slot-name">
            {moment(props.data?.from_date).format("DD MMM")} -{" "}
            {moment(props.data?.to_date).format("DD MMM")}
          </p>
          <PlaceBadge>
            {props.data?.free_place} {props.data?.free_place > 1 ? "places" : "place"}{" "}
            left
          </PlaceBadge>
        </SlotWrapper>
      </Slots>
    </Wrapper>
  );
};

export default LabelSlotSearchSelect;
