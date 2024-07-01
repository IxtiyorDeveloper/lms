import React, { useState } from "react";
import { IRankingObservation } from "types/observation";
import { Wrapper } from "./style";
import { Popover } from "antd";
import TimeTableContent from "./content";
import { ArrowSvg } from "@jasurbekyuldashov/lms-web-icons";
import { bgColors } from "styles/theme";

const ObservationStudents = ({ record }: { record?: IRankingObservation }) => {
  const [open, setOpen] = useState(false);

  const handleOpenChange = (newValue: boolean) => {
    setOpen(newValue);
  };

  const length = record?.details?.students?.length || 0;
  const text = length > 1 ? "students" : "student";

  return (
    <Wrapper>
      <Popover
        open={open}
        content={TimeTableContent({ record })}
        onOpenChange={handleOpenChange}
        color={bgColors.dark}
      >
        <p>
          {length} {text}
        </p>
      </Popover>
      <ArrowSvg
        width={10}
        height={10}
        color={bgColors.yourShadow}
        style={{
          transform: `rotate(${open ? 0 : 180}deg)`,
          transition: "0.3s",
        }}
      />
    </Wrapper>
  );
};

export default ObservationStudents;
