import React, { FC, useEffect, useState } from "react";
import {
  Wrapper,
  TeacherShare,
  Box,
  Top,
  Groups,
  GroupsTitle,
  Text,
  Circle,
} from "./style";
import { Segmented } from "components";
import { usePageDataMemo } from "hooks";
import TeacherGroups from "./components/teacherGroups";
import { IDefinition } from "./type";
import { separateToGroupForms } from "./components/utils/separateToGroupForms";
import { Collapse } from "antd";
import { GROUP_FORM_GROUP, GROUP_FORM_INDIVIDUAL } from "constants/groupForms";
import { SalaryWrapper } from "./components/teacherGroups/style";
import { toCurrencyFormat } from "utils/toCurrencyFormat";
import { generateCurrentKPI } from "./components/utils/generateCurrentKPI";
import {
  checkRange,
  identifyGroupTotal,
} from "./components/utils/checkGroupTotal";
import { ChevronDownSvg } from "@jasurbekyuldashov/lms-web-icons";
import { bgColors } from "styles/theme";

const Tabs: FC<IDefinition> = ({ record, data, detailedData }) => {
  const selects = usePageDataMemo();
  const [activeKey, setActiveKey] = useState<(string | number)[]>([]);
  const [groupForm, setGroupForm] = useState<
    typeof GROUP_FORM_GROUP | typeof GROUP_FORM_INDIVIDUAL
  >(GROUP_FORM_GROUP);

  const groupForms = separateToGroupForms({ detailedData });

  const currentTab = groupForms?.find(
    (g) => g.group_form == groupForm?.toString(),
  );

  const total_amount =
    currentTab?.groups?.reduce((acc, cur) => {
      return +acc + +cur.balance;
    }, 0) ?? 0;

  const KPI = generateCurrentKPI({ groupForm, record });

  const share = KPI?.data?.share;

  const total_income = Number(((total_amount * (share || 0)) / 100).toFixed(2));

  const length = detailedData?.details?.groupCounts?.[groupForm];

  const groupRange = checkRange({ range: currentTab?.range, length });

  const type = identifyGroupTotal({
    range: groupRange,
    total_amount: total_income,
  });

  const onChange = (key: string | string[]) => {
    setActiveKey(Array.isArray(key) ? key : [key]);
  };

  useEffect(() => {
    if (
      groupForms?.length === 1 &&
      groupForms?.[0]?.group_form?.toString() ==
        GROUP_FORM_INDIVIDUAL?.toString()
    ) {
      setGroupForm(GROUP_FORM_INDIVIDUAL);
    }
  }, [groupForms]);

  return (
    <Wrapper>
      {groupForms?.length > 1 && (
        <Segmented
          block
          options={selects?.groupForm}
          onChange={(e: any) => {
            setGroupForm(e);
          }}
          initValue={groupForm}
          dark
        />
      )}
      <TeacherShare>
        <Box>
          <Top>
            <p className="title">Teacher total</p>
          </Top>
          <SalaryWrapper className={`range-${type} mt6`}>
            {toCurrencyFormat(total_amount)}
          </SalaryWrapper>
        </Box>
        <Box>
          <Top>
            <p className="title">Teacher share</p>
            <div className="percentage">{KPI?.data?.share}%</div>
          </Top>
          <p className="share_amount">{toCurrencyFormat(total_income)}</p>
        </Box>
      </TeacherShare>
      <Groups>
        <Collapse
          activeKey={activeKey}
          onChange={onChange}
          items={[
            {
              key: "1",
              label: (
                <GroupsTitle>
                  <Text>Groups</Text>
                  <Circle active={activeKey?.some((a) => a == "1")}>
                    <ChevronDownSvg
                      color={bgColors.purpleCrystal}
                      width={18}
                      height={18}
                    />
                  </Circle>
                </GroupsTitle>
              ),
              showArrow: false,
              children: <TeacherGroups currentTab={currentTab} KPI={KPI} />,
            },
          ]}
        />
      </Groups>
    </Wrapper>
  );
};

export default Tabs;
