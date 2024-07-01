import {
  CalendarESvg,
  CalendarHateSvg,
  ClockSvg,
  CoverTeacherSvg,
  LearningSvg,
  LocationSvg,
} from "components";
import React from "react";
import { Container, Flex, TripleBox } from "./style";
import { bgColors } from "styles/theme";
import { ETeacher, IGroup, IGroupMentor } from "types";
import moment from "moment";
import { DATE_FORMAT_SHOW_MMM } from "constants/dates";

const tabContent = [
  {
    tabId: 100,
    title: "Opening",
    bgColor: bgColors.primary,
  },
  {
    tabId: 200,
    title: "Opened",
    bgColor: bgColors.kitten,
  },
  {
    tabId: 300,
    title: "Running",
    bgColor: bgColors.serengeti,
  },
  {
    tabId: 400,
    title: "Closing",
    bgColor: bgColors.pepper,
  },
  {
    tabId: 500,
    title: "Closed",
    bgColor: bgColors.slate,
  },
  {
    tabId: 600,
    title: "Archived",
    bgColor: bgColors.purpleCrystal,
  },
];
const GroupInterface = ({ group }: { group: IGroup }) => {
  const mentor: IGroupMentor | undefined = group.groupMentors?.find(
    (mentor) => mentor.type == ETeacher.S100
  );
  const groupMentor = mentor
    ? mentor.user?.userProfile?.firstname +
      " " +
      mentor.user?.userProfile?.lastname
    : "-";
  const currentTab = tabContent.find(
    (tab) => tab.tabId.toString() == group.state.toString()
  );
  return (
    <Container>
      <Flex>
        <p className="name">{group.name}</p>
        <p className="badge">{group.free_place}</p>
      </Flex>
      <Flex>
        <p className="date">
          Start Date : {moment(group.start_date).format(DATE_FORMAT_SHOW_MMM)}
        </p>
        <p className="status" style={{ backgroundColor: currentTab?.bgColor }}>
          {currentTab?.title}
        </p>
      </Flex>
      <div className="line" />
      <div className="row">
        <CoverTeacherSvg color={bgColors.yourShadow} />
        <p className="name">{groupMentor}</p>
      </div>
      <TripleBox className="mt17">
        <div className="box">
          <div className="icon">
            <LearningSvg color={bgColors.sadet} />
          </div>
          <div className="title">{group.level?.parent.name}</div>
        </div>
        <div className="box">
          <div className="icon">
            <CalendarHateSvg color={bgColors.sadet} />
          </div>
          <div className="title">{group.level?.name}</div>
        </div>
        <div className="box">
          <div className="icon">
            <CalendarESvg color={bgColors.sadet} />
          </div>
          <div className="title">{group.lessonDay?.name}</div>
        </div>
      </TripleBox>
      <TripleBox className="mt10">
        <div className="box">
          <div className="icon">
            <ClockSvg color={bgColors.sadet} />
          </div>
          <div className="title">{group.lessonTime?.time}</div>
        </div>
        <div className="box">
          <div className="icon">
            <LocationSvg />
          </div>
          <div className="title">{group.room?.branch?.name}</div>
        </div>
      </TripleBox>
      <div className="comment">{group?.note}</div>
    </Container>
  );
};

export default GroupInterface;
