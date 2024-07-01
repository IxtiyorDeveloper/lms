import React, { FC, useCallback, useMemo } from "react";
import {
  Cards,
  DateForGroup,
  DateWrapper,
  ExpandDiv,
  ExpandDivSection,
  Flex,
  FlexBottom,
  FlexWithGap,
  GroupName,
  TextForLessons,
  UserAction,
} from "app/groups/[groupId]/components/administrativeTab/style";
import moment from "moment/moment";
import {
  ArrowRight,
  Button,
  GiftSvg,
  TimeSvg,
  TransferSvg,
} from "components/index";
import { bgColors, borders, fontSizes } from "styles/theme";
import { IPriceStatus } from "app/groups/[groupId]/components/administrativeTab/type";
import {
  DATE_FORMAT_HH_mm,
  DATE_FORMAT_SHOW_MMM,
  DATE_FORMAT_DD_mmm_YYYY,
} from "constants/dates";
import { EPayment } from "types";
import { PopoverContent, TransferParent } from "../style";
import { toCurrencyFormat } from "utils/toCurrencyFormat";
import { bgColor, color } from "./data";
import {
  ADDED_BY,
  TRANSFERRED_BY,
} from "../../../../constants/contactResponsibles";
import { filterResponsible } from "./filterResponsible";
import { SvgTypes } from "./type";

const PaymentPopover: FC<IPriceStatus> = ({ groups, contactResponsibles }) => {
  const responsible =
    contactResponsibles?.find((res) => res?.type == TRANSFERRED_BY) ??
    contactResponsibles?.find((res) => res?.type == ADDED_BY);
  const data = groups?.reduce(
    (acc, curr) => {
      return {
        debt: acc.debt + curr?.debt,
        balance: acc.balance + curr?.balance,
      };
    },
    { debt: 0, balance: 0 }
  );
  const renderItems = useCallback(() => {
    return groups.map((group, index) => {
      const bgColor =
        index + 1 === groups.length
          ? `${bgColors.transparentGreen}80`
          : bgColors.whiteSmoke;
      const isEven = groups.length % 2 === 0;
      const isOddIndex = !((index + 1) % 2 === 0);
      const arrow = {
        exist: (
          <div className="arrow">
            <ArrowRight color={bgColors.yourShadow} />
          </div>
        ),
        none: null,
      };
      return (
        <div className="flex">
          <ExpandDivSection
            className="expand"
            key={`${group.name}_${index}`}
            style={{ backgroundColor: bgColor }}
          >
            <Flex>
              <GroupName>{group.name}</GroupName>
              <DateWrapper>
                <DateForGroup>
                  {moment(group.start_date).format(DATE_FORMAT_DD_mmm_YYYY)}
                </DateForGroup>
                <div className="line" />
                <DateForGroup>
                  {moment(group.finish_date).format(DATE_FORMAT_DD_mmm_YYYY)}
                </DateForGroup>
              </DateWrapper>
            </Flex>
            <Flex style={{ justifyContent: "flex-end" }}>
              <TextForLessons>Lesson {group.lessons}</TextForLessons>
            </Flex>
            <FlexBottom>
              <div>{group.amount}</div>
              <div>{group.status}</div>
            </FlexBottom>
          </ExpandDivSection>
          {isEven
            ? isOddIndex
              ? arrow.exist
              : arrow.none
            : index + 1 !== groups.length && isOddIndex
            ? arrow.exist
            : arrow.none}
        </div>
      );
    });
  }, [groups]);
  const type = useMemo(() => {
    return (data?.debt || 0) > 0 && (data?.balance || 0) > 0
      ? EPayment.YELLOW
      : data?.debt === 0 && data?.balance >= 0
      ? EPayment.GREEN
      : (data?.debt || 0) > 0 && data?.balance === 0
      ? EPayment.RED
      : EPayment.UNDEFINED;
  }, [data]);
  const filteredContactResponsibles = filterResponsible(contactResponsibles);
  return (
    <ExpandDiv>
      <ExpandDivSection>
        <FlexWithGap>
          <div>
            <UserAction>
              <TransferSvg
                color={bgColors.brotherBlue}
                width={18}
                height={18}
              />
              <p className="name">
                {
                  filteredContactResponsibles?.find(
                    (c) => c.type === SvgTypes.TRANSFER
                  )?.person?.user?.username
                }
              </p>
            </UserAction>
            <UserAction>
              <TimeSvg color={bgColors.brotherBlue} width={18} height={18} />
              <div className="dates">
                <p className="dm">
                  {moment(responsible?.datetime).format(DATE_FORMAT_SHOW_MMM)}
                </p>
                <p className="hm">
                  {moment(responsible?.datetime).format(DATE_FORMAT_HH_mm)}
                </p>
              </div>
            </UserAction>
            <div className="line" />
            <UserAction>
              <GiftSvg color={bgColors.brotherBlue} width={18} height={18} />
              <p className="name">
                {
                  filteredContactResponsibles?.find(
                    (c) => c.type === SvgTypes.GIFT
                  )?.person?.user?.username
                }
              </p>
            </UserAction>
            {groups?.length > 1 && (
              <Button
                style={{
                  backgroundColor: bgColor[type as keyof typeof bgColor],
                  color: color[type as keyof typeof color],
                  fontWeight: 700,
                  padding: "4px 4px",
                  minHeight: 0,
                  lineHeight: "12px",
                  fontSize: fontSizes.f8,
                  borderRadius: borders.b4,
                }}
              >
                {type === EPayment.RED ? (
                  <TransferParent>
                    {toCurrencyFormat(data?.debt)}
                  </TransferParent>
                ) : type === EPayment.GREEN ? (
                  <TransferParent>
                    {toCurrencyFormat(data?.balance)}
                  </TransferParent>
                ) : (
                  <PopoverContent>
                    <div className="balance">
                      {toCurrencyFormat(data?.balance)}
                    </div>
                    <div className="debt">-{toCurrencyFormat(data?.debt)}</div>
                  </PopoverContent>
                )}
              </Button>
            )}
          </div>
        </FlexWithGap>
      </ExpandDivSection>
      <Cards>{renderItems()}</Cards>
    </ExpandDiv>
  );
};

export default PaymentPopover;
