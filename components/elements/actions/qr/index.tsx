import React, { FC, useEffect, useState } from "react";
import { Wrapper } from "./style";
import { QrSvg } from "components/index";
import { TIcon } from "types";

const Qr: FC<TIcon> = ({ size, setClicked, clicked }) => {
  const s = size === "small" ? " 17.37" : size === "medium" ? "24" : "";
  const [isPressed, setIsPressed] = useState(false);

  useEffect(() => setClicked?.({ ...clicked, qr: isPressed }), [isPressed]);
  return (
    <Wrapper size={size}>
      <QrSvg width={s} height={s} />
    </Wrapper>
  );
};

export default Qr;
