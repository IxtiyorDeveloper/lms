import React, { useState } from "react";
import { Box, Wrapper } from "./style";
import { SalaryWrapper } from "./style";
import { toCurrencyFormat } from "utils/toCurrencyFormat";
import { Popover } from "antd";
import { bgColors, textColors } from "styles/theme";
import { ESalaryRange, ISalaryMain } from "types/finance/salary";
import { stopPropagation } from "utils/stopPropagation";
import Definition from "./components/definition";
import ProgressContent from "./components/progress";
import { identifyIcon } from "./components/identifyIcon";
import { TAssignment } from "types";

const FullSalary = ({
  record,
  type,
  total_salary,
  data,
}: {
  record: TAssignment;
  type: ESalaryRange;
  total_salary: any;
  data: ISalaryMain;
}) => {
  const [open, setOpen] = useState(false);

  const handleOpenChange = (newValue: boolean) => {
    setOpen(newValue);
    if (newValue) {
      document.documentElement.style.overflow = "hidden";
    } else {
      document.documentElement.style.overflow = "visible";
    }
  };

  const icon = identifyIcon({ record });

  return (
    <Wrapper onClick={stopPropagation}>
      <Popover
        content={() => Definition({ record, data, handleOpenChange })}
        trigger="click"
        color={textColors.black}
        destroyTooltipOnHide
        placement="right"
        onOpenChange={handleOpenChange}
        open={open}
      >
        <SalaryWrapper className={`range-${type}`}>
          {toCurrencyFormat(total_salary ?? 0)}
        </SalaryWrapper>
      </Popover>
      <Popover
        content={() => ProgressContent({ record })}
        color={bgColors.dark}
      >
        {icon && <Box>{icon}</Box>}
      </Popover>
    </Wrapper>
  );
};

export default FullSalary;
