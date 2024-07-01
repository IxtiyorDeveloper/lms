import React, { FC, useEffect, useMemo, useState } from "react";
import { AntdTable } from "components";
import { ISchedule } from "types";
import ScheduleColumns from "./scheduleColumns";
import { Wrapper } from "./style";
import { useRouter } from "next/router";
import FreePlaceByScheduleColumns from "./freePlaceByScheduleColumns";
import FreePlaceByTeacherColumns from "./freePlaceByTeacher";
import FreePlaceByLevelColumns from "./freePlaceByLevelColumns";
import { filterGroups } from "./filterGroups";
import { generateTableData } from "./utils";

interface Interface {
  data: ISchedule | undefined;
  isLoading: boolean;
  initValue: number | string;
  day_id?: string;
  collection: {
    groups: ISchedule["data"] | undefined;
    rooms: ISchedule["rooms"] | undefined;
    teachers: ISchedule["teachers"] | undefined;
  };
}

const ScheduleTable: FC<Interface> = ({
  data,
  collection,
  isLoading,
  initValue,
  day_id,
}) => {
  const router = useRouter();
  const defaultTabMenu = router?.query?.defaultTabMenu ?? 0;
  const freePlaceType = +(router?.query?.freePlaceType || 0) + 1 ?? 1;
  const [tempCollection, setTempCollection] = useState(collection);
  const [freePlaceData, setFreePlaceData] = useState(collection);

  const tableData = useMemo(() => {
    return generateTableData({ collection, data });
  }, [data?.times?.length, collection?.rooms, collection?.teachers]);

  const groupStatus = router.query?.groupStatus?.toString();
  const groupType = router.query?.groupType;

  const subLevel = router.query?.subLevel;

  const freePlace = router.query?.freePlace?.toString();

  const exclude_new_opening_group =
    router.query?.exclude_new_opening_group?.toString();

  const exclude_new_opened_group =
    router.query?.exclude_new_opened_group?.toString();

  const exclude_closing_group = router.query?.exclude_closing_group?.toString();

  const freePlaceCalculation =
    router.query?.freePlaceCalculation?.toString() || "0";

  useEffect(() => {
    const { groups, ...args } = collection;
    if (!collection?.groups) return;
    const filteredGroups = filterGroups({
      collection,
      freePlace,
      freePlaceCalculation,
      groupStatus,
      groupType,
      subLevel,
      exclude_new_opening_group,
      exclude_new_opened_group,
      exclude_closing_group,
    });
    setTempCollection({
      groups: filteredGroups,
      ...args,
    });
  }, [
    groupStatus,
    groupType,
    subLevel,
    freePlace,
    collection,
    freePlaceCalculation,
  ]);

  useEffect(() => {
    const { groups, ...args } = collection;
    if (!collection?.groups) return;
    const filteredGroups = filterGroups({
      collection,
      freePlace,
      freePlaceCalculation,
      groupStatus,
      groupType,
      subLevel,
      exclude_new_opening_group,
      exclude_new_opened_group,
      exclude_closing_group,
    });
    setFreePlaceData({
      groups: filteredGroups,
      ...args,
    });
  }, [
    groupStatus,
    groupType,
    subLevel,
    freePlace,
    collection,
    freePlaceCalculation,
  ]);

  const columns = {
    "0": ScheduleColumns({ data, collection, initValue, day_id }),
    "1": FreePlaceByScheduleColumns({
      data,
      collection: freePlaceData,
      day_id,
    }),
    "2": FreePlaceByTeacherColumns({ data, collection, day_id }),
    "3": FreePlaceByLevelColumns({ data, collection: tempCollection }),
  };

  return (
    <Wrapper>
      <AntdTable
        dataSource={
          tableData?.[
            defaultTabMenu > 0
              ? (freePlaceType as unknown as keyof typeof columns)
              : (defaultTabMenu as keyof typeof columns)
          ]
        }
        columns={
          columns?.[
            defaultTabMenu > 0
              ? (freePlaceType as unknown as keyof typeof columns)
              : (defaultTabMenu as keyof typeof columns)
          ]
        }
        loading={isLoading}
      />
    </Wrapper>
  );
};

export default React.memo(ScheduleTable);
