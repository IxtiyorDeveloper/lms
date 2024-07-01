import React from "react";
import { Wrapper } from "./style";

const Feedback = () => {
  return (
    <Wrapper>
      <p className="title">Give us feedback</p>
      <p className="text">
        Please fill the survey and management will solve your problems
      </p>
      <img
        src="/profile/note.png"
        alt="note"
        width={130}
        height={120}
        className="img"
      />
    </Wrapper>
  );
};

export default Feedback;
