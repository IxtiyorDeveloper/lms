import React, { FC } from "react";
import { FreshmanWrapper } from "./style";
import { IFreshmanLost } from "types";
import {
  ByAdminCard,
  ByBranchCard,
  ByLevelCard,
  ByStatusesCard,
} from "../../freshman/card";

interface IProps {
  data?: IFreshmanLost;
}

const Freshman: FC<IProps> = ({ data }) => {
  return (
    <div>
      <FreshmanWrapper>
        <ByStatusesCard />
        <ByBranchCard />
        <ByAdminCard />
        <ByLevelCard />
      </FreshmanWrapper>
    </div>
  );
};

export default Freshman;
