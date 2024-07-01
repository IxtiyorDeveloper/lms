import React, { FC } from "react";
import { GroupInfoWrapper } from "./style";
import { Box, Grid, Typography } from "@mui/material";

import {
  CircleImage,
  CourseTypeSvg,
  EmptyCalendarSvg,
  GroupSvg,
  GroupTypeSvg,
  LearningSvg,
  LocationSvg,
} from "components";
import { TGroupInfoItem } from "./type";
import { Spin } from "antd";
import { EUser } from "types";
import { Avatar } from "antd";
import { UserOutlined } from "@ant-design/icons";
import { bgColors } from "styles/theme";
import { ToHourMinute } from "utils/toHourMinute";
import { useGroup } from "hooks";
import { expand } from "app/groups/[groupId]/expand";

const Item: FC<TGroupInfoItem> = ({ title, text, svg, url }) => (
  <Grid container width="auto">
    <Grid item>
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
    </Grid>
    <Grid item ml="8px">
      <Box mt="4px">
        <Typography className="title1">{title}</Typography>
      </Box>
      <Box mt="8px">
        <Typography className="text">{text}</Typography>
      </Box>
    </Grid>
  </Grid>
);

function GroupInsideHeaderInfo({ id }: { id: string | number }) {
  const { data: group, isLoading } = useGroup({
    id: id,
    expand: expand,
  });

  return (
    <Spin spinning={isLoading}>
      <GroupInfoWrapper>
        <Item
          title="Group"
          text={group?.name}
          svg={<GroupSvg color={bgColors.dark} />}
        />
        <Item
          title="Course"
          text={group?.course?.name}
          svg={<CourseTypeSvg color={bgColors.dark} />}
        />
        <Item
          title="Level"
          text={`${group?.level?.parent?.name || "-"} / ${
            group?.level?.name || "-"
          }`}
          svg={<LearningSvg color={bgColors.dark} />}
        />
        <Item
          title="Day / Time"
          text={`${group?.lessonDay?.name || "-"} / ${ToHourMinute(
            group?.lessonTime?.time ?? "-"
          )}`}
          svg={<EmptyCalendarSvg />}
        />
        <Item
          title="Group Type"
          text={group?.groupType?.name}
          svg={<GroupTypeSvg />}
        />
        <Item
          title="Branch"
          text={group?.room?.branch?.name}
          svg={<LocationSvg color={bgColors.dark} />}
        />
        <Item
          title="Teacher"
          text={`${
            group?.groupMentors?.find((mentor) => mentor.type === EUser.S100)
              ?.user?.userProfile?.firstname || ""
          }  ${
            group?.groupMentors?.find((mentor) => mentor.type === EUser.S100)
              ?.user?.userProfile?.lastname || "no teacher"
          }`}
          svg={
            <Avatar>
              <UserOutlined rev />
            </Avatar>
          }
          url={
            group?.groupMentors?.find((mentor) => mentor.type === EUser.S100)
              ?.user?.userProfile?.avatar
          }
        />
        <Item
          title="Academic Support"
          text={`${
            group?.groupMentors?.find((mentor) => mentor.type === EUser.S200)
              ?.user?.userProfile?.firstname || ""
          }  ${
            group?.groupMentors?.find((mentor) => mentor.type === EUser.S200)
              ?.user?.userProfile?.lastname || "no support"
          }`}
          svg={
            <Avatar>
              <UserOutlined rev />
            </Avatar>
          }
          url={
            group?.groupMentors?.find((mentor) => mentor.type === EUser.S200)
              ?.user?.userProfile?.avatar
          }
        />
      </GroupInfoWrapper>
    </Spin>
  );
}

export default GroupInsideHeaderInfo;
