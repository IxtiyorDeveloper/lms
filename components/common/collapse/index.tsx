import { Collapse as AntCollapse } from "antd";
import { ICollapseProps } from "./type";
import { ArrowUpSvg } from "@jasurbekyuldashov/lms-web-icons";

import { CollapseWrapper, IconWrapper } from "./style";

const Collapse = ({ items, ...props }: ICollapseProps) => {
  return (
    <CollapseWrapper>
      <AntCollapse
        accordion
        expandIconPosition="end"
        expandIcon={({ isActive }) => (
          <IconWrapper isActive={!!isActive}>
            <ArrowUpSvg />
          </IconWrapper>
        )}
        items={items}
        {...props}
      />
    </CollapseWrapper>
  );
};

export default Collapse;
