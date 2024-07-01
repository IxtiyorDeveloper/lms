import React from "react";
import {
  Info,
  InfoBox,
  Left,
  NoteBox,
  Wrapper,
  Name,
  Right,
  NTitle,
  NContent,
} from "./style";
import { Button, CircleImage, PhoneCell } from "components";
import { IPersonalDetails } from "./type";
import { EditSvg } from "@jasurbekyuldashov/lms-web-icons";
import { bgColors, textColors } from "styles/theme";
import { useRouter } from "next/router";
import { BackToWaitingSvg } from "../../../../index";

const PersonalDetails = ({ student, back_waiting_list }: IPersonalDetails) => {
  const router = useRouter();
  return (
    <Wrapper>
      <InfoBox>
        <Left>
          <CircleImage
            src={student?.user?.userProfile?.avatar}
            width={60}
            height={60}
          />
          <Info>
            <Name>
              {" "}
              {student?.user?.userProfile?.firstname}{" "}
              {student?.user?.userProfile?.lastname}
            </Name>
            <PhoneCell value={student?.user?.userPhones} />
          </Info>
        </Left>
        <Right>
          <Button
            style={{ backgroundColor: bgColors.deep, color: textColors.white }}
            href={`/student/create-student?type=update&id=${router.query.studentId}`}
          >
            <EditSvg color={bgColors.white} />
            Edit
          </Button>
          {back_waiting_list && (
            <Button
              href={`/student/waiting-list`}
              style={{ color: textColors.blueGray }}
            >
              <BackToWaitingSvg />
              Back to waiting
            </Button>
          )}
        </Right>
      </InfoBox>
      <NoteBox>
        <NTitle>Student’s note</NTitle>
        <NContent>{student?.note ?? "No note"}</NContent>
      </NoteBox>
    </Wrapper>
  );
};

export default PersonalDetails;
