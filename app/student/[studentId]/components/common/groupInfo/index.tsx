import { Grid } from "@mui/material";
import React, { useEffect, useMemo, useState } from "react";
import {
  Wrapper,
  RowWrapper,
  PersonalBox,
  ActionBoxes,
  ActionBox,
  TopRow,
  ActionWrapper,
  ArrowWrapper,
  DateWrapper,
  BottomRow,
} from "./style";
import { EssentialSvg, TextBg, ArrowRight, Button } from "components";
import { bgColors, borders, fontSizes, textColors } from "styles/theme";
import { useStudentGroup } from "hooks";
import { useRouter } from "next/router";
import { ADDED_BY, TRANSFERRED_BY } from "constants/contactResponsibles";
import moment from "moment";
import { statuses } from "constants/studentStatuses";
import { toCurrencyFormat } from "utils/toCurrencyFormat";
import { EPayment } from "types";
import { Content, TransferParent } from "components/common/tableCells/style";
import _ from "lodash";
import { Spin } from "antd";
import { DATE_FORMAT_DD_MM_YYYY, DATE_FORMAT_HH_mm } from "constants/dates";
import { CheckPermission } from "utils/guard";
import { COMPONENTS_VIEWS } from "constants/permissions";
import { convertNumericStringsToNumbersWithTarget } from "utils/changeValuesToNumber";
import { IContacts } from "types/contact";

const bgColor = {
  "100": bgColors.spring,
  "200": bgColors.spring,
  "300": bgColors.spring,
  "400": bgColors.daisy,
  "500": bgColors.transparent,
  "600": bgColors.pale,
};

