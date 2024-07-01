import React, { memo, useEffect, useRef, useState } from "react";
import {
  BottomWrapper,
  BoxWrapper,
  ContentWrapper,
  Detail,
  DetailsContent,
  HelpIcon,
  LeftSide,
  PeriodWrapper,
  RightSide,
  StaffNameWrapper,
  SwitchWrapper,
  TableContainer,
  TextSide,
  TitleText,
  TopWrapper,
  WrapperControlPanel,
} from "./style";
import { Segmented, Switch } from "components";
import { ChevronRightSvg, FaqSvg } from "@jasurbekyuldashov/lms-web-icons";
import { bgColors } from "styles/theme";
import { ActualVacationHoldersPopover } from "../../../index";
import { Control, UseFormWatch } from "react-hook-form";
import moment from "moment";
import { generateMonthsByGivenYear, generateYearPeriod } from "../../functions";
import { UserVacationHistoryObj } from "types/staffSettings/vacation";
import HeaderSide from "./header";
import { useRouter } from "next/router";
import Sticky from "react-stickynode";
import { Popover, Spin } from "antd";
import { dataBySign } from "./data";
import UserVacationStatus from "./userWithVacationStatus";
import { useGetSlotsByPeriod } from "hooks";

interface IProps {
  control: Control;
  watch: UseFormWatch<any>;
  sidebarItems?: any[];
  data?: any[];
  vacationListData?: UserVacationHistoryObj;
  loadVacation?: boolean;
}

