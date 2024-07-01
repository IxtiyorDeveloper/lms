import React, { FC } from "react";
import { Container, GroupInfoWrapper } from "./style";

import {
  CircleImage,
  CourseTypeSvg,
  EmptyCalendarSvg,
  FemaleSymbolSvg,
  GroupSvg,
  GroupTypeSvg,
  LearningSvg,
  LocationSvg,
  MaleSymbolSvg,
  NextLink,
} from "components";
import { TGroupInfoItem } from "./type";
import { EMentorTypes, Gender, IGroup } from "types";
import { Avatar, Tag } from "antd";
import { UserOutlined } from "@ant-design/icons";
import { bgColors } from "styles/theme";
import { ToHourMinute } from "utils/toHourMinute";
import { groupColors } from "layout/header/style";
import { groupStatusIdentifier } from "utils/groupStatusIdentifier";
import { RoomSvg } from "@jasurbekyuldashov/lms-web-icons";
import { isDateInMonthAndYear } from "utils/checkThisMonth";
import { useGroup } from "hooks";
import { expand } from "../../../app/groups/[groupId]/expand";

const Item: FC<TGroupInfoItem> = ({
  title,
  text,
  svg,
  url,
  id,
  colors,
  mentor,
}) => {
  const isHiredDateThisMonth = isDateInMonthAndYear({
    dateString: mentor?.user?.staff?.hired_date,
  });
  return (
    <Container>
      <div className="img-svg">
        {url ? (
          <CircleImage
            src={url}
            alt="avatar"
            width={41}
            height={41}
            className="img"
            showNew={isHiredDateThisMonth}
          />
        ) : (
          svg
        )}
      </div>
      <div className="c-t">
        {url ? (
          <NextLink
            href={`/settings/staff-settings/edit-member/${mentor?.user?.id}`}
          >
            {text}
          </NextLink>
        ) : (
          <div className="tag-info">
            {colors ? (
              <Tag color={colors?.backgroundColor}>{text}</Tag>
            ) : (
              <p className="info">{text}</p>
            )}
          </div>
        )}
      </div>
      <p className="info-title">{title}</p>
    </Container>
  );
};

function GroupInsideHeaderInfo({
  group,
  id,
}: {
  group?: IGroup;
  id?: string | number;
}) {
  const { data: fetchedGroup } = useGroup({
    id: id,
    expand: expand,
  });

  const data = group ?? fetchedGroup;
  if (data)
    return (
      <GroupInfoWrapper>
        <Item
          title="Group"
          text={data.name}
          svg={<GroupSvg color={bgColors.dark} width={32} height={32} />}
          colors={
            groupColors[
              groupStatusIdentifier({
                group: data,
              }) as keyof typeof groupColors
            ]
          }
        />
        <Item
          title="Course"
          text={data?.course?.name}
          svg={<CourseTypeSvg color={bgColors.dark} width={32} height={32} />}
        />
        <Item
          title="Level"
          text={`${data.level?.parent?.name} / ${data.level?.name}`}
          svg={<LearningSvg color={bgColors.dark} width={32} height={32} />}
        />
        <Item
          title="Day / Time"
          text={`${data.lessonDay?.name} / ${ToHourMinute(
            data.lessonTime?.time ?? "",
          )}`}
          svg={<EmptyCalendarSvg width={32} height={32} />}
        />
        <Item
          title="Group Type"
          text={data?.groupType?.name}
          svg={<GroupTypeSvg width={32} height={32} />}
        />
        <Item
          title="Branch"
          text={data.room?.branch?.name}
          svg={<LocationSvg color={bgColors.dark} width={32} height={32} />}
        />
        <Item
          title="Room"
          text={data.room?.name}
          svg={<RoomSvg color={bgColors.dark} width={32} height={32} />}
        />
        <Item
          title="Male"
          text={
            data?.contactsCountByGender?.find(
              (g) => g.gender == Gender.GENDER_MALE,
            )?.count ?? "0"
          }
          svg={<MaleSymbolSvg color={bgColors.dark} width={32} height={32} />}
        />
        <Item
          title="Female"
          text={
            data?.contactsCountByGender?.find(
              (g) => g.gender == Gender.GENDER_FEMALE,
            )?.count ?? "0"
          }
          svg={<FemaleSymbolSvg color={bgColors.dark} width={32} height={32} />}
        />
        <Item
          title="Teacher"
          text={`${
            data.groupMentors?.find(
              (mentor) => mentor.type == EMentorTypes.Teacher,
            )?.user?.userProfile?.firstname || ""
          }  ${
            data.groupMentors?.find(
              (mentor) => mentor.type == EMentorTypes.Teacher,
            )?.user?.userProfile?.lastname || "no teacher"
          }`}
          svg={
            <Avatar>
              <UserOutlined />
            </Avatar>
          }
          url={
            data.groupMentors?.find(
              (mentor) => mentor.type == EMentorTypes.Teacher,
            )?.user?.userProfile?.avatar
          }
          id={
            data.groupMentors?.find(
              (mentor) => mentor.type == EMentorTypes.Teacher,
            )?.user?.rbacAssignment?.id
          }
          mentor={data.groupMentors?.find(
            (mentor) => mentor.type == EMentorTypes.Teacher,
          )}
        />
        <Item
          title="Academic Support"
          text={`${
            data.groupMentors?.find(
              (mentor) => mentor.type == EMentorTypes.Support,
            )?.user?.userProfile?.firstname || ""
          }  ${
            data.groupMentors?.find(
              (mentor) => mentor.type == EMentorTypes.Support,
            )?.user?.userProfile?.lastname || "no support"
          }`}
          svg={
            <Avatar>
              <UserOutlined />
            </Avatar>
          }
          url={
            data.groupMentors?.find(
              (mentor) => mentor.type == EMentorTypes.Support,
            )?.user?.userProfile?.avatar
          }
          id={
            data.groupMentors?.find(
              (mentor) => mentor.type == EMentorTypes.Support,
            )?.user?.rbacAssignment?.id
          }
          mentor={data.groupMentors?.find(
            (mentor) => mentor.type == EMentorTypes.Support,
          )}
        />
      </GroupInfoWrapper>
    );
  else return <></>;
}

export default GroupInsideHeaderInfo;
