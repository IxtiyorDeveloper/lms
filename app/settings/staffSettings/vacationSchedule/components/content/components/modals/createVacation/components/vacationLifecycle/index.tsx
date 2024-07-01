import React, { FC, useState } from "react";
import {
  ChevronRightSvg,
  DoubleArrowSvg,
  StartDateSvg,
  VacationPalmSvg,
} from "@jasurbekyuldashov/lms-web-icons";
import { Steps } from "antd";
import { bgColors } from "styles/theme";
import {
  ChevronWrapper,
  DateWrapper,
  Flex,
  FlexDiv,
  IconWrapper,
  Wrap,
  WrapperLen,
} from "./style";
import { IStaffVacation } from "types/staffSettings/vacation";
import moment from "moment";

interface IProps {
  data?: IStaffVacation[];
  staffType?: any;
}

const VacationLifecycle: FC<IProps> = (props) => {
  const { data } = props;

  const [tabIsOpen, setTabIsOpen] = useState<boolean>(false);

  const items = data
    ? data?.map((staff) => {
        return {
          icon: (
            <IconWrapper color={bgColors.paleGray}>
              <VacationPalmSvg
                width={20}
                height={20}
                color={bgColors.yourShadow}
              />
            </IconWrapper>
          ),
          description: (
            <Flex>
              <DateWrapper>
                <FlexDiv>
                  <StartDateSvg />{" "}
                  {moment(staff.from_date).format("DD MMMM YYYY")}
                </FlexDiv>
                <DoubleArrowSvg color={bgColors.royal} height={16} width={16} />
                <FlexDiv>
                  <StartDateSvg />{" "}
                  {moment(staff.to_date).format("DD MMMM YYYY")}
                </FlexDiv>
              </DateWrapper>
            </Flex>
          ),
        };
      })
    : [];

  const firstItems = (data: IStaffVacation[]) => {
    return [
      {
        icon: (
          <IconWrapper color={bgColors.paleGray}>
            <VacationPalmSvg
              width={20}
              height={20}
              color={bgColors.yourShadow}
            />
          </IconWrapper>
        ),
        description: (
          <Flex>
            <DateWrapper>
              <FlexDiv>
                <StartDateSvg />{" "}
                {moment(data[0]?.from_date).format("DD MMMM YYYY")}
              </FlexDiv>
              <DoubleArrowSvg color={bgColors.royal} height={16} width={16} />
              <FlexDiv>
                <StartDateSvg />{" "}
                {moment(data[0]?.to_date).format("DD MMMM YYYY")}
              </FlexDiv>
            </DateWrapper>
          </Flex>
        ),
      },
    ];
  };

  return (
    <Wrap>
      <p className="label">Vacation history</p>
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
          items={
            tabIsOpen
              ? items
              : data?.length
                ? firstItems(!!data ? data : [])
                : [
                    {
                      icon: (
                        <IconWrapper color={bgColors.paleGray}>
                          <VacationPalmSvg
                            width={20}
                            height={20}
                            color={bgColors.yourShadow}
                          />
                        </IconWrapper>
                      ),
                      description: (
                        <Flex>
                          <DateWrapper>
                            <FlexDiv>
                              <StartDateSvg /> No Data
                            </FlexDiv>
                          </DateWrapper>
                        </Flex>
                      ),
                    },
                  ]
          }
        />
      </WrapperLen>
    </Wrap>
  );
};

export default VacationLifecycle;
