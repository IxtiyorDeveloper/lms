import React, { FC, ReactElement, ReactNode, useEffect, useState } from "react";
import { RoundedTab } from "components";
import { bgColors, textColors } from "styles/theme";
import { usePageDataMemo, useAdminMockGroups } from "hooks";
import moment from "moment/moment";
import { useRouter } from "next/router";
import { Wrapper, TabNameWrapper, TabVisibility, TabWrap } from "./style";
import { Popover } from "antd";
import TableCMock from "../tableMock";
import { ExamTabOptions } from "../monthFilter";

export const allStyles = {
  tabWidth: "100%",
  tabsAlign: "center",
  paddingTab: "15px 16px",
  tabBg: bgColors.white,
  bgColors: bgColors.white,
  activeTabBg: bgColors.primary,
  activeBg: bgColors.transparent,
  textColor: textColors.yourShadow,
  buttonBgColor: bgColors.white,
  activeTColor: textColors.sceptreBlue,
};

interface ITabElement {
  title: () => ReactNode | ReactElement;
  children?: ReactNode | ReactElement;
}

const TableSideMock: FC<any> = ({ counts }) => {
  const router = useRouter();

  const pageData = usePageDataMemo();
  const [tabs, setTabs] = useState<ITabElement[]>([]);
  const [levels, setLevels] = useState([]);
  const isMock = router.query?.tabId === ExamTabOptions.MOCK;

  const date = moment(
    router.query?.date || moment().format("YYYY-MM"),
    "YYYY-MM"
  );

  const level = !!router.query?.stats_level_id
    ? (router.query?.stats_level_id ?? "").toString()?.split(",")
    : null;

  const { data, isLoading } = useAdminMockGroups({
    query_params: {
      level_id: levels[(router.query?.roundedTabIndex as any) || 0],
      ...router.query,
      sub_level_id: level,
      month: date.format("MM"),
      year: date.format("YYYY"),
      roundedTabIndex: undefined,
      tabId: undefined,
      statistic_key: undefined,
      stats_level_id: level,
      [`per-page`]: router.query.pageSize || 50,
      expand: "mockStats,teacher,support,lessonTime,lessonDay,room",
    },
    enabled: isMock,
  });

  /**
   * Bu yerda dynamic tablar generate qilingan
   * **/
  useEffect(() => {
    const array: ITabElement[] = [];
    pageData.level?.options?.map((option, index) => {
      const level = counts?.levels?.find((e: any) => e.level == option.value);
      const content = {
        title: () => (
          <TabVisibility>
            <div className="popover">
              <Popover
                destroyTooltipOnHide
                content={
                  <TabWrap>
                    {option.label} ({level?.total_exams_count})
                  </TabWrap>
                }>
                <TabNameWrapper>
                  {option.label} ({level?.total_exams_count})
                </TabNameWrapper>
              </Popover>
            </div>
            <div className="popoverless">
              <TabNameWrapper>
                {option.label} ({level?.total_exams_count})
              </TabNameWrapper>
            </div>
          </TabVisibility>
        ),
      };
      if (option.label.toString().toUpperCase() !== "IELTS") {
        array.push(content);
      } else if (+level?.total_exams_count > 0) {
        array.push(content);
      }
    });
    setTabs(array);
  }, [pageData?.level?.options?.length, data, counts]);

  useEffect(() => {
    let arr: any[] = [];
    pageData?.level?.options?.map((level) => {
      arr.push(level.value);
    });
    setLevels(arr as any);
  }, [router, data, pageData?.level?.options?.length]);

  return (
    <Wrapper>
      <div className="rounded-tab">
        <RoundedTab tabs={tabs} allStyles={allStyles} />
      </div>
      <TableCMock data={data?.list} meta={data?.meta} loading={isLoading} />
    </Wrapper>
  );
};

export default TableSideMock;
