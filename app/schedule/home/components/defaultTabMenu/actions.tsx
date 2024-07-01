import React, { useEffect } from "react";
import { Popover } from "antd";
import { Segmented, FilterLightSvg, MySelect } from "components";
import { ScheduleMenu } from "../index";
import { useForm } from "react-hook-form";
import { usePageDataMemo } from "hooks";
import { useRouter } from "next/router";
import { ISchedule } from "types";
import { ActionsWrapper } from "./style";
import { useExclude } from "utils/useExclude";
import { handleLevelPopoverChange } from "./handleLevelPopoverChange";
import { getObjectByWeekday } from "../utils";
import FilterPopoverComponent from "../filterPopover";

const Actions = ({
  isShowFreePlace,
  data,
  initialData,
}: {
  isShowFreePlace: boolean;
  data: ISchedule | undefined;
  initialData: ISchedule | undefined;
}) => {
  const router = useRouter();
  const { control, watch, setValue } = useForm();
  const defaultTabMenu = router?.query?.defaultTabMenu?.toString() ?? 0;
  const freePlaceType = router?.query?.freePlaceType?.toString() ?? 0;

  useEffect(() => {
    const subscription = watch((value, { name, type }) => {
      if (name === "freePlaceType" && type === "change") {
        router.replace(
          {
            pathname: router.pathname,
            query: {
              ...router.query,
              freePlaceType: isShowFreePlace ? value["freePlaceType"] ?? 0 : 0,
            },
          },
          undefined,
          { scroll: false },
        );
      }
    });
    return () => subscription.unsubscribe();
  }, [watch, router, isShowFreePlace]);

  useEffect(() => {
    router.replace(
      {
        pathname: router.pathname,
        query: {
          ...router.query,
          exclude_new_opening_group: true,
          exclude_next_month_free_place: true,
        },
      },
      undefined,
      { scroll: false },
    );
  }, []);

  useEffect(() => {
    if (!!router.query?.exclude_new_opening_group)
      setValue("exclude_new_opening_group", true);
    if (!!router.query?.exclude_next_month_free_place)
      setValue("exclude_next_month_free_place", true);
  }, [router.query]);

  const [open, setOpen] = React.useState(false);

  const selects = usePageDataMemo();

  const handleLevelChange = (newValue: boolean) => {
    // handleLevelPopoverChange({
    //   freePlace: freePlace?.toString(),
    //   freePlaceCalculation: freePlaceCalculation?.toString(),
    //   groupType: groupType?.toString(),
    //   subLevel: subLevel?.toString(),
    //   groupStatus: groupStatus?.toString(),
    //   level: level?.toString(),
    //   newValue,
    //   setLevelValue,
    // });
    setOpen(newValue);
  };

  useEffect(() => {
    if (!router.query?.freePlaceType) {
      setValue("freePlaceType", "0");
    }
  }, [router.query?.freePlaceType]);

  useExclude({
    watch,
    setValue,
    array: ["defaultTabMenu", "branch_id", "freePlaceType", "day_id"],
    isSuccess: selects?.args?.isSuccess,
  });

  const objectByWeekday = getObjectByWeekday({
    data: data?.days || initialData?.days,
  });

  return (
    <ActionsWrapper>
      <div className="filters">
        {(freePlaceType?.toString() == "2" ||
          freePlaceType?.toString() == "0") &&
          defaultTabMenu?.toString() == "1" && (
            <Popover
              trigger="click"
              placement="bottomLeft"
              onOpenChange={handleLevelChange}
              open={open}
              content={() => FilterPopoverComponent()}
              destroyTooltipOnHide
            >
              <div className="filter">
                <div className="insideFilter">
                  <FilterLightSvg />
                </div>
              </div>
            </Popover>
          )}

        {defaultTabMenu?.toString() == "1" && (
          <form>
            <MySelect
              className="select"
              control={control}
              name="freePlaceType"
              label=""
              defaultValue={{
                value: freePlaceType?.toString(),
              }}
              options={[
                { label: "Schedule", value: "0" },
                { label: "Teacher", value: "1" },
                { label: "Level", value: "2" },
              ]}
              allowClear={false}
            />
          </form>
        )}
      </div>

      <Segmented
        options={ScheduleMenu({ data })}
        routerKey="day_id"
        initValue={
          router.query?.day_id?.toString() || objectByWeekday?.id?.toString()
        }
      />
    </ActionsWrapper>
  );
};

export default Actions;
