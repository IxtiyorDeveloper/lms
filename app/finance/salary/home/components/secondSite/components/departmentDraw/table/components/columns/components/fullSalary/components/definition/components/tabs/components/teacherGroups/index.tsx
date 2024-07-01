import React, { FC } from "react";
import {
  Wrapper,
  Box,
  Top,
  Left,
  Right,
  Bottom,
  SalaryWrapper,
  GroupCount,
  Mark,
} from "./style";
import { groupColors } from "layout/header/style";
import { groupStatusIdentifier } from "utils/groupStatusIdentifier";
import { IDefinition } from "./type";
import { identifySalaryType } from "utils/salary/checkRange";
import { toCurrencyFormat } from "utils/toCurrencyFormat";
import LateEarly from "./components/lateEarly";
import { XMoreInfoIcon } from "@jasurbekyuldashov/lms-web-icons";
import { Popover } from "antd";
import { bgColors } from "styles/theme";
import LevelInfo from "./components/level";
import { usePageDataMemo } from "hooks";

const TeacherGroups: FC<IDefinition> = ({ currentTab, KPI }) => {
  const groups = currentTab?.groups;
  const selects = usePageDataMemo();

  return (
    <Wrapper>
      {groups?.map((item, index) => {
        const group_total = Number(
          ((+item?.balance * (KPI?.data?.share || 0)) / 100).toFixed(2),
        );

        const range = currentTab?.range;

        const type = identifySalaryType({
          range,
          total_salary: group_total,
        });
        const parent = selects?.level?.options?.find(
          (f) => f.value == item.level_id,
        );
        const sub = parent?.subLevel?.find((f) => f.value == item.sub_level_id);
        return (
          <Box key={index}>
            <Mark
              style={
                groupColors[
                  groupStatusIdentifier({
                    group: item,
                  }) as keyof typeof groupColors
                ]
              }
            ></Mark>
            <Top>
              <Left>
                <Popover
                  color={bgColors.dark}
                  content={LevelInfo({
                    level: parent?.label,
                    sub_level: sub?.label,
                    item,
                    selects,
                  })}
                >
                  <XMoreInfoIcon />
                </Popover>
                <p className="name">{item?.name}</p>
              </Left>
              <Right>
                <LateEarly group={item} />
              </Right>
            </Top>
            <Bottom>
              <SalaryWrapper className={`range-${type}`}>
                {toCurrencyFormat(group_total)}
              </SalaryWrapper>
              <GroupCount>{item?.student_count}</GroupCount>
            </Bottom>
          </Box>
        );
      })}
    </Wrapper>
  );
};

export default TeacherGroups;
