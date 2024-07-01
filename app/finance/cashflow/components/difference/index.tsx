import { FC, ReactNode } from "react";
import { DiffereceWrapper, TooltipInner } from "./style";
import {
  DecreaseSvg,
  IncreaseSvg,
  StableSvg,
} from "@jasurbekyuldashov/lms-web-icons";
import { Tooltip } from "antd";
import Info from "./components/info";
import { bgColors } from "styles/theme";

interface IProps {
  record: any;
  main?: boolean;
  children: ReactNode;
  without_avans: boolean;
}
const Difference: FC<IProps> = ({
  children,
  record,
  main = false,
  without_avans,
}) => {
  return (
    <DiffereceWrapper>
      <Tooltip
        title={<Info record={record} without_avans={without_avans} />}
        destroyTooltipOnHide
        placement="bottom"
        overlayInnerStyle={{ width: "180px", background: bgColors.dark }}
      >
        {record?.difference == 0 ? (
          <div className={`card  ${main ? "main" : "increase"}`}>
            <StableSvg />
          </div>
        ) : record?.difference > 0 ? (
          <div className={`card  ${main ? "main" : "increase"}`}>
            <DecreaseSvg />
          </div>
        ) : (
          <div className={`card  ${main ? "main" : "increase"}`}>
            <IncreaseSvg />
          </div>
        )}
      </Tooltip>
      {children}
    </DiffereceWrapper>
  );
};

export default Difference;
