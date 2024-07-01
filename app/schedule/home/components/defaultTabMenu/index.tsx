import React, { useMemo } from "react";
import { ScheduleSvg } from "components";
import { TabItem } from "./style";
import FreePlaceLabel from "./components/freePlaceLabel";
import { IGroup, IRoom } from "types";
import { ITeacher } from "types/teacher";

interface IProps {
  isShowFreePlace: boolean;
  currentDefaultTab: string;
  freePlaceCount: number;
  day_id: string;
  collection: {
    groups: IGroup[] | undefined;
    rooms: IRoom[] | undefined;
    teachers: ITeacher[] | undefined;
  };
}

const DefaultTabMenu = ({
  isShowFreePlace,
  currentDefaultTab,
  freePlaceCount,
  collection,
  day_id,
}: IProps) => {
  return useMemo(
    () =>
      isShowFreePlace
        ? [
            {
              key: "0",
              label: (
                <TabItem>
                  <ScheduleSvg
                    className={
                      "0" === currentDefaultTab ? "active" : "inactive"
                    }
                  />
                  <div className="text">Schedule</div>
                </TabItem>
              ),
            },
            {
              key: "1",
              label: (
                <FreePlaceLabel
                  currentDefaultTab={currentDefaultTab}
                  freePlaceCount={freePlaceCount}
                  collection={collection}
                  day_id={day_id}
                />
              ),
            },
          ]
        : [
            {
              key: "0",
              label: (
                <TabItem>
                  <ScheduleSvg
                    className={
                      "0" === currentDefaultTab ? "active" : "inactive"
                    }
                  />
                  <p className="text">Schedule</p>
                </TabItem>
              ),
            },
          ],
    [currentDefaultTab, freePlaceCount, collection, day_id]
  );
};

export default DefaultTabMenu;
