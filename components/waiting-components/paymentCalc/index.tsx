import React, { FC } from "react";
import {
  BalanceWrapper,
  Flex,
  FlexGroupHeader,
  FlexWrapper,
  FormElementWrapper,
  Group,
  GroupsWrapper,
  GroupTitle,
  InfoBoxWrapper,
  PaymentBalance,
  PaymentFirstBox,
  TypeWrapper,
  WrapperAmount,
  WrapperLessons,
} from "./style";
import {
  BookReviewSvg,
  CalendarAmazonSvg,
  ChartSvg,
  ChevronRightSvg,
  WalletSvg,
} from "components/index";
import moment from "moment/moment";
import { bgColors, textColors } from "styles/theme";
import { toCurrencyFormat } from "utils/toCurrencyFormat";
import { DATE_FORMAT_SHOW_MMM, DATE_FORMAT_YYYY_MM_DD } from "constants/dates";

interface IProps {
  dataCalc: any;
  groups: any;
  open: any;
}
const PaymentCalc: FC<IProps> = ({ dataCalc, groups, open }) => {
  return (
    <div>
      {dataCalc && (
        <FormElementWrapper>
          <InfoBoxWrapper>
            <GroupsWrapper>
              <Group>
                <FlexGroupHeader>
                  <GroupTitle>{groups.old.name}</GroupTitle>
                  <TypeWrapper>{groups.old.type}</TypeWrapper>
                </FlexGroupHeader>
                <div>
                  <WrapperLessons>
                    <Flex>
                      <BookReviewSvg /> Lesson
                    </Flex>
                    <span>{dataCalc.old_group.lesson_count}</span>
                  </WrapperLessons>
                  <WrapperLessons>
                    <Flex>
                      <CalendarAmazonSvg />{" "}
                      {moment(
                        dataCalc.old_group.date_from,
                        DATE_FORMAT_YYYY_MM_DD,
                      ).format(DATE_FORMAT_SHOW_MMM)}{" "}
                      -{" "}
                      {moment(
                        dataCalc.old_group.date_to,
                        DATE_FORMAT_YYYY_MM_DD,
                      ).format(DATE_FORMAT_SHOW_MMM)}
                    </Flex>
                  </WrapperLessons>
                </div>
                <FlexWrapper>
                  <WrapperAmount
                    style={{
                      background:
                        dataCalc.old_group.balance > 0 &&
                        dataCalc.old_group.debt > 0
                          ? bgColors.primary
                          : dataCalc.old_group.balance > 0 ||
                              (dataCalc.old_group.balance === 0 &&
                                dataCalc.old_group.debt === 0)
                            ? bgColors.midori
                            : bgColors.pop,
                    }}
                  >
                    {dataCalc.old_group.balance > 0 &&
                      toCurrencyFormat(+dataCalc.old_group.balance)}
                    {dataCalc.old_group.debt > 0 && (
                      <>{"-" + toCurrencyFormat(dataCalc.old_group.debt)}</>
                    )}
                    {dataCalc.old_group.balance === 0 &&
                      dataCalc.old_group.debt === 0 &&
                      toCurrencyFormat(0)}
                  </WrapperAmount>
                </FlexWrapper>
              </Group>
              <ChevronRightSvg width={25} height={25} />
              <Group>
                <FlexGroupHeader>
                  <GroupTitle>{open.group.name}</GroupTitle>
                  <TypeWrapper>
                    {open.group.groupType || open.group.type}
                  </TypeWrapper>
                </FlexGroupHeader>
                <div>
                  <WrapperLessons>
                    <Flex>
                      <BookReviewSvg /> Lesson
                    </Flex>
                    <span>{dataCalc.new_group.lesson_count}</span>
                  </WrapperLessons>
                  <WrapperLessons>
                    <Flex>
                      <CalendarAmazonSvg />{" "}
                      {moment(
                        dataCalc.new_group.date_from,
                        DATE_FORMAT_YYYY_MM_DD,
                      ).format(DATE_FORMAT_SHOW_MMM)}{" "}
                      -{" "}
                      {moment(
                        dataCalc.new_group.date_to,
                        DATE_FORMAT_YYYY_MM_DD,
                      ).format(DATE_FORMAT_SHOW_MMM)}
                    </Flex>
                  </WrapperLessons>
                </div>
                <FlexWrapper>
                  <WrapperAmount
                    style={{
                      background:
                        dataCalc.new_group.balance > 0 &&
                        dataCalc.new_group.debt > 0
                          ? bgColors.primary
                          : dataCalc.new_group.balance > 0 ||
                              (dataCalc.new_group.balance === 0 &&
                                dataCalc.new_group.debt === 0)
                            ? bgColors.midori
                            : bgColors.pop,
                    }}
                  >
                    {dataCalc.new_group.balance > 0 &&
                      toCurrencyFormat(dataCalc.new_group.balance)}
                    {dataCalc.new_group.debt > 0 && (
                      <p>{"- " + toCurrencyFormat(dataCalc.new_group.debt)}</p>
                    )}
                    {dataCalc.new_group.balance === 0 &&
                      dataCalc.new_group.debt === 0 &&
                      toCurrencyFormat(0)}
                  </WrapperAmount>
                </FlexWrapper>
              </Group>
            </GroupsWrapper>
            <BalanceWrapper>
              <PaymentFirstBox style={{ width: "90%" }}>
                <Flex>
                  <WalletSvg /> Student balance
                </Flex>
                <PaymentBalance className="grotesk">
                  {toCurrencyFormat(dataCalc.student.balance || 0)}
                  &nbsp;
                  {dataCalc.student.difference !== 0 && (
                    <sup
                      style={{
                        color:
                          dataCalc.student.difference > 0
                            ? bgColors.midori
                            : bgColors.pop,
                      }}
                    >
                      {`${
                        dataCalc.student.difference > 0
                          ? "+"
                          : dataCalc.student.difference === 0
                            ? ""
                            : "-"
                      }${
                        dataCalc.student.difference !== 0
                          ? toCurrencyFormat(dataCalc.student.difference)
                          : ""
                      }`}
                    </sup>
                  )}
                </PaymentBalance>
              </PaymentFirstBox>
              <PaymentFirstBox
                style={{
                  borderLeft: `1px solid ${bgColors.whiteSmoke}`,
                  paddingLeft: "20px",
                }}
              >
                <Flex>
                  <ChartSvg /> Total debt
                </Flex>
                <PaymentBalance
                  style={{ color: textColors.pop }}
                  className="grotesk"
                >
                  {toCurrencyFormat(dataCalc.total_debt)}
                </PaymentBalance>
              </PaymentFirstBox>
            </BalanceWrapper>
          </InfoBoxWrapper>
        </FormElementWrapper>
      )}
    </div>
  );
};

export default PaymentCalc;
