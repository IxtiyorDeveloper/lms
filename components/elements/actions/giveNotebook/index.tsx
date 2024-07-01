import React, { FC, useEffect, useState } from "react";
import { TIcon } from "types";
import { Wrapper } from "./style";
import { CopyBookSvg } from "@jasurbekyuldashov/lms-web-icons";
import { Popover } from "antd";
import Form from "./components/form";
import { IStationaryHistory } from "types/student";
interface IProps {
  data?: IStationaryHistory;
  queryKeys?: string[];
}

const GiveNotebook: FC<TIcon & IProps> = ({
  size,
  setClicked,
  clicked,
  onClick,
  data,
  userId,
  queryKeys,
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
      content={<Form data={data} student_id={userId} queryKeys={queryKeys} />}
    >
      <Wrapper
        size={size}
        clicked={false}
        onClick={() => {
          setIsPressed(!isPressed);
          onClick?.();
        }}
      >
        <CopyBookSvg width={s} height={s} />
      </Wrapper>
    </Popover>
  );
};

export default GiveNotebook;
