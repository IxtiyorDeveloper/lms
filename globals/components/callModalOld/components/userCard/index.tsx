import React, { CSSProperties, FC, ReactNode, memo } from "react";
import { Wrapper } from "./style";
import { CircleImage } from "components";
import { PhoneTypes } from "constants/phoneTypes";
import { bgColors } from "styles/theme";
import Link from "next/link";

type status = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8;
export type UserStatus = "Student" | "Lead" | "Staff";

export const statusColors: { [key: number]: string | ReactNode } = {
  1: bgColors.orange,
  2: bgColors.yourShadow,
  3: bgColors.pop,
  4: bgColors.palomino,
  5: bgColors.palomino,
  6: bgColors.midori,
  7: bgColors.royal,
  8: bgColors.pop,
};

export const statusNames: { [key: number]: string | ReactNode } = {
  1: "Waiting list",
  2: "Archived",
  3: "Banned",
  4: "Not attended",
  5: "New student",
  6: "Studying",
  7: "Transferring",
  8: "Stopping",
};

export interface IProps {
  user: {
    fullName: string;
    type: UserStatus;
    groupName: string;
    groupId: string;
    studentId: string;
    url: string;
    status: status | ReactNode;
    numberType: keyof typeof PhoneTypes;
    statusColor: string;
    numberColor: string;
  } | null;
  count: number;
  style?: CSSProperties;
  className?: string;
}

const UserCard: FC<IProps> = ({ user, count, style, className }) => {
  return (
    <Wrapper user={user} style={style} count={count} className={className}>
      <div className="image">
        <CircleImage
          wrapperStyle={{
            alignSelf: "center",
            display: "flex",
            alignItems: "center",
            justifySelf: "center",
            justifyContent: "center",
          }}
          width="37px"
          height="37px"
          src={{ full_url: user?.url ?? "" }}
        />
      </div>
      <div>
        <div className="fullName-container">
          <Link
            href={
              user?.type == "Student"
                ? `/student/${(user as any).id}`
                : user?.type == "Lead"
                  ? ``
                  : ``
            }
            className="fullName"
          >
            {user?.fullName || "Full name"}
          </Link>
        </div>
        <div className="flex">
          <div className="status">
            {user?.status != -1 && user?.status != 0
              ? statusNames[user?.status as keyof typeof statusNames] || "_"
              : user?.status == 0
                ? "Lead"
                : user?.status == -1
                  ? "Staff"
                  : "User status"}
          </div>
          <div className="numberType">
            {user?.numberType ? PhoneTypes[user?.numberType] : "Number type"}
          </div>
        </div>
      </div>
    </Wrapper>
  );
};

export default memo(UserCard);
