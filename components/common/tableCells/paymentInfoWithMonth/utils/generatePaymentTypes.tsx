import { EPayment, IGroup, TParams } from "types";
import { changeValuesToNumber } from "utils/changeValuesToNumber";
import { Button } from "components";
import { bgColor, color } from "../data";
import { borders, fontSizes } from "styles/theme";
import {
  CurrentStatus,
  PaymentWrapper,
  PopoverContent,
  StartDateContent,
  StudentStatus,
  TransferParent,
} from "../../style";
import { toCurrencyFormat } from "utils/toCurrencyFormat";
import {
  statuses,
  STUDYING_STUDENT,
  TRANSFERRED_STUDENT,
} from "constants/studentStatuses";
import moment from "moment/moment";
import { DATE_FORMAT_DD_MM_YYYY } from "constants/dates";
import React from "react";
import { identifyType } from "./identifyType";
import { IContacts } from "types/contact";
import { ITransfer } from "types/transfer";

export const generatePaymentTypes = ({
  user,
  transfer,
  isStartDateNextDate,
  setGroups,
  group,
  data,
  type,
  transferredToWithMonth,
  setPaymentTypes,
  paymentTypes,
}: {
  transfer?: ITransfer[];
  isStartDateNextDate: boolean;
  setGroups: React.Dispatch<any>;
  data: TParams;
  type: EPayment;
  transferredToWithMonth: any;
  setPaymentTypes: React.Dispatch<React.SetStateAction<any[]>>;
  paymentTypes: any[];
  user: IContacts;
  group?: IGroup;
}) => {
  let tempArray: any = [];
  let transferTypes: any = [];
  if (!!user) {
    if (!!transfer)
      for (let i = 0; i < transfer?.length; i++) {
        const d: TParams = changeValuesToNumber({
          obj: transfer[i]?.actualPayment,
          array: ["debt", "balance"],
        });
        const t = identifyType({ data: d });
        transferTypes = [...transferTypes, t];
        tempArray = [
          ...tempArray,
          {
            name: transfer[i]?.group?.name,
            balance: d?.balance,
            debt: d?.debt,
            nextMonth: false,
            amount: (
              <Button
                style={{
                  backgroundColor: bgColor[t as keyof typeof bgColor],
                  color: color[t as keyof typeof color],
                  fontWeight: 700,
                  padding: "4px 4px",
                  minHeight: 0,
                  lineHeight: "12px",
                  fontSize: fontSizes.f8,
                  borderRadius: borders.b4,
                }}
              >
                {t === EPayment.RED ? (
                  <TransferParent>- {toCurrencyFormat(d.debt)}</TransferParent>
                ) : t === EPayment.GREEN ? (
                  toCurrencyFormat(d.balance)
                ) : (
                  <PopoverContent>
                    <div className="balance">
                      {toCurrencyFormat(d?.balance)}
                    </div>
                    <div className="debt">-{toCurrencyFormat(d?.debt)}</div>
                  </PopoverContent>
                )}
              </Button>
            ),
            start_date: transfer[i]?.actualPayment?.start_date,
            finish_date: transfer[i]?.actualPayment?.finish_date,
            status: (
              <StudentStatus>{statuses?.[transfer[i]?.status]}</StudentStatus>
            ),
            lessons: transfer[i]?.actualPayment?.lesson_count ?? 0,
            groupMentors: transfer[i]?.group?.groupMentors,
          },
        ];
      }

    if (user.status.toString() !== TRANSFERRED_STUDENT?.toString()) {
      if (isStartDateNextDate) {
        setGroups([
          ...tempArray,
          {
            balance: 0,
            debt: 0,
            nextMonth: true,
            name: group?.name,
            amount: (
              <PaymentWrapper>
                <Button className="nextMonthIn">
                  <StartDateContent>
                    <p className="titleIn">Start date</p>
                    <p className="dateIn">
                      {moment(data?.start_date).format(DATE_FORMAT_DD_MM_YYYY)}
                    </p>
                  </StartDateContent>
                </Button>
              </PaymentWrapper>
            ),
            start_date: data?.start_date,
            finish_date: data?.finish_date,
            status: (
              <CurrentStatus>
                {statuses?.[user?.status || STUDYING_STUDENT]}
              </CurrentStatus>
            ),
            lessons: data?.lesson_count,
          },
        ]);
      } else {
        setGroups([
          ...tempArray,
          {
            name: group?.name,
            balance: data?.balance,
            debt: data?.debt,
            nextMonth: false,
            amount: (
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
                    - {toCurrencyFormat(data?.debt)}
                  </TransferParent>
                ) : type === EPayment.GREEN ? (
                  toCurrencyFormat(data?.balance)
                ) : (
                  <PopoverContent>
                    <div className="balance">
                      {toCurrencyFormat(data?.balance)}
                    </div>
                    <div className="debt">-{toCurrencyFormat(data?.debt)}</div>
                  </PopoverContent>
                )}
              </Button>
            ),
            start_date: data?.start_date,
            finish_date: data?.finish_date,
            status: (
              <CurrentStatus>
                {statuses?.[user?.status || STUDYING_STUDENT]}
              </CurrentStatus>
            ),
            lessons: data?.lesson_count,
            groupMentors: data?.group?.groupMentors,
          },
        ]);
      }
    } else {
      const d: TParams = changeValuesToNumber({
        obj: transferredToWithMonth?.actualPayment,
        array: ["debt", "balance"],
      });
      const t = identifyType({ data: d });
      transferTypes = [...transferTypes, t];
      setGroups([
        ...tempArray,
        {
          balance: transferredToWithMonth?.actualPayment?.balance,
          debt: transferredToWithMonth?.actualPayment?.debt,
          nextMonth: false,
          name: transferredToWithMonth?.group?.name,
          amount: (
            <Button
              style={{
                backgroundColor: bgColor[t as keyof typeof bgColor],
                color: color[t as keyof typeof color],
                fontWeight: 700,
                padding: "4px 4px",
                minHeight: 0,
                lineHeight: "12px",
                fontSize: fontSizes.f8,
                borderRadius: borders.b4,
              }}
            >
              {t === EPayment.RED ? (
                <TransferParent>
                  -{" "}
                  {toCurrencyFormat(
                    transferredToWithMonth?.actualPayment?.debt
                  )}
                </TransferParent>
              ) : t === EPayment.GREEN ? (
                toCurrencyFormat(transferredToWithMonth?.actualPayment?.balance)
              ) : (
                t === EPayment.YELLOW && (
                  <PopoverContent>
                    <div className="balance">
                      {toCurrencyFormat(
                        transferredToWithMonth?.actualPayment?.balance
                      )}
                    </div>
                    <div className="debt">
                      -
                      {toCurrencyFormat(
                        transferredToWithMonth?.actualPayment?.debt
                      )}
                    </div>
                  </PopoverContent>
                )
              )}
            </Button>
          ),
          start_date: transferredToWithMonth?.actualPayment?.start_date,
          finish_date: transferredToWithMonth?.actualPayment?.finish_date,
          status: (
            <CurrentStatus>
              {
                statuses?.[
                  (transferredToWithMonth?.status ||
                    STUDYING_STUDENT) as keyof typeof statuses
                ]
              }
            </CurrentStatus>
          ),
          lessons: transferredToWithMonth?.actualPayment?.lesson_count,
          groupMentors: transferredToWithMonth?.group?.groupMentors,
        },
      ]);
    }
  }
  setPaymentTypes([...paymentTypes, ...transferTypes, type]);
};
