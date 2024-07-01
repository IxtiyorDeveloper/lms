import {
  AntdInfoCell,
  LifeCycleLabel,
  TableHeading,
  UserProfileWithPhone,
} from "components";
import React from "react";
import { ColWrapper } from "./style";
import { IStudentBalanceTransactionObj } from "types/finance/studentBalance";
import { getRowNumber } from "utils/getRowNumber";
import { toCurrencyFormat } from "utils/toCurrencyFormat";
import moment from "moment";
import { store, toggleLifecycleModal } from "store";
import { BALANCE_OUT_TYPE } from "../../../../../../constants/studentBalance";

export const Columns = () => {
  return [
    {
      dataIndex: ["user"],
      hide: false,
      title: (
        <TableHeading isId padding>
          Name
        </TableHeading>
      ),
      render: (
        value: any,
        record: IStudentBalanceTransactionObj,
        index: number,
      ) => {
        const id = getRowNumber({ index });
        const userProfile = record.user.userProfile;
        const userPhones = record.user.userPhones;

        return (
          <ColWrapper>
            <div className="flex">
              <p className="index">{id}</p>
              <UserProfileWithPhone
                firstName={userProfile.firstname}
                avatar={userProfile.avatar}
                phoneNumbers={userPhones}
              />
            </div>
          </ColWrapper>
        );
      },
    },
    {
      title: <TableHeading>Balance out type</TableHeading>,
      dataIndex: ["action"],
      render: (value: any, record: any) => {
        return (
          <ColWrapper>
            <p>{BALANCE_OUT_TYPE[value as keyof typeof BALANCE_OUT_TYPE]}</p>
          </ColWrapper>
        );
      },
    },
    {
      title: <TableHeading>Lesson count</TableHeading>,
      dataIndex: ["user", "student", "lessonCount"],
      render: (value: any) => {
        return (
          <ColWrapper>
            <p>{value}</p>
          </ColWrapper>
        );
      },
    },
    {
      title: <TableHeading>Amount out</TableHeading>,
      dataIndex: ["amount"],
      render: (value: any) => {
        return (
          <ColWrapper>
            <p className="amount">-{toCurrencyFormat(Number(value))}</p>
          </ColWrapper>
        );
      },
    },
    {
      title: <TableHeading>Created date</TableHeading>,
      dataIndex: ["created_at"],
      render: (value: any) => {
        return (
          <ColWrapper>
            <p>{moment(value).format("DD MMM HH:mm")}</p>
          </ColWrapper>
        );
      },
    },
    {
      title: <TableHeading isId>Label</TableHeading>,
      dataIndex: ["user"],
      render: (value: any) => {
        return (
          <ColWrapper>
            <div className="lifeCycle">
              <LifeCycleLabel
                onClick={() => {
                  store.dispatch(
                    toggleLifecycleModal({
                      open: true,
                      id: value?.id,
                    }),
                  );
                }}
                size="small"
              />
            </div>
          </ColWrapper>
        );
      },
    },
  ];
};
