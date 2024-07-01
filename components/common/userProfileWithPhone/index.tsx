import React, { FC } from "react";
import { CircleImage, PhoneCell } from "components";
import { UserProfileWrapper } from "./style";
import { IUserPhone } from "../../../types/userPhone";

interface IProps {
  firstName: string;
  lastName?: string;
  phoneNumbers?: IUserPhone[];
  name?: string;
  avatar?: {
    id: string;
    full_url: string;
    children: { full_url: string; resolution: string }[];
  };
}

const UserProfileWithPhone: FC<IProps> = (props) => {
  const { firstName, lastName, phoneNumbers, avatar, name } = props;

  return (
    <UserProfileWrapper>
      {!!avatar && (
        <CircleImage
          width={42}
          height={42}
          src={{
            full_url: avatar?.full_url,
            children: avatar?.children,
          }}
        />
      )}
      <div>
        <p className="first_name">
          {firstName} {lastName} {name}
        </p>
        <PhoneCell value={phoneNumbers} />
      </div>
    </UserProfileWrapper>
  );
};

export default UserProfileWithPhone;
