import React, { FC, useState } from "react";
import {
  ChevronRightSvg,
  DoubleArrowSvg,
  RepositionSvg,
  RestoreSvg,
  SquareXSvg,
  StartDateSvg,
  UserRoundSvg,
} from "@jasurbekyuldashov/lms-web-icons";
import { Steps } from "antd";
import { ChangeStatusTypeStaffEnum, StaffType } from "constants/settings";
import { bgColors } from "styles/theme";
import { IStaffViewPageInfoData } from "types/staffSettings";
import {
  ChevronWrapper,
  CurrentTime,
  DateWrapper,
  Flex,
  FlexDiv,
  IconWrapper,
  TextWrapper,
  WrapperLen,
  WrapperStatus,
} from "./style";
import { typeSelect } from "../../data";
import moment from "moment";

interface IProps {
  dataGetOne?: IStaffViewPageInfoData;
  staffType?: any;
}

const MainLifeCycle: FC<IProps> = (props) => {
  const { dataGetOne, staffType } = props;

  const [tabIsOpen, setTabIsOpen] = useState<boolean>(false);

  const icons = {
    hired: UserRoundSvg,
    rehired: RestoreSvg,
    fired: SquareXSvg,
    reposition: RepositionSvg,
  };

  const colors = {
    hired: bgColors.nouveau,
    rehired: bgColors.kitten,
    fired: bgColors.pop,
    reposition: bgColors.deepBlue,
  };

  const items = dataGetOne?.staffFlowList?.map((staff, index: number) => {
    const iconType =
      ChangeStatusTypeStaffEnum[
        staff.type as keyof typeof ChangeStatusTypeStaffEnum
      ];
    const staffType =
      typeSelect[
        StaffType[
          staff?.job_type as unknown as keyof typeof StaffType
        ] as keyof typeof typeSelect
      ];

    const Icon: any = icons[iconType as keyof typeof icons];

    const color: string = colors[iconType as keyof typeof colors];

    return {
      icon: (
        <IconWrapper color={color}>
          <Icon width={20} height={20} color={bgColors.blueGray} />
        </IconWrapper>
      ),
      description: (
        <Flex>
          <TextWrapper>
            {staff.rbacRole.name}
            <WrapperStatus style={staffType?.styles}>
              <p className="status">{staffType?.text}</p>
            </WrapperStatus>{" "}
          </TextWrapper>
          <DateWrapper>
            <FlexDiv>
              <StartDateSvg /> {staff.start_date}
            </FlexDiv>
            <DoubleArrowSvg color={bgColors.royal} height={16} width={16} />
            <FlexDiv>
              <StartDateSvg />{" "}
              {index === 0 ? (
                <CurrentTime>{!dataGetOne?.staffFlow?.end_date ? "Current time" : moment(dataGetOne?.staffFlow?.end_date).format("YYYY-MM-DD")}</CurrentTime>
              ) : (
                staff.end_date
              )}
            </FlexDiv>
          </DateWrapper>
        </Flex>
      ),
    };
  });

  const firstItems = (data?: IStaffViewPageInfoData) => {
    const iconType =
      // @ts-ignore
      ChangeStatusTypeStaffEnum[data ? data?.staffFlowList[0]?.type : "100"] ||
      "hired";

    const Icon: any = icons[iconType as keyof typeof icons];
    const color: string = colors[iconType as keyof typeof colors];
    return [
      {
        icon: (
          <IconWrapper color={color}>
            <Icon width={20} height={20} color={bgColors.blueGray} />
          </IconWrapper>
        ),
        description: (
          <Flex>
            <TextWrapper>
              {data?.staffFlowList[0]?.rbacRole.name}
              <WrapperStatus style={staffType?.styles}>
                <p className="status">{staffType?.text}</p>
              </WrapperStatus>{" "}
            </TextWrapper>
            <DateWrapper>
              <FlexDiv>
                <StartDateSvg /> {data?.staffFlowList[0]?.start_date}
              </FlexDiv>
              <DoubleArrowSvg color={bgColors.royal} height={16} width={16} />
              <FlexDiv>
                <StartDateSvg /> <CurrentTime>{!dataGetOne?.staffFlow?.end_date ? "Current time" : moment(dataGetOne?.staffFlow?.end_date).format("YYYY-MM-DD")}</CurrentTime>
              </FlexDiv>
            </DateWrapper>
          </Flex>
        ),
      },
    ];
  };

  return (
    <WrapperLen>
      <ChevronWrapper onClick={() => setTabIsOpen(!tabIsOpen)}>
        <ChevronRightSvg
          style={{ transform: tabIsOpen ? "rotate(90deg)" : "unset" }}
          height={14}
          width={14}
        />
      </ChevronWrapper>
      <Steps
        direction="vertical"
        style={{ gap: "10px" }}
        items={tabIsOpen ? items : firstItems(dataGetOne)}
      />
    </WrapperLen>
  );
};

export default MainLifeCycle;
