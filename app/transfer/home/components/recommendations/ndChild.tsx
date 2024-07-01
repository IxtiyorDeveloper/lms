import React, { FC } from "react";
import { Flex, TextWrapper } from "./style";
import { Button, CircleSuccessSvg } from "components";
import { INdChild } from "./type";

const NdChild: FC<INdChild> = ({ items }) => {
  return (
    <Flex>
      {items?.branch && (
        <Button
          bgColor={"rgba(221, 250, 220, 0.4)"}
          style={{
            boxShadow: "inset 0 0 16px rgba(145, 231, 158, 0.24)",
          }}
        >
          <CircleSuccessSvg height={16} width={16} />
          &nbsp;&nbsp;
          <TextWrapper>Branch</TextWrapper>
        </Button>
      )}
      {items?.level && (
        <Button
          bgColor={"rgba(221, 250, 220, 0.4)"}
          style={{
            boxShadow: "inset 0 0 16px rgba(145, 231, 158, 0.24)",
          }}
        >
          <CircleSuccessSvg height={16} width={16} />
          &nbsp;&nbsp;
          <TextWrapper>Level</TextWrapper>
        </Button>
      )}
      {items?.day && (
        <Button
          bgColor={"rgba(221, 250, 220, 0.4)"}
          style={{
            boxShadow: "inset 0 0 16px rgba(145, 231, 158, 0.24)",
          }}
        >
          <CircleSuccessSvg height={16} width={16} />
          &nbsp;&nbsp;
          <TextWrapper>Day</TextWrapper>
        </Button>
      )}
      {items?.time && (
        <Button
          bgColor={"rgba(221, 250, 220, 0.4)"}
          style={{
            boxShadow: "inset 0 0 16px rgba(145, 231, 158, 0.24)",
          }}
        >
          <CircleSuccessSvg height={16} width={16} />
          &nbsp;&nbsp;
          <TextWrapper>Time</TextWrapper>
        </Button>
      )}
    </Flex>
  );
};

export default NdChild;
