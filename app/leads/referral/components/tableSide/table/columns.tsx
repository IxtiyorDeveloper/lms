import { getRowNumber } from "utils/getRowNumber";
import { ArrowCol, ColWrap } from "./style";
import {
  AntdInfoCell,
  Call,
  LifeCycleLabel,
  Mail,
  PhoneCell,
  TableHeading,
} from "components";
import ReferredByUser from "./referredByUser";
import moment from "moment";
import { store, toggleLifecycleModal, toggleModal } from "store";
import React from "react";
import {
  REFERRAL_APPROVED,
  REFERRAL_CONTACTING,
  REFERRAL_PAID,
  REFERRAL_REGISTERED,
  REFERRAL_REJECTED,
  REFERRAL_SPENT,
} from "constants/referral";
import { ArrowRight } from "@jasurbekyuldashov/lms-web-icons";
import { bgColors } from "styles/theme";
import { toCurrencyFormat } from "utils/toCurrencyFormat";
import { referralsColorsList } from "./index";
import { startCall } from "utils/call";
import env from "utils/env";
import { toast } from "react-toastify";
import { useDispatch } from "react-redux";

export const Columns = ({ type }: { type: number }) => {
  const onCallButtonPress = (phone_number: string) => {
    try {
      startCall(`sip:${phone_number as string}@${env.pbxUrl}`);
    } catch (e) {
      toast.error("Something went wrong!");
    }
  };

  const leadName = {
    title: () => (
      <TableHeading padding isId>
        Lead Name
      </TableHeading>
    ),
    dataIndex: ["lead", "name"],
    render: (value: any, record: any, index: number) => {
      return (
        <ColWrap>
          <p className="number_index">{getRowNumber({ index })}</p>
          <p className="name_cell">{value}</p>
        </ColWrap>
      );
    },
  };

  const referredBy = {
    title: () => <TableHeading padding>Referred by</TableHeading>,
    dataIndex: ["referredBy"],
    render: (value: any) => {
      return (
        <ColWrap>
          <ReferredByUser value={value} />
        </ColWrap>
      );
    },
  };

  const label = {
    title: () => <TableHeading padding>Label</TableHeading>,
    dataIndex: ["lead"],
    render: (value: any, record: any) => {
      return (
        <ColWrap>
          <LifeCycleLabel
            onClick={() => {
              store.dispatch(
                toggleLifecycleModal({
                  open: true,
                  id: record?.lead?.id,
                }),
              );
            }}
            size="small"
          />
        </ColWrap>
      );
    },
  };

  const dispatch = useDispatch();

  const actions = {
    title: () => <TableHeading padding>Actions</TableHeading>,
    dataIndex: ["lead"],
    render: (value: any, record: any) => {
      return (
        <ColWrap>
          <div className="gap">
            <Call
              key={`call_${record?.lead?.id || record?.student?.user_id}_key`}
              onClick={onCallButtonPress}
              value={
                [
                  {
                    // @ts-ignore
                    phone_number: value?.main_phone,
                    id: record?.lead?.id,
                    type: 200,
                    is_confirmed: 2,
                  },
                ] || []
              }
              size="small"
            />
            <Mail
              key={`sms_${record?.lead?.id || record?.student?.user_id}_key`}
              size="small"
              onClick={() => {
                dispatch(
                  toggleModal({
                    key: "selfSms",
                    data: {
                      data: {
                        user_id: record?.lead?.id || record?.student?.user_id,
                        id: record?.lead?.id || record?.student?.user_id,
                        filter: "contact",
                        sent_field_name: "user_id",
                      },
                      open: true,
                    },
                  }),
                );
              }}
            />
          </div>
        </ColWrap>
      );
    },
  };

  const studentName = (isBeginner?: boolean) => ({
    title: () => (
      <TableHeading padding isId={!!isBeginner}>
        Student name
      </TableHeading>
    ),
    dataIndex: ["student"],
    render: (value: any, record: any, index: number) => {
      return (
        <ColWrap>
          {!!isBeginner ? (
            <p className="number_index">{getRowNumber({ index })}</p>
          ) : null}
          <ReferredByUser
            value={{
              userProfile: {
                user_id: value?.user?.id,
                avatar: value?.user?.avatar,
                firstname:
                  value?.user?.userProfile.firstname || record?.lead?.name,
                lastname: value?.user?.userProfile.lastname,
              },
              confirmedPhone: value?.user?.userPhones[0],
              main_phone: record?.lead?.main_phone,
            }}
          />
        </ColWrap>
      );
    },
  });

  const referredDate = {
    title: () => <TableHeading padding>Referred date</TableHeading>,
    dataIndex: ["created_at"],
    render: (value: any) => {
      return (
        <ColWrap>
          <div className="referred_date">
            <p>{moment(value).format("DD MMM")}</p>
            <p>{moment(value).format("HH:mm")}</p>
          </div>
        </ColWrap>
      );
    },
  };

  return type === REFERRAL_CONTACTING
    ? [
        leadName,
        {
          title: () => <TableHeading padding>Lead phone number</TableHeading>,
          dataIndex: ["lead", "main_phone"],
          render: (value: any, record: any) => {
            return (
              <ColWrap>
                <PhoneCell
                  value={[
                    {
                      phone_number: value,
                      id: record?.lead?.id,
                      type: 200,
                      is_confirmed: 2,
                    },
                  ]}
                />
              </ColWrap>
            );
          },
        },
        referredBy,
        referredDate,
        label,
        actions,
      ]
    : type === REFERRAL_REGISTERED
      ? [
          leadName,
          referredBy,
          referredDate,
          {
            title: () => <TableHeading padding> </TableHeading>,
            dataIndex: [""],
            render: () => {
              return (
                <ArrowCol>
                  <ArrowRight
                    color={bgColors.brotherBlue}
                    width={23}
                    height={23}
                  />
                </ArrowCol>
              );
            },
          },
          studentName(),
          {
            title: () => <TableHeading padding>Registered by</TableHeading>,
            dataIndex: ["student", "createdBy", "username"],
            render: (value: any) => {
              return <ColWrap>{value}</ColWrap>;
            },
          },
          {
            title: () => <TableHeading padding>Registered date</TableHeading>,
            dataIndex: ["updated_at"],
            render: (value: any) => {
              return (
                <ColWrap>
                  <div>
                    <p>{moment(value).format("DD MMM")}</p>
                    <p>{moment(value).format("HH:mm")}</p>
                  </div>
                </ColWrap>
              );
            },
          },
        ]
      : type === REFERRAL_PAID
        ? [
            studentName(true),
            {
              title: () => <TableHeading padding>Group info</TableHeading>,
              dataIndex: ["student", "currentGroupContact"],
              render: (value: any, record: any) => {
                return (
                  <ColWrap>
                    <div className="group_info">
                      <AntdInfoCell
                        record={{ ...record, group: value.group }}
                        value={value.group}
                      />
                    </div>
                  </ColWrap>
                );
              },
            },
            referredBy,
            {
              title: () => <TableHeading padding>Studied lesson</TableHeading>,
              dataIndex: ["student", "currentGroupContact", "actualPayment"],
              render: (value: any) => {
                return (
                  <ColWrap>
                    <p>{value?.lesson_count}</p>
                  </ColWrap>
                );
              },
            },
            {
              title: () => <TableHeading padding>Periods</TableHeading>,
              dataIndex: ["student", "currentGroupContact", "actualPayment"],
              render: (value: any) => {
                return (
                  <ColWrap>
                    <div className="d-wrap">
                      <p>{moment(value?.start_date).format("DD MMM")}</p>
                      <ArrowRight color={bgColors.yourShadow} />
                      <p>{moment(value?.finish_date).format("DD MMM")}</p>
                    </div>
                  </ColWrap>
                );
              },
            },
            {
              title: () => <TableHeading padding>Paid date</TableHeading>,
              dataIndex: ["updated_at"],
              render: (value: any) => {
                return (
                  <ColWrap>
                    <div>
                      <p>{moment(value).format("DD MMM")}</p>
                      <p>{moment(value).format("HH:mm")}</p>
                    </div>
                  </ColWrap>
                );
              },
            },
            label,
            actions,
          ]
        : type === REFERRAL_APPROVED
          ? [
              studentName(true),
              {
                title: () => <TableHeading padding>Group info</TableHeading>,
                dataIndex: ["student", "currentGroupContact"],
                render: (value: any, record: any) => {
                  return (
                    <ColWrap>
                      <div className="group_info">
                        <AntdInfoCell
                          record={{ ...record, group: value.group }}
                          value={value.group}
                        />
                      </div>
                    </ColWrap>
                  );
                },
              },
              referredBy,
              {
                title: () => (
                  <TableHeading padding>Payment amount</TableHeading>
                ),
                dataIndex: [
                  "student",
                  "currentGroupContact",
                  "actualPayment",
                  "balance",
                ],
                render: (value: any) => {
                  return (
                    <ColWrap>
                      <div className="payment-amount">
                        {toCurrencyFormat(Number(value))}
                      </div>
                    </ColWrap>
                  );
                },
              },
              {
                title: () => <TableHeading padding>Approved date</TableHeading>,
                dataIndex: ["lastLifeCycle", "data", "approved_date"],
                render: (value: any) => {
                  return (
                    <ColWrap>
                      <div>
                        <p>{moment(value).format("DD MMM")}</p>
                        <p>{moment(value).format("HH:mm")}</p>
                      </div>
                    </ColWrap>
                  );
                },
              },
              {
                title: () => (
                  <TableHeading padding>Cashback given</TableHeading>
                ),
                dataIndex: ["status"],
                render: (value: any, record: any) => {
                  return (
                    <ColWrap>
                      {value === REFERRAL_SPENT ? (
                        <div className="payment-amount">
                          {moment(record?.updated_at).format("DD MMM HH:mm")}
                        </div>
                      ) : (
                        <div className="payment-amount-gray">Not given yet</div>
                      )}
                    </ColWrap>
                  );
                },
              },
              label,
              actions,
            ]
          : type === REFERRAL_REJECTED
            ? [
                studentName(true),
                referredBy,
                {
                  title: () => (
                    <TableHeading padding>Referred date</TableHeading>
                  ),
                  dataIndex: ["created_at"],
                  render: (value: any) => {
                    return (
                      <ColWrap>
                        <div>
                          <p>{moment(value).format("DD MMM")}</p>
                          <p>{moment(value).format("HH:mm")}</p>
                        </div>
                      </ColWrap>
                    );
                  },
                },
                {
                  title: () => (
                    <TableHeading padding>Rejected date</TableHeading>
                  ),
                  dataIndex: ["lead", "deleted_at"],
                  render: (value: any, record: any) => {
                    return (
                      <ColWrap>
                        <div>
                          <p>
                            {moment(value || record?.updated_at).format(
                              "DD MMM",
                            )}
                          </p>
                          <p>
                            {moment(value || record?.updated_at).format(
                              "HH:mm",
                            )}
                          </p>
                        </div>
                      </ColWrap>
                    );
                  },
                },
                {
                  title: () => (
                    <TableHeading padding>Rejected from</TableHeading>
                  ),
                  dataIndex: [
                    "student",
                    "currentGroupContact",
                    "actualPayment",
                    "balance",
                  ],
                  render: (value: any, record: any) => {
                    return (
                      <ColWrap>
                        <div
                          className="payment-amount"
                          style={{
                            backgroundColor:
                              referralsColorsList[
                                record?.lastLifeCycle?.data
                                  ?.status as keyof typeof referralsColorsList
                              ],
                          }}
                        >
                          {record?.lastLifeCycle?.data?.from}
                        </div>
                      </ColWrap>
                    );
                  },
                },
                {
                  title: () => (
                    <TableHeading padding>Rejected reason</TableHeading>
                  ),
                  dataIndex: ["lastLifeCycle", "data", "comment"],
                  render: (value: any) => {
                    return (
                      <ColWrap>
                        <p>{value}</p>
                      </ColWrap>
                    );
                  },
                },
                label,
                actions,
              ]
            : [];
};
