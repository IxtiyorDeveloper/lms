import React, { FC } from "react";
import { RowFlex, Wrapper } from "./style";
import { CircleImage, PaymentInfo } from "components";
import { IContacts } from "types/contact";
import Link from "next/link";
import { Tooltip } from "antd";
import { colors } from "layout/header/style";
import { studentStatusIdentifier } from "utils/studentStatusIdentifier";
import { queryKeys } from "constants/queryKeys";

const Student: FC<{
  data: IContacts;
  id: number;
  isPaymentDisabled: boolean;
}> = ({ data, id, isPaymentDisabled }) => {
  return (
    <Wrapper>
      <div className="profile">
        <div className="id">{id}</div>
        <CircleImage
          src={{ full_url: data.user?.userProfile?.avatar.full_url }}
          alt={`${data.user?.userProfile?.avatar.full_url}_avatar`}
          className="img"
        />
        <div className="name">
          <Link className="name-text" href={`/student/${data?.user?.id}`}>
            <Tooltip
              destroyTooltipOnHide
              title={data?.user?.fullName}
              placement="top"
            >
              {data?.user?.fullName}
            </Tooltip>
          </Link>
          <RowFlex>
            <div
              className="studying"
              style={
                colors[
                  studentStatusIdentifier(data?.student) as keyof typeof colors
                ]
              }
            >
              {studentStatusIdentifier(data?.student)}
            </div>
            <span className="lessons">{data?.actualPayment?.lesson_count}</span>
          </RowFlex>
        </div>
      </div>
      <PaymentInfo
        user={data}
        group={data?.group}
        queryKeys={[queryKeys.admin_finance_payment_statistics_group]}
        paymentDisabled={!isPaymentDisabled}
      />
    </Wrapper>
  );
};

export default Student;
