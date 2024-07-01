import React from "react";
import { Row, Wrapper } from "./style";
import { CircleImage } from "components";
import { toCurrencyFormat } from "utils/toCurrencyFormat";
import { ToHourMinute } from "utils/toHourMinute";
import { ICoverTeacherComponent } from "types/finance/salary";
import { EWhoCovered } from "../../type";
import moment from "moment/moment";
import { DATE_FORMAT_MMM_DD_YYYY } from "constants/dates";
import { OutgoingRestructuredObject } from "../functions";

const PopoverComponent = ({
  groups,
  type,
}: {
  groups: ICoverTeacherComponent[];
  type: EWhoCovered;
  mainCover?: OutgoingRestructuredObject;
}) => {
  return (
    <Wrapper>
      {groups?.map((item, index) => {
        const amount =
          type == EWhoCovered.COVERED
            ? parseFloat(item?.pair?.value ?? "0")
            : Math.abs(parseFloat(item?.value?.toString() ?? "0"));

        return (
          <Row key={index} hasBorder={groups?.length !== index + 1}>
            <p className="group-name">{item?.data?.group?.name}</p>
            <p className="time">
              {ToHourMinute(item?.data?.group?.time || "")}
            </p>
            <p className="time">
              {moment(item?.data?.date).format(DATE_FORMAT_MMM_DD_YYYY)}
            </p>
            <p
              className={`amount grotesk ${
                amount > 0
                  ? type == EWhoCovered.COVERED
                    ? "covered"
                    : "was-covered"
                  : "zero"
              }`}
            >
              {amount > 0 ? (type == EWhoCovered.COVERED ? "+" : "-") : ""}{" "}
              {toCurrencyFormat(amount)}
            </p>
            <div className="image-wr">
              <CircleImage
                src={
                  type == EWhoCovered.COVERED
                    ? item?.user_assignment?.user?.userProfile?.avatar
                    : item?.assignment?.user?.userProfile?.avatar
                }
                width={30}
                height={30}
              />
            </div>
          </Row>
        );
      })}
    </Wrapper>
  );
};

export default PopoverComponent;
