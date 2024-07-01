import React, { FC } from "react";
import { UserName, WrapperStaffStatus } from "./style";
import { IStaffViewPageInfoData } from "types/staffSettings";

interface IProps {
  dataGetOne?: IStaffViewPageInfoData;
  staffType?: any;
}

const UserMainTitle: FC<IProps> = (props) => {
  const { dataGetOne, staffType } = props;

  return (
    <UserName>
      <p className="text">
        {dataGetOne?.userProfile?.firstname} {dataGetOne?.userProfile?.lastname}
      </p>
      <WrapperStaffStatus style={staffType?.styles}>
        <p className="status">{staffType?.text}</p>
      </WrapperStaffStatus>
    </UserName>
  );
};

export default UserMainTitle;
