import React from "react";
import {
  PersonalInfo,
  PhotoWrapper,
  UserInfo,
} from "globals/components/transactionModal/style";
import { CircleImage, PaymentInfo } from "components/index";
import { Container } from "./style";
import { IContacts } from "types/contact";
import { OneStudent } from "types/student";

const StudentCard = ({ data, nameKey }: { data: any; nameKey?: string }) => {
  const image =
    data?.user?.userProfile?.avatar ||
    // @ts-ignore
    data?.userProfile?.avatar;
  const full_name = nameKey
    ? (data[nameKey as keyof typeof data] as string)
    : data?.user?.userProfile?.firstname
      ? data?.user?.userProfile?.firstname +
        " " +
        data?.user?.userProfile?.lastname
      : "-";
  const group = data?.group ? data?.group : data?.currentGroupContact?.group;
  const group_name = group?.name ? group?.name : "";

  return (
    <Container>
      <UserInfo>
        {image && (
          <PhotoWrapper>
            <CircleImage src={image} width={80} height={80} />
          </PhotoWrapper>
        )}
        <PersonalInfo>
          <p
            className={`full-name-student-card ${
              !!group_name && data?.actualPayment ? "p" : ""
            }`}
          >
            {full_name}
          </p>
          <PaymentInfo paymentDisabled user={data as any} group={group} />
          <p>{group_name}</p>
        </PersonalInfo>
      </UserInfo>
    </Container>
  );
};

export default StudentCard;