const color = {
  "100": textColors.lucky,
  "200": textColors.lucky,
  "300": textColors.lucky,
  "400": textColors.kenyan,
  "500": bgColors.brotherBlue,
  "600": bgColors.rose,
};
const border = {
  "100": bgColors.spring,
  "200": bgColors.spring,
  "300": bgColors.spring,
  "400": bgColors.daisy,
  "500": bgColors.brotherBlue,
  "600": bgColors.pale,
};
const radius = {
  "100": "50px",
  "200": "50px",
  "300": "50px",
  "400": "50px",
  "500": "4px",
  "600": "50px",
};
const buttonBgColor = {
  yellow: bgColors.primary,
  green: bgColors.midori,
  red: bgColors.pop,
};
const buttonColor = {
  yellow: textColors.dark,
  green: textColors.white,
  red: textColors.white,
};
const GroupInfo = () => {
  const router = useRouter();
  const [data, setData] = useState<any[] | undefined>();
  const {
    data: studentGroupWithStringValues,
    isLoading,
    isPreviousData,
  } = useStudentGroup({
    user_id: router.query.studentId,
    expand: "group,transferredFrom.group,actualTransfers",
  });

  const studentGroup: IContacts[] | undefined = useMemo(() => {
    return convertNumericStringsToNumbersWithTarget({
      data: studentGroupWithStringValues,
      targetList: ["debt", "balance"],
    });
  }, [isPreviousData, isLoading]);

  useEffect(() => {
    let d: any = [];
    if (studentGroup) {
      for (let i = 0; i < studentGroup?.length; i++) {
        const singleData = studentGroup?.[i];
        let actions: any = [];
        if (!!singleData?.transferredFrom) {
          const from = singleData?.transferredFrom;
          actions = [
            {
              group_name: from?.group?.name,
              from: from?.actualPayment?.start_date,
              to: from?.actualPayment?.finish_date,
              lesson: `Lesson ${from?.actualPayment?.lesson_count}`,
              paid: from?.actualPayment?.balance,
              action: statuses[from?.status],
              status: from?.status,
              actualPayment: from?.actualPayment,
              user: from?.user,
              group: from?.group,
              actualTransfers: from?.actualTransfers,
            },
            {
              group_name: singleData?.group?.name,
              from: singleData?.actualPayment?.start_date,
              to: singleData?.actualPayment?.finish_date,
              lesson: `Lesson ${singleData?.actualPayment?.lesson_count}`,
              paid: singleData?.actualPayment?.balance,
              action: statuses[singleData?.status],
              status: singleData?.status,
              actualPayment: singleData?.actualPayment,
              user: singleData?.user,
              group: singleData?.group,
              actualTransfers: singleData?.actualTransfers,
            },
          ];
        } else {
          actions = [
            {},
            {
              group_name: singleData?.group?.name,
              from: singleData?.actualPayment?.start_date,
              to: singleData?.actualPayment?.finish_date,
              lesson: `Lesson ${singleData?.actualPayment?.lesson_count}`,
              paid: singleData?.actualPayment?.balance,
              action: statuses[singleData?.status],
              status: singleData?.status,
              actualPayment: singleData?.actualPayment,
              user: singleData?.user,
              group: singleData?.group,
              actualTransfers: singleData?.actualTransfers,
            },
          ];
        }
        d = [
          ...d,
          {
            name:
              singleData?.contactResponsibles?.find(
                (responsible: { type: number }) =>
                  responsible?.type.toString() === TRANSFERRED_BY.toString(),
              )?.username ??
              singleData?.contactResponsibles?.find(
                (responsible: { type: number }) =>
                  responsible?.type.toString() === ADDED_BY.toString(),
              )?.username,
            date: moment(
              singleData?.contactResponsibles?.find(
                (responsible) =>
                  responsible?.type.toString() === TRANSFERRED_BY.toString(),
              )?.datetime ??
                singleData?.contactResponsibles?.find(
                  (responsible) =>
                    responsible?.type.toString() === ADDED_BY.toString(),
                )?.datetime,
            )?.format(DATE_FORMAT_DD_MM_YYYY),
            hour: moment(
              singleData?.contactResponsibles?.find(
                (responsible) => responsible?.type === TRANSFERRED_BY,
              )?.datetime ??
                singleData?.contactResponsibles?.find(
                  (responsible) => responsible?.type === ADDED_BY,
                )?.datetime,
            )?.format(DATE_FORMAT_HH_mm),
            actions: actions,
          },
        ];
      }
    }
    setData(d);
  }, [studentGroup]);

  return (
    <Wrapper>
      <Spin spinning={isLoading}>
        {data?.map((item, key) => {
          return (
            <RowWrapper key={key}>
              <Grid container spacing="10px">
                <Grid item xs={2}>
                  <PersonalBox>
                    <div className="name">{item?.name}</div>
                    <div className="date">{item?.date}</div>
                    <div className="hour">{item?.hour}</div>
                    <div className="badge">
                      <EssentialSvg />
                    </div>
                  </PersonalBox>
                </Grid>
                <Grid item xs={10}>
                  <ActionBoxes>
                    {item?.actions?.map((item: any, k: number) => {
                      const p = item?.actualPayment;

                      const type =
                        (p?.debt || 0) > 0 && (p?.balance || 0) > 0
                          ? EPayment.YELLOW
                          : p?.debt === 0 && p?.balance >= 0
                            ? EPayment.GREEN
                            : (p?.debt || 0) > 0 && p?.balance === 0
                              ? EPayment.RED
                              : EPayment.UNDEFINED;

                      if (!_.isEmpty(item))
                        return (
                          <ActionWrapper key={k}>
                            <ActionBox
                              color={
                                k > 0
                                  ? textColors.transparentGreen05
                                  : textColors.whiteSmoke
                              }
                            >
                              <TopRow>
                                <div className="group">{item?.group_name}</div>
                                <DateWrapper>
                                  <div className="from">{item?.from}</div>
                                  <div className="arrow"></div>
                                  <div className="to">{item?.to}</div>
                                </DateWrapper>
                              </TopRow>
                              <div className="lesson">{item?.lesson}</div>
                              <BottomRow>
                                <CheckPermission
                                  permission={[
                                    COMPONENTS_VIEWS.can_see_student_payment,
                                  ]}
                                >
                                  <Button
                                    style={{
                                      backgroundColor:
                                        buttonBgColor[
                                          type as keyof typeof buttonBgColor
                                        ],
                                      color:
                                        buttonColor[
                                          type as keyof typeof buttonColor
                                        ],
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
                                        - {toCurrencyFormat(p.debt)}
                                      </TransferParent>
                                    ) : type === EPayment.GREEN ? (
                                      toCurrencyFormat(p.balance)
                                    ) : (
                                      <Content>
                                        <div className="balance">
                                          {toCurrencyFormat(p?.balance)}
                                        </div>
                                        <div className="debt">
                                          -{toCurrencyFormat(p?.debt)}
                                        </div>
                                      </Content>
                                    )}
                                  </Button>
                                </CheckPermission>
                                <TextBg
                                  text={item?.action}
                                  style={{
                                    background:
                                      bgColor[
                                        item?.status as keyof typeof bgColor
                                      ],
                                    color:
                                      color[item?.status as keyof typeof color],
                                    borderRadius:
                                      radius[
                                        item?.status as keyof typeof radius
                                      ],
                                    borderColor:
                                      border[
                                        item?.status as keyof typeof border
                                      ],
                                  }}
                                />
                              </BottomRow>
                            </ActionBox>
                            {k !== 1 && (
                              <ArrowWrapper>
                                <ArrowRight color={bgColors.dark} />
                              </ArrowWrapper>
                            )}
                          </ActionWrapper>
                        );
                      else {
                        return (
                          <ActionWrapper key={k}>
                            <ActionBox
                              color={
                                k > 0
                                  ? textColors.transparentGreen05
                                  : textColors.whiteSmoke
                              }
                            >
                              <TopRow>
                                <div className="group">Waiting List</div>
                              </TopRow>
                            </ActionBox>
                            {k !== 1 && (
                              <ArrowWrapper>
                                <ArrowRight color={bgColors.dark} />
                              </ArrowWrapper>
                            )}
                          </ActionWrapper>
                        );
                      }
                    })}
                  </ActionBoxes>
                </Grid>
              </Grid>
            </RowWrapper>
          );
        })}
      </Spin>
    </Wrapper>
  );
};

export default GroupInfo;
