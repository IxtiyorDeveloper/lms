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
  ObservationStudents,
} from "components";
import { ISupportCard, TGroupInfoItem } from "./type";
import { EUser, Gender, IGroup } from "types";
import { Avatar, Tag } from "antd";
import { UserOutlined } from "@ant-design/icons";
import { bgColors } from "styles/theme";
import { ToHourMinute } from "utils/toHourMinute";
import { groupColors } from "layout/header/style";
import { groupStatusIdentifier } from "utils/groupStatusIdentifier";
import { RoomSvg } from "@jasurbekyuldashov/lms-web-icons";
import { isDateInMonthAndYear } from "utils/checkThisMonth";
import { useGroup } from "../../../hooks";
import { expand } from "../../../app/groups/[groupId]/expand";
import moment from "moment";
import {
  DATE_FORMAT_DD_MMM_YYYY,
  DATE_FORMAT_SHOW_MMM_YYYY,
} from "../../../constants/dates";

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

function SupportCardInfo({
  branch_name,
  date,
  timetable,
  students,
  support,
  data,
}: ISupportCard) {
  const support_name = support?.userProfile?.fullName;
  const url = support?.userProfile?.avatar;
  const mentor_id = support?.id;

  return (
    <GroupInfoWrapper>
      <Container>
        <div className="img-svg">
          <LocationSvg color={bgColors.dark} width={32} height={32} />
        </div>
        <div className="c-t">
          <div className="tag-info">
            <p className="info">Branch</p>
          </div>
        </div>
        <p className="info-title">{branch_name}</p>
      </Container>
      <Container>
        <div className="img-svg">
          <EmptyCalendarSvg color={bgColors.dark} width={32} height={32} />
        </div>
        <div className="c-t">
          <div className="tag-info">
            <p className="info">Date</p>
          </div>
        </div>
        <p className="info-title">
          {moment(date).format(DATE_FORMAT_SHOW_MMM_YYYY)}
        </p>
      </Container>
      <Container>
        <div className="img-svg">
          <EmptyCalendarSvg color={bgColors.dark} width={32} height={32} />
        </div>
        <div className="c-t">
          <div className="tag-info">
            <p className="info">Timetable</p>
          </div>
        </div>
        <p className="info-title">
          {ToHourMinute(timetable)} {moment(date).format("dddd")}
        </p>
      </Container>
      <Container>
        <div className="img-svg">
          <GroupTypeSvg color={bgColors.dark} width={32} height={32} />
        </div>
        <div className="c-t">
          <div className="tag-info">
            <p className="info">Students</p>
          </div>
        </div>
        <ObservationStudents record={data} />
      </Container>
      <Container>
        <div className="img-svg">
          <CircleImage
            src={url}
            alt="avatar"
            width={41}
            height={41}
            className="img"
          />
        </div>
        <div className="c-t">
          <NextLink href={`/settings/staff-settings/edit-member/${mentor_id}`}>
            {support_name}
          </NextLink>
        </div>
        <p className="info-title">Academic Support</p>
      </Container>
    </GroupInfoWrapper>
  );
}

export default SupportCardInfo;
