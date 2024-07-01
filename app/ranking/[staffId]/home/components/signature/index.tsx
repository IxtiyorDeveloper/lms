import React from "react";
import { Wrapper } from "./style";
import Image from "next/image";

const Signature = () => {
  return (
    <Wrapper>
      <div>
        <div className="title">Signature</div>
        <div className="desc">Academic director</div>
      </div>
      <div className="flex">
        <Image
          src="/ranking/sign-academic-director.svg"
          width="200"
          height="100"
          alt="Sign academic director"
        />
        <Image
          src="/ranking/pechat.png"
          width="140"
          height="140"
          alt="asdasd"
        />
      </div>
    </Wrapper>
  );
};

export default Signature;
