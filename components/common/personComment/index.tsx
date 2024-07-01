import React from "react";
import { Wrapper } from "./style";
import { CreateNoteSvg } from "../../elements";

const PersonComment = ({
  person,
  time,
  text,
}: {
  person?: string;
  time?: string;
  text?: string | null;
}) => {
  return (
    <Wrapper>
      {!!person ? (
        <div className="top">
          <div className="left">
            <CreateNoteSvg />
            <p className="name">{person}</p>
          </div>
          <div className="right">{time}</div>
        </div>
      ) : (
        <div className="top">
          <p className="name">Created by is not defined...</p>
        </div>
      )}

      <p className="text">{text}</p>
    </Wrapper>
  );
};

export default PersonComment;