const ScheduleTableComponent = memo((props: IProps) => {
  const router = useRouter();

  const { data: slotData } = useGetSlotsByPeriod({
    query_params: {
      year: router.query?.year,
      month: router.query?.month,
      expand: "vacations.user.staff,vacations.user.userProfile.avatar",
    },
  });

  const { data: slotDataNoFilter } = useGetSlotsByPeriod({
    query_params: {
      year: [2024, 2025],
    },
  });

  const { control, watch, sidebarItems, data, vacationListData, loadVacation } =
    props;
  const contentRef = useRef<HTMLDivElement>(null);

  const [periodOfYears, setPeriodOfYears] = useState<number[]>([]);

  const scrollByAmount = (amount: number) => {
    if (contentRef.current) {
      const clientWidth = contentRef.current.clientWidth;
      const scrollLeft = contentRef.current.scrollLeft;
      const scrollWidth = contentRef.current.scrollWidth;
      contentRef.current.scrollLeft += amount;
      try {
        document.querySelectorAll(".scroller-a").forEach((p) => {
          p.scrollLeft = Number(contentRef?.current?.scrollLeft || 0) + amount;
        });
      } catch (error) {
        alert("An error occurred!");
      }

      if (contentRef.current.scrollLeft == 0 && amount < 0) {
        setPeriodOfYears([periodOfYears[0] - 1, ...periodOfYears]);
      }

      if (amount > 0 && clientWidth + scrollLeft == scrollWidth) {
        setPeriodOfYears([
          ...periodOfYears,
          periodOfYears[periodOfYears.length - 1] + 1,
        ]);
      }
    }
  };

  const currentYear = +moment(new Date()).format("YYYY");

  useEffect(() => {
    const nextYear = generateYearPeriod(currentYear, 1, true);
    const prevYear = generateYearPeriod(currentYear, 1, false).reverse();
    setPeriodOfYears(() => {
      return [...prevYear, currentYear, ...nextYear];
    });
  }, []);

  useEffect(() => {
    router
      .push({
        hash: window.location.hash,
        query: {
          ...router.query,
          month: moment().format("MM"),
          year: moment().format("YYYY"),
          period: `${periodOfYears[0]}_${periodOfYears[periodOfYears.length - 1]}`,
        },
      })
      .then();
  }, [periodOfYears]);

  const mappableVersionOfPeriod = periodOfYears.map((year) => {
    return {
      year,
      months: generateMonthsByGivenYear(year),
    };
  });

  useEffect(() => {
    const subscription = watch((value) => {
      const is_expired = value?.is_expired;

      router
        .replace({
          pathname: router.pathname,
          query: {
            ...router.query,
            is_expired: is_expired,
          },
        })
        .then();
    });
    return () => subscription.unsubscribe();
  }, [watch]);

  return (
    <TableContainer id="my-scroll-layout">
      <WrapperControlPanel>
        <TopWrapper>
          <RightSide>
            <Segmented
              options={[
                { label: "Daily", value: "daily" },
                { label: "Monthly", value: "monthly" },
              ]}
              initValue="monthly"
              routerKey="schedule_type"
            />
            <Popover
              placement="bottomLeft"
              content={() => (
                <ContentWrapper>
                  <TitleText>Designation signs</TitleText>
                  <DetailsContent>
                    {dataBySign.map((m) => {
                      return (
                        <Detail key={m.type}>
                          <BoxWrapper>
                            {m.type === "yellow-warning" ? (
                              <UserVacationStatus
                                src={{ full_url: "/user.svg" }}
                                size={28}
                                status={200}
                              />
                            ) : m.type === "red-warning" ? (
                              <UserVacationStatus
                                src={{ full_url: "/user.svg" }}
                                size={28}
                                status={300}
                              />
                            ) : m.type === "green-warning" ? (
                              <UserVacationStatus
                                src={{ full_url: "/user.svg" }}
                                status={100}
                                size={28}
                                onVacation={true}
                              />
                            ) : (
                              <div className={`box ${m.type}`}></div>
                            )}
                          </BoxWrapper>
                          <TextSide>
                            <p className="title-sign">{m.title}</p>
                            <p className="text-sign">{m.text}</p>
                          </TextSide>
                        </Detail>
                      );
                    })}
                  </DetailsContent>
                </ContentWrapper>
              )}
            >
              <HelpIcon>
                <FaqSvg
                  color={bgColors.yourShadow}
                  height={20}
                  width={20}
                  style={{ marginTop: "-2px" }}
                />
                <span>Help</span>
              </HelpIcon>
            </Popover>
          </RightSide>
          <LeftSide>
            <SwitchWrapper>
              <Switch name="is_expired" control={control} />
              Only expired staffs
            </SwitchWrapper>
            <ActualVacationHoldersPopover />
          </LeftSide>
        </TopWrapper>
        <Sticky innerZ={99} enabled={true} top={70}>
          <BottomWrapper>
            <StaffNameWrapper>Staff name</StaffNameWrapper>
            <div style={{ position: "relative", width: "calc(100% - 200px)" }}>
              <div
                className="scroller prev"
                onClick={() => scrollByAmount(-200)}
              >
                <ChevronRightSvg width={8} height={10} className="rotate" />
              </div>
              <PeriodWrapper ref={contentRef}>
                {mappableVersionOfPeriod.map((item, index) => {
                  return (
                    <div className="period-wrapper" key={index}>
                      <p className="year">{item.year}</p>
                      <div className="months">
                        {item.months.map((month) => {
                          const selectedMonthA = moment(
                            `${router.query?.year}-${router.query?.month}-01`,
                            "YYYY-MM-DD",
                          ).format("MMM_YYYY");
                          const isActive = month.key === selectedMonthA;
                          const currentMonthKey = moment(new Date()).format(
                            "MMM_YYYY",
                          );
                          const isCurrent = currentMonthKey === month.key;

                          return (
                            <p
                              className={
                                isActive && isCurrent
                                  ? "active-current current"
                                  : isActive
                                    ? "active"
                                    : isCurrent
                                      ? "current"
                                      : ""
                              }
                              onClick={() => {
                                const selectedDate = `${month.key.split("_")[1]}-${month.key.split("_")[0]}-01`;
                                router
                                  .push({
                                    hash: window.location.hash,
                                    query: {
                                      ...router.query,
                                      month: moment(
                                        selectedDate,
                                        "YYYY-MMM-DD",
                                      ).format("MM"),
                                      year: moment(
                                        selectedDate,
                                        "YYYY-MMM-DD",
                                      ).format("YYYY"),
                                    },
                                  })
                                  .then();
                              }}
                              key={month.key}
                            >
                              {month.name}
                            </p>
                          );
                        })}
                      </div>
                    </div>
                  );
                })}
              </PeriodWrapper>
              <div
                className="scroller next"
                onClick={() => scrollByAmount(200)}
              >
                <ChevronRightSvg width={8} height={10} />
              </div>
            </div>
          </BottomWrapper>
        </Sticky>
      </WrapperControlPanel>
      <Spin spinning={loadVacation}>
        {sidebarItems?.map((item, key) => {
          return (
            <div id={`part-${key}`} key={`part-${key}`}>
              {data?.map((tableData: any) => {
                const shift_id = tableData?.shift ? tableData?.shift?.id : 0;
                const part_id = `${tableData?.role?.id}_${shift_id}`;
                const id = `part-${part_id}`;
                const isDep = tableData?.department?.id == item?.id;

                return isDep ? (
                  <HeaderSide
                    id={id}
                    slotsData={slotData}
                    slotsDataNoFilter={slotDataNoFilter}
                    vacationList={vacationListData}
                    part_id={part_id}
                    tableData={tableData}
                    yearsList={periodOfYears}
                    period={mappableVersionOfPeriod}
                  />
                ) : null;
              })}
            </div>
          );
        })}
      </Spin>
    </TableContainer>
  );
});

export default ScheduleTableComponent;
