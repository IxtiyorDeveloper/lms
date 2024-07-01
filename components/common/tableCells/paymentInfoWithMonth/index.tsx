import React, { useEffect, useState } from "react";
import { Popover } from "antd";
import PaymentPopover from "./paymentPopover";
import { Button } from "../../index";
import { EPayment, IGroup, TParams } from "types";
import {
  Content,
  PaymentWrapper,
  StartDateContent,
  TransferParent,
} from "../style";
import { toCurrencyFormat } from "utils/toCurrencyFormat";
import { useDispatch } from "react-redux";
import { toggleModal } from "store";
import { IContacts } from "types/contact";
import moment from "moment";
import { DATE_FORMAT_DD_MM_YYYY } from "constants/dates";
import {
  changeValuesToNumber,
  convertNumericStringsToNumbersWithTarget,
} from "utils/changeValuesToNumber";
import { funcCheckPermission } from "utils/guard";
import { COMPONENTS_VIEWS } from "constants/permissions";
import { bgColor, color } from "./data";
import { identifyType } from "./utils/identifyType";
import { generatePaymentTypes } from "./utils/generatePaymentTypes";

const PaymentInfoWithMonth = ({
  user,
  group,
  queryKeys,
  paymentDisabled = false,
}: {
  user: IContacts;
  group?: IGroup;
  queryKeys?: string[];
  paymentDisabled?: boolean;
}) => {
  const [paymentTypes, setPaymentTypes] = useState<any[]>([]);
  const data: TParams = changeValuesToNumber({
    obj: user?.actualPayment,
    array: ["debt", "balance"],
  });

  const transfer = user?.actualTransfersWithMonth;
  const transferredToWithMonth = convertNumericStringsToNumbersWithTarget({
    data: user?.transferredToWithMonth,
    targetList: ["debt", "balance"],
  });

  const [groups, setGroups] = useState<any>([]);

  const startDate = moment(data?.start_date);
  const startOfNextMonth = moment().startOf("month").add(1, "month");
  const endOfFollowingMonth = moment().endOf("month").add(1, "month");

  const isStartDateNextDate = moment(startDate).isBetween(
    startOfNextMonth,
    endOfFollowingMonth,
    null,
    "[]",
  );

  const type = identifyType({ data });

  const dispatch = useDispatch();
  const can_take_payment_student = funcCheckPermission([
    COMPONENTS_VIEWS.can_take_payment_student,
  ]);
  const handlePress = (data: any) => {
    if (
      !paymentTypes.every((paymentType) => paymentType === EPayment.GREEN) &&
      !paymentDisabled &&
      can_take_payment_student
    )
      dispatch(
        toggleModal({
          key: "paymentV2",
          data: {
            data,
            open: true,
          },
        }),
      );
  };

  useEffect(() => {
    generatePaymentTypes({
      data,
      group,
      isStartDateNextDate,
      paymentTypes,
      setGroups,
      setPaymentTypes,
      transfer,
      transferredToWithMonth,
      type,
      user,
    });
  }, [user]);

  if (!data) return null;
  if (isStartDateNextDate) {
    return (
      <Popover
        destroyTooltipOnHide
        content={
          <PaymentPopover
            groups={groups}
            contactResponsibles={user?.contactResponsibles}
          />
        }
        title=""
        trigger="hover"
        placement="bottomRight"
      >
        <PaymentWrapper>
          <Button className="nextMonth">
            {groups.length > 1 && <div className="child">{groups.length}</div>}
            <StartDateContent>
              <p className="title">Start date</p>
              <p className="date">
                {moment(data?.start_date).format(DATE_FORMAT_DD_MM_YYYY)}
              </p>
            </StartDateContent>
          </Button>
        </PaymentWrapper>
      </Popover>
    );
  } else {
    if (!!transfer?.length) {
      return (
        <Popover
          destroyTooltipOnHide
          content={
            <PaymentPopover
              groups={groups}
              contactResponsibles={user?.contactResponsibles}
            />
          }
          title=""
          trigger="hover"
          placement="bottomRight"
        >
          <PaymentWrapper>
            <Button
              style={{
                backgroundColor: bgColor[type as keyof typeof bgColor],
                color: color[type as keyof typeof color],
                fontWeight: 600,
                padding: "3px 7.5px",
                minHeight: 0,
                minWidth: "100px",
              }}
              className="res"
              onClick={() =>
                handlePress({
                  user: user,
                  group: group,
                  queryKeys: queryKeys,
                })
              }
            >
              {type === EPayment.RED ? (
                <TransferParent>
                  <div className="child">{groups.length}</div>-{" "}
                  {toCurrencyFormat(data?.debt)}
                </TransferParent>
              ) : type === EPayment.GREEN ? (
                <TransferParent>
                  <div className="child">{groups.length}</div>
                  {toCurrencyFormat(data?.balance)}
                </TransferParent>
              ) : (
                <Content>
                  <div className="child">{groups.length}</div>
                  <div className="balance">
                    {toCurrencyFormat(data?.balance)}
                  </div>
                  <div className="debt">-{toCurrencyFormat(data?.debt)}</div>
                </Content>
              )}
            </Button>
          </PaymentWrapper>
        </Popover>
      );
    } else {
      return (
        <Popover
          destroyTooltipOnHide
          content={
            <PaymentPopover
              groups={groups}
              contactResponsibles={user?.contactResponsibles}
            />
          }
          title=""
          trigger="hover"
          placement="bottomRight"
        >
          <PaymentWrapper>
            <Button
              className="paymentCell"
              style={{
                backgroundColor: bgColor[type as keyof typeof bgColor],
                color: color[type as keyof typeof color],
              }}
              onClick={() =>
                handlePress({
                  user: user,
                  group: group,
                  queryKeys: queryKeys,
                })
              }
            >
              {type === EPayment.RED ? (
                <TransferParent>
                  - {toCurrencyFormat(data?.debt)}
                </TransferParent>
              ) : type === EPayment.GREEN ? (
                toCurrencyFormat(data?.balance)
              ) : (
                <Content>
                  <div className="balance">
                    {toCurrencyFormat(data?.balance)}
                  </div>
                  <div className="debt">-{toCurrencyFormat(data?.debt)}</div>
                </Content>
              )}
            </Button>
          </PaymentWrapper>
        </Popover>
      );
    }
  }
};

export default PaymentInfoWithMonth;
