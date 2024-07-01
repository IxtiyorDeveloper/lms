import React from "react";
import { Wrapper, Row } from "./style";
import { IGroup, IPreferredBranch } from "types";

const Content = ({
  branches,
  group,
  colored,
}: {
  branches: IPreferredBranch[];
  group: IGroup | undefined;
  colored: boolean;
}) => {
  return (
    <Wrapper>
      {branches?.map((item, index) => {
        const groupBranch = group?.room?.branch;
        const fitBranch =
          groupBranch?.id?.toString() == item?.branch?.id?.toString();
        return (
          <Row
            key={index}
            className={colored ? (fitBranch ? "fit" : "unfit") : ""}
          >
            {item?.branch?.name}
          </Row>
        );
      })}
    </Wrapper>
  );
};

export default Content;
