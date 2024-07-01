import React, { FC } from "react";
import { CircleImage, PhoneCell } from "components";
import { Actions, PhoneNumber, UserInfo, UserName } from "./style";
import { HealthMedicineSvg } from "@jasurbekyuldashov/lms-web-icons";
import { bgColors } from "styles/theme";
import { DateInfo, Info } from "../../style";
import moment from "moment/moment";

interface IProps {
  data: any;
}

const UserDetails: FC<IProps> = (props) => {
  const { data } = props;

  const fullName = `${data?.userProfile?.firstname} ${data?.userProfile?.lastname}`;
  const imageSource = {
    full_url: data?.userProfile?.avatar?.full_url,
    children: data?.userProfile?.avatar?.children,
  };

  return (
    <UserInfo>
      <CircleImage height={56} width={56} src={imageSource} />
      <div>
        <UserName>{fullName}</UserName>
        <PhoneNumber>
          <PhoneCell value={data?.userPhones} />
        </PhoneNumber>
      </div>
      <Actions>
        <DateInfo>
          <HealthMedicineSvg color={bgColors.royal} />
          <Info>
            <span className="hd">H/D:</span>{" "}
            {moment(data?.staff?.hired_date).format("MMMM YYYY")}
          </Info>
        </DateInfo>
      </Actions>
    </UserInfo>
  );
};

export default UserDetails;
