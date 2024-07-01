import React from "react";
import { Popover } from "antd";
import { bgColors } from "styles/theme";
import ProgressContent from "./components/progressContent";
import { Box } from "./style";
import { identifyIcon } from "./components/identifyIcon";

const DifferenceLastMonth = ({ difference }: { difference: number }) => {
  const icon = identifyIcon({ difference });

  return (
    <div>
      <Popover
        content={() => ProgressContent({ difference })}
        color={bgColors.dark}
      >
        {icon && <Box>{icon}</Box>}
      </Popover>
    </div>
  );
};

export default DifferenceLastMonth;
