import React, { FC, ReactElement, ReactNode, useEffect, useState } from "react";
import { RoundedTab } from "components";
import { bgColors, textColors } from "styles/theme";
import { usePageDataMemo, useExamData } from "hooks";
import moment from "moment/moment";
import { useRouter } from "next/router";
import TableC from "../table";
import { Wrapper, TabNameWrapper, TabVisibility, TabWrap } from "./style";
import { Popover } from "antd";

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

const TableSide: FC<any> = ({ counts }) => {
  const router = useRouter();

  const pageData = usePageDataMemo();
  const [subLevels, setSubLevels] = useState([]);
  const [tabs, setTabs] = useState<ITabElement[]>([]);
  const date = moment(
    router.query?.date || moment().format("YYYY-MM"),
    "YYYY-MM"
  );
  const level = !!router.query?.stats_level_id
    ? (router.query?.stats_level_id ?? "").toString()?.split(",")
    : null;

  const { data, isLoading } = useExamData({
    level_id: subLevels?.[(router.query?.roundedTabIndex as any) || 0],
    ...router.query,
    month: date.format("MM"),
    year: date.format("YYYY"),
    roundedTabIndex: undefined,
    tabId: undefined,
    stats_level_id: level,
    statistic_key: undefined,
  });

  /**
   * Bu yerda dynamic tablar generate qilingan
   * **/
  useEffect(() => {
    const array: ITabElement[] = [];
    pageData.level?.options?.map((option, index) => {
      const content = {
        title: () => (
          <TabVisibility>
            <div className="popover">
              <Popover
                destroyTooltipOnHide
                content={
                  <TabWrap>
                    {option.label} ({counts?.levels?.[index]?.checked_exams_count}/
                    {counts?.levels?.[index]?.total_exams_count})
                  </TabWrap>
                }>
                <TabNameWrapper>
                  {option.label} ({counts?.levels?.[index]?.checked_exams_count}/
                  {counts?.levels?.[index]?.total_exams_count})
                </TabNameWrapper>
              </Popover>
            </div>
            <div className="popoverless">
              <TabNameWrapper>
                {option.label} ({counts?.levels?.[index]?.checked_exams_count}/
                {counts?.levels?.[index]?.total_exams_count})
              </TabNameWrapper>
            </div>
          </TabVisibility>
        ),
      };
      if (option.label.toString().toUpperCase() !== "IELTS") {
        array.push(content);
      } else if (+counts?.levels?.[index]?.checked_exams_count > 0) {
        array.push(content);
      }
    });
    setTabs(array);
  }, [pageData?.level?.options?.length, data, counts]);

  useEffect(() => {
    let arr: any[] = [];
    pageData?.level?.options?.map((level) => {
      let subLevelIDs: number[] = [];
      level?.subLevel?.map((subLev) => {
        subLevelIDs.push(+subLev.value);
      });
      arr.push(subLevelIDs);
    });
    setSubLevels(arr as any);
  }, [router, data, pageData?.level?.options?.length]);

  return (
    <Wrapper>
      <div className="rounded-tab">
        <RoundedTab tabs={tabs} allStyles={allStyles} />
      </div>
      <TableC data={data?.items} meta={data?.meta} loading={isLoading} />
    </Wrapper>
  );
};

export default TableSide;
