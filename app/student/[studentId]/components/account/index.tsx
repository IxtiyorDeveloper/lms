import React, { FC, useRef } from "react";
import {
  Wrapper,
  Title,
  MiddlePart,
  LeftContent,
  RightContent,
  ImgPart,
  Buttons,
  ImageWrapper,
  PersonalDetails,
  EditWrapper,
  ImageComponent,
  ResponsiveImg,
  InnerWrapper,
  Line,
  ActionWrapper,
  LeftActions,
  RightActions,
} from "./style";
import {
  Button,
  EditSvg,
  ContactActions,
  StudentLabels,
  ChangePasswordSvg,
  MainHeadWithTitle,
  StudentActions,
  PrintSvg,
} from "components";
import DescriptionBox from "../common/descriptionBox";
import Image from "next/image";
import { bgColors, textColors } from "styles/theme";
import { IAccount } from "./type";
import { Tooltip } from "antd";
import { useRouter } from "next/router";
import Link from "next/link";
import ChangePasswordModal from "../changePassword";
import { toggleModal } from "store";
import { useDispatch } from "react-redux";
import { studentStatusIdentifier } from "utils/studentStatusIdentifier";
import { colors } from "layout/header/style";
import { queryKeys } from "constants/queryKeys";
import { startCall } from "utils/call";
import env from "utils/env";

const Account: FC<IAccount> = ({ data, ars }) => {
  const router = useRouter();
  const dispatch = useDispatch();
  const ref = useRef<any>();

  const { sms, ...remainingObject } =
    data?.currentGroupContact?.buttonActions || {};
  const {
    sms: studentSms,
    call,
    ban,
    ...remainingStudentActions
  } = data?.buttonActions || {};
  const userId = router.query.studentId;

  const callToStudent = () => {
    let phoneNumber =
      data?.user?.userPhones?.find((e) => e.is_confirmed === 1)?.phone_number ||
      data?.user?.userPhones?.[0]?.phone_number;
    startCall(`sip:${phoneNumber?.slice(3) as string}@${env.pbxUrl}`);
  };

  return (
    <Wrapper>
      <InnerWrapper>
        <div className="flex">
          <Title>Account</Title>
          <div className="flex-btns">
            <Button
              icon={
                <div style={{ paddingRight: "8px" }}>
                  <ChangePasswordSvg />
                </div>
              }
              onClick={() =>
                ref?.current &&
                ref?.current?.open?.({
                  isOpen: true,
                  id: router.query.studentId,
                  student: data,
                })
              }
            >
              Change password
            </Button>
            <Button
              onClick={() => {
                router.replace({
                  query: {
                    ...router.query,
                    credentialsCheck: true,
                    studentId: userId,
                  },
                });
              }}
            >
              <PrintSvg color={bgColors.sceptreBlue} />
            </Button>
          </div>
          <ChangePasswordModal ref={ref} />
        </div>
        <MiddlePart>
          <LeftContent>
            <ImgPart>
              <ImageWrapper>
                <ResponsiveImg>
                  <ImageComponent
                    style={{
                      backgroundImage: `url('${
                        data?.user?.userProfile?.avatar?.full_url ??
                        "/student/image.png"
                      }')`,
                    }}
                  >
                    <div
                      className="badge"
                      style={{
                        backgroundImage: `url('/student/badgeStar.svg')`,
                      }}
                    >
                      {data?.user?.userProfile?.age}
                    </div>
                  </ImageComponent>
                </ResponsiveImg>
                <MainHeadWithTitle
                  title={
                    `${data?.user?.userProfile?.firstname} ${data?.user?.userProfile?.lastname}` ||
                    "Student"
                  }
                />
                <PersonalDetails>
                  <div className="name">
                    <Tooltip
                      destroyTooltipOnHide
                      trigger="click"
                      title={
                        <div className="tooltip">
                          <p>{data?.user?.userProfile?.firstname}</p>
                          <p>{data?.user?.userProfile?.lastname}</p>
                        </div>
                      }
                    >
                      <div className="full_name">
                        <p>{data?.user?.userProfile?.firstname}</p>
                        <p>{data?.user?.userProfile?.lastname}</p>
                      </div>
                    </Tooltip>
                    <Link
                      href={`/student/create-student?type=update&id=${data?.user_id}`}
                    >
                      <EditWrapper>
                        <EditSvg width={16} height={16} />
                      </EditWrapper>
                    </Link>
                  </div>
                  <div
                    className="studying"
                    style={
                      colors[
                        studentStatusIdentifier(data) as keyof typeof colors
                      ]
                    }
                  >
                    {studentStatusIdentifier(data)}
                  </div>
                  <div className="icons">
                    <div className="col">
                      <Image
                        src="/student/coin.svg"
                        alt="coin"
                        width={24}
                        height={24}
                      />
                      <p>{ars?.coins || 0}</p>
                    </div>
                    <div className="col">
                      <Image
                        src="/student/star.svg"
                        alt="coin"
                        width={24}
                        height={24}
                      />
                      <p>{ars?.points || 0}</p>
                    </div>
                  </div>
                </PersonalDetails>
              </ImageWrapper>
            </ImgPart>
            <Buttons>
              <Button
                iconUrl="/student/phone.svg"
                style={{ minHeight: "34px", width: "100%" }}
                bgColor={bgColors?.secondary}
                textColor={textColors?.white}
                onClick={callToStudent}
              />
              <Button
                onClick={() => {
                  dispatch(
                    toggleModal({
                      key: "selfSms",
                      data: {
                        data: {
                          user_id: userId,
                          filter: "student",
                          sent_field_name: "user_id",
                        },
                        open: true,
                      },
                    })
                  );
                }}
                iconUrl="/student/sms.svg"
                style={{ minHeight: "34px", width: "100%" }}
                bgColor={bgColors?.primary}
                textColor={textColors?.white}
              />
            </Buttons>
          </LeftContent>
          <RightContent>
            <DescriptionBox data={data} />
          </RightContent>
        </MiddlePart>
      </InnerWrapper>
      <Line />
      <ActionWrapper>
        <LeftActions>
          <ContactActions
            groupContactId={data?.currentGroupContact?.id}
            data={data?.currentGroupContact}
            stationaryHistory={data?.stationaryHistory}
            student={data}
            size="medium"
            activeActions={{
              ...remainingObject,
              practicum: true,
              checkPaper: true,
              smsBlackList: true,
              paymentRequest: true,
              book: false,
              notebook: false,
            }}
            extra={{ isFromStudentProfile: true }}
            queryKeys={[queryKeys.get_one_student]}
          />
          <StudentActions
            size="medium"
            queryKeys={[queryKeys.get_one_student]}
            data={data}
            activeActions={{
              ban_manual: ban,
              ...remainingStudentActions,
              first_lesson: true,
            }}
          />
        </LeftActions>
        <RightActions>
          <StudentLabels
            countGivenBooksOnThisLevel={data?.countGivenBooksOnThisLevel}
            size="medium"
            activeLabels={{
              giveStationary: true,
              ...(data?.permissionLabels || {}),
              dont_take_mot: true,
            }}
            data={data?.currentGroupContact}
            queryKeys={[queryKeys.get_one_student]}
          />
        </RightActions>
      </ActionWrapper>
    </Wrapper>
  );
};

export default Account;
