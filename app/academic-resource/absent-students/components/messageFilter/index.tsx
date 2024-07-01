import React from "react";
import { Wrapper } from "./style";
import { MailSvg } from "components";

const MessageFilter = () => {
  return (
    <Wrapper>
      <div className="item">
        <MailSvg />
      </div>
    </Wrapper>
  );
};

export default MessageFilter;
