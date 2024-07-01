import React, { FC } from "react";
import { LANG_EN, LANG_RU, LANG_UZ } from "constants/langs";
import { RuFlagSvg, UsFlagSvg, UzFlagSvg } from "components";
import { Wrapper } from "./style";

const LangWrapper: FC<{ val: string; value: string }> = ({ val, value }) => {
  const langFlags = {
    [LANG_EN]: <UsFlagSvg />,
    [LANG_UZ]: <UzFlagSvg />,
    [LANG_RU]: <RuFlagSvg />,
  };

  return (
    <Wrapper>
      <div className="flag">
        {langFlags[(value as keyof typeof langFlags) || LANG_RU]}
      </div>
      <div className="col" />
      <div>{val}</div>
    </Wrapper>
  );
};

export default LangWrapper;
