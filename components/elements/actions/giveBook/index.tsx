import React, { FC, useEffect, useState } from "react";
import { TIcon } from "types";
import { Wrapper } from "./style";
import { BookSvg } from "@jasurbekyuldashov/lms-web-icons";
import { Popover } from "antd";
import Form from "./components/form";
import { IStationaryHistory } from "types/student";
import { bgColors } from "styles/theme";
import AntdBadge from "../../../common/antdBadge";
interface IProps {
  data?: IStationaryHistory;
  queryKeys?: string[];
  count?: number;
}

const GiveBook: FC<TIcon & IProps> = ({
  size,
  setClicked,
  clicked,
  onClick,
  count = 0,
}) => {
  const s = size === "small" ? "30" : size === "medium" ? "20" : "20";
  const [isPressed, setIsPressed] = useState(false);

  useEffect(
    () => setClicked?.({ ...clicked, deleteCircle: isPressed }),
    [isPressed]
  );

  return (
    <Popover
      trigger="click"
      destroyTooltipOnHide
      placement="bottomRight"
      // content={<Form data={data} student_id={userId} queryKeys={queryKeys} />}
    >
      <Wrapper
        size={size}
        clicked={false}
        onClick={() => {
          setIsPressed(!isPressed);
          onClick?.();
        }}
        count={count}
      >
        <AntdBadge content={count} size="small" showZero={false} />
        <BookSvg
          color={count > 0 ? bgColors.vermin : bgColors.black}
          width={s}
          height={s}
        />
      </Wrapper>
    </Popover>
  );
};

export default GiveBook;
