import React from "react";
import { Wrapper } from "./style";
import { Flex, Progress } from "antd";
import StatusButton from "../statusButton";
import { EXAM_PROCESS } from "constants/exam";
import { bgColors } from "styles/theme";
import { CircleImage } from "components";

const ModalHeader = ({
  progress,
  avatar,
  first_name,
  last_name,
  status,
  level,
}: {
  progress: number;
  avatar: string | undefined;
  first_name: string | undefined;
  last_name: string | undefined;
  level: string | undefined;
  status?: number;
}) => {
  return (
    <Wrapper>
      <Flex gap={12}>
        <CircleImage width={44} height={44} src={avatar} />
        <div>
          <Flex gap={12} align="center">
            <h3 className="name">
              {first_name} {last_name}
            </h3>
            <StatusButton status={status} />
          </Flex>
          <p className="level">{level}</p>
        </div>
      </Flex>

      <Progress
        showInfo
        size={47}
        type="circle"
        strokeWidth={10}
        percent={progress}
        strokeColor={
          status == EXAM_PROCESS.SUCCESS ? bgColors.midori : bgColors.red
        }
      />
    </Wrapper>
  );
};

export default ModalHeader;
