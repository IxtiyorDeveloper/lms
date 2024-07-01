import React, { FC } from "react";
import { Wrapper } from "./style";

const CallStatus: FC<{
  status?: string;
  isAccepted?: boolean;
}> = ({ status = "_", isAccepted = false }) => {
  return (
    <Wrapper isAccepted={isAccepted}>
      <div>{status}</div>
    </Wrapper>
  );
};

export default CallStatus;
