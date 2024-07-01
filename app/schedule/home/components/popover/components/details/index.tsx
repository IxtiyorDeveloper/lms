import React, { FC } from "react";
import { Spin } from "antd";
import { bgColors } from "styles/theme";
import {
  Box,
  ContentWrapper,
  CreateGroupWrapper,
  GenderBox,
  InnerWrapper,
  TextAreaWrapper,
} from "./style";
import {
  AttendSvg,
  Button,
  CalendarAmazonSvg,
  CircleDollarSvg,
  ColoredAttendSvg,
  FemaleSymbolSvg,
  GroupSvg,
  LearningSvg,
  MaleSymbolSvg,
  PartlyPaidSvg,
  PodoSvg,
  StartLessonSvg,
  SupportGlassSvg,
  SupportTeacherSvg,
  TeacherGlassSvg,
  UserHashSvg,
} from "components";
import { EGroupType, EUser, Gender, IGroupMentor } from "types";
import moment from "moment/moment";
import { DATE_FORMAT_SHOW_DD_MMM_YYYY } from "constants/dates";
import { IPopover } from "./type";
import { STATE_CLOSING } from "../../../../../../../constants/groupStatus";

const HoverDetails: FC<IPopover> = ({
  isLoading,
  isPreviousData,
  group,
  handleCreateGroup,
  row,
  fromMultiple,
}) => {
  return (
    <Spin
      spinning={!group || isLoading || isPreviousData}
      style={{ backgroundColor: bgColors.white }}
    >
      <ContentWrapper>
        <InnerWrapper>
          <Box>
            <div className="icon">
              <GroupSvg height={24} width={24} />
            </div>
            <div className="title">Group</div>
            <div className="text">{group?.name}</div>
          </Box>
          <Box>
            <div className="icon">
              <LearningSvg height={24} width={24} />
            </div>
            <div className="title">Level</div>
            <div className="text">{group?.level?.parent.name}</div>
          </Box>
          <Box>
            <div className="icon">
              <StartLessonSvg width={24} height={24} />
            </div>
            <div className="title">Sub level</div>
            <div className="text">{group?.level?.name}</div>
          </Box>
          <Box>
            <div className="icon">
              <TeacherGlassSvg />
            </div>
            <div className="title">Teacher</div>
            <div className="text">
              {
                group?.groupMentors?.find(
                  (mentor: IGroupMentor & { type: any }) =>
                    mentor.type == EUser.S100,
                )?.user?.userProfile?.firstname
              }{" "}
              {
                group?.groupMentors?.find(
                  (mentor: IGroupMentor & { type: any }) =>
                    mentor.type == EUser.S100,
                )?.user?.userProfile?.lastname
              }
            </div>
          </Box>
          <Box>
            <div className="icon">
              <SupportGlassSvg />
            </div>
            <div className="title">Support</div>
            <div className="text">
              {
                group?.groupMentors?.find(
                  (mentor: IGroupMentor & { type: any }) =>
                    mentor.type == EUser.S200,
                )?.user?.userProfile?.firstname
              }{" "}
              {
                group?.groupMentors?.find(
                  (mentor: IGroupMentor & { type: any }) =>
                    mentor.type == EUser.S200,
                )?.user?.userProfile?.lastname
              }
            </div>
          </Box>
          <Box>
            <div className="icon">
              <UserHashSvg color={bgColors.yourShadow} width={24} height={24} />
            </div>
            <div className="title">Average age</div>
            <div className="text">{Math.round(Number(group?.average_age))}</div>
          </Box>
          <Box>
            <div className="icon">
              <SupportTeacherSvg
                color={bgColors.yourShadow}
                width={24}
                height={24}
              />
            </div>
            <div className="title">Total Students</div>
            <div className="text">{group?.real_total_contact_count}</div>
          </Box>
          <Box>
            <div className="icon">
              <CircleDollarSvg />
            </div>
            <div className="title">Paid</div>
            <div className="text">{group?.payment_count}</div>
          </Box>
          <Box>
            <div className="icon">
              <PartlyPaidSvg />
            </div>
            <div className="title">Partially paid</div>
            <div className="text">{group?.partial_payed_count}</div>
          </Box>
          <Box>
            <div className="icon">
              <ColoredAttendSvg
                color={bgColors.yourShadow}
                width={24}
                height={24}
              />
            </div>
            <div className="title">Attended</div>
            <div className="text">
              {group?.new_student_attended_contact_count}
            </div>
          </Box>
          <Box>
            <div className="icon">
              <AttendSvg width={24} height={24} color={bgColors.yourShadow} />
            </div>
            <div className="title">Not attended</div>
            <div className="text">
              {group?.new_student_not_attended_contact_count}
            </div>
          </Box>

          <Box>
            <div className="icon">
              <PodoSvg color={bgColors.yourShadow} width={24} height={24} />
            </div>
            <div className="title">Podo</div>
            <div className="text">{group?.podo_count}</div>
          </Box>
        </InnerWrapper>
        <div className="spl">
          <InnerWrapper>
            <GenderBox>
              <div className="left">
                <MaleSymbolSvg height={24} width={24} />
                <p className="g-t">Male</p>
              </div>
              <p className="count">
                {group?.contactsCountByGender?.find(
                  (g) => g.gender == Gender.GENDER_MALE,
                )?.count ?? "0"}
              </p>
            </GenderBox>
            <GenderBox>
              <div className="left">
                <FemaleSymbolSvg height={24} width={24} />
                <p className="g-t">Female</p>
              </div>
              <p className="count">
                {group?.contactsCountByGender?.find(
                  (g) => g.gender == Gender.GENDER_FEMALE,
                )?.count ?? "0"}
              </p>
            </GenderBox>
            <GenderBox>
              <div className="left">
                <CalendarAmazonSvg
                  color={bgColors.yourShadow}
                  height={24}
                  width={24}
                />
                <p className="g-t">Start Date</p>
              </div>
              <p className="count">
                {moment(group?.start_date).format(DATE_FORMAT_SHOW_DD_MMM_YYYY)}
              </p>
            </GenderBox>
          </InnerWrapper>
          {!!group?.note && <div className="line" />}
        </div>
        {!!group?.note && <TextAreaWrapper>{group.note}</TextAreaWrapper>}
        {group?.state?.toString() == STATE_CLOSING?.toString() &&
          row?.id &&
          !fromMultiple && (
            <CreateGroupWrapper>
              <Button
                onClick={(e) => {
                  e.stopPropagation();
                  handleCreateGroup?.({
                    type: EGroupType.NOGROUP,
                    isClosing: true,
                    room_id: row?.id,
                    time_id: group?.lesson_time_id?.toString(),
                  });
                }}
              >
                + Create group for this room
              </Button>
            </CreateGroupWrapper>
          )}
      </ContentWrapper>
    </Spin>
  );
};

export default HoverDetails;
