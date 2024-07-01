import React, { useState } from "react";
import { TabItem } from "../../style";
import { FreePlaceSvg } from "components";
import { Popover } from "antd";
import RedBadgeTitle from "components/common/redBadgeTitle";
import Capacity from "../capacity";
import { IGroup, IRoom } from "types";
import { ITeacher } from "types/teacher";
import { calculateCapacity } from "./utils/calculateCapacity";

const FreePlaceLabel = ({
  currentDefaultTab,
  freePlaceCount,
  collection,
  day_id,
}: {
  currentDefaultTab: string;
  freePlaceCount: number;
  collection: {
    groups: IGroup[] | undefined;
    rooms: IRoom[] | undefined;
    teachers: ITeacher[] | undefined;
  };
  day_id: string;
}) => {
  const [open, setOpen] = useState(false);
  const handleOpenChange = (newValue: boolean) => {
    setOpen(newValue);
  };
  const capacity = calculateCapacity({ collection, day_id });
  return (
    <TabItem>
      <FreePlaceSvg
        className={"1" === currentDefaultTab ? "active" : "inactive"}
      />
      <div className="fr-text">
        <p>Free place</p>
        <Popover
          trigger="hover"
          placement="bottomRight"
          open={open}
          onOpenChange={handleOpenChange}
          content={<Capacity capacity={capacity} />}
          destroyTooltipOnHide
        >
          <div>
            <RedBadgeTitle count={freePlaceCount} />
          </div>
        </Popover>
      </div>
    </TabItem>
  );
};

export default FreePlaceLabel;
