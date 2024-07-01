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
import { Avatar, Tag } from "antd";
import { UserOutlined } from "@ant-design/icons";
import { bgColors } from "styles/theme";
import { ToHourMinute } from "utils/toHourMinute";
import { groupColors } from "layout/header/style";
import { groupStatusIdentifier } from "utils/groupStatusIdentifier";
import { RoomSvg, TabletSvg } from "@jasurbekyuldashov/lms-web-icons";
import { IExam } from "types/exam/exam";
import PackInfo from "app/academic-resource/exam-list/home/components/table/components/packInfo";
import Link from "next/link";

const Item: FC<TGroupInfoItem> = ({
  title,
  text,
  svg,
  url,
  id,
  colors,
  mentor,
}) => {
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
          />
        ) : (
          svg
        )}
      </div>
      <div className="c-t">
        {url ? (
          <NextLink href={`/settings/staff-settings/edit-member/${id}`}>
            {text}
          </NextLink>
        ) : (
          <div className="tag-info">
            {colors ? (
              <Tag color={colors?.backgroundColor}>{text}</Tag>
            ) : (
              <div className="info">{text}</div>
            )}
          </div>
        )}
      </div>
      <p className="info-title">{title}</p>
    </Container>
  );
};

function GroupInsideHeaderInfo({ data }: { data: IExam | undefined }) {
  if (data)
    return (
      <GroupInfoWrapper>
        <Item
          title="Group"
          text={
            <Link
              target="_"
              className="group-name-underlined"
              href={`/groups/${data?.group_id}`}
            >
              {data?.group?.name}
            </Link>
          }
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
          title="Pack info"
          text={<PackInfo data={data?.exam_device_pack} />}
          svg={<TabletSvg color={bgColors.dark} width={32} height={32} />}
        />
        <Item
          title="Level"
          text={`${data.group?.level?.name} / ${data.group?.sub?.name}`}
          svg={<LearningSvg color={bgColors.dark} width={32} height={32} />}
        />
        <Item
          title="Day / Time"
          text={`${data?.group?.lessonDay?.name} / ${ToHourMinute(
            data?.group?.lessonTime?.time ?? "",
          )}`}
          svg={<EmptyCalendarSvg width={32} height={32} />}
        />

        <Item
          title="Branch"
          text={data?.group?.branch?.name}
          svg={<LocationSvg color={bgColors.dark} width={32} height={32} />}
        />
        <Item
          title="Room"
          text={data.group?.room?.name}
          svg={<RoomSvg color={bgColors.dark} width={32} height={32} />}
        />

        <Item
          title="Teacher"
          text={`${data.teacher?.userProfile?.firstname || ""}  ${
            data.teacher?.userProfile?.lastname
          }`}
          svg={
            <Avatar>
              <UserOutlined />
            </Avatar>
          }
          url={data.teacher?.userProfile.avatar}
          id={data.teacher?.id}
        />

        <Item
          title="Academic Support"
          text={`${data.support?.userProfile?.firstname || ""}  ${
            data.support?.userProfile?.lastname || "no support"
          }`}
          svg={
            <Avatar>
              <UserOutlined />
            </Avatar>
          }
          url={data.support?.userProfile?.avatar}
          id={data.support?.id}
        />

        <Item
          title="Supervisor"
          text={`${data.supervisor?.userProfile?.firstname || ""}  ${
            data.supervisor?.userProfile?.lastname
          }`}
          svg={
            <Avatar>
              <UserOutlined />
            </Avatar>
          }
          url={data.supervisor?.userProfile?.avatar}
          id={data.supervisor?.id}
        />
      </GroupInfoWrapper>
    );
  else return <></>;
}

export default GroupInsideHeaderInfo;
