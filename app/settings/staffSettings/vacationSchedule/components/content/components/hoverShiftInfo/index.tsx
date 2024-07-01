import React, { FC } from "react";
import { CalendarAmazonSvg } from "@jasurbekyuldashov/lms-web-icons";
import {
  CustomPopover,
  ContentWrapper,
  Wrap,
  BodySide,
  Staff,
  Flex,
  DateAndSlot,
  RolesName,
  NoDataTabWrapper,
  LabelWrapper,
  Badge,
  ChildrenWrapper,
} from "./style";
import moment from "moment/moment";
import { IUserProfile } from "types/userProfile";
import { IVacation } from "types";
import { useRouter } from "next/router";
import { bgColors } from "styles/theme";
import { CircleImage, Segmented } from "components";

interface IProps {
  children?: React.ReactElement;
  details?: IVacation;
  freePlace: number;
  slots: any[];
  userProfile?: IUserProfile;
  slotDetails?: React.ReactElement;
  roleName: string;
  hiredDate?: string;
}

const HoverShiftInfoComponent: FC<IProps> = (props) => {
  const router = useRouter();

  const { slotDetails, slots, freePlace, roleName } = props;

  const routerDate = `${router.query?.year}-${router.query?.month}`;

  const opts = slots.map((slot, index) => {
    const fromDate = moment(slot.from_date).format("DD MMM");
    const toDate = moment(slot.to_date).format("DD MMM");

    return {
      label: (
        <LabelWrapper>
          <span>
            {fromDate} - {toDate}
          </span>
          <Badge>{slot?.vacations?.length}</Badge>
        </LabelWrapper>
      ),
      children: (
        <ChildrenWrapper>
          {slot.vacations.map((vacation: any, index: number) => {
            const firstName = vacation?.user?.userProfile?.firstname;
            const lastName = vacation?.user?.userProfile?.lastname;
            const hiredDate = moment(vacation?.user?.staff?.hired_date).format(
              "MMM YYYY",
            );
            const avatar = vacation?.user?.userProfile?.avatar;

            return (
              <div className="card" key={`key-${index}`}>
                <div className="card-body">
                  <CircleImage height={40} width={40} src={avatar} />
                  <div className="info">
                    <p className="fullName">
                      {firstName} {lastName}
                    </p>
                    <p className="hiredDate">{hiredDate}</p>
                  </div>
                </div>
                <p className="note">Note</p>
                <p className="note">{vacation?.note || "No comment"}</p>
              </div>
            );
          })}
        </ChildrenWrapper>
      ),
      value: `${index}`,
    };
  });

  // const customOpt = {
  //   label: (
  //     <LabelWrapper>
  //       <span>Custom slot</span>
  //       <Badge>0</Badge>
  //     </LabelWrapper>
  //   ),
  //   children: "sad",
  //   value: "custom_slot",
  // };

  return (
    <Wrap>
      <CustomPopover
        color={bgColors.dark}
        trigger="click"
        placement="bottomRight"
        content={() => (
          <ContentWrapper>
            <BodySide>
              <Staff style={{ marginBottom: "8px" }}>
                <Flex>
                  <DateAndSlot>
                    <p className="date-m">
                      <CalendarAmazonSvg
                        color={bgColors.white}
                        height={16}
                        width={16}
                      />
                      {moment(routerDate, "YYYY-MM").format("MMMM YYYY")}
                    </p>
                    <div className="slot-info">
                      {slotDetails}
                      <p className="free">{freePlace} free</p>
                    </div>
                  </DateAndSlot>
                  <RolesName>{roleName}</RolesName>
                </Flex>
              </Staff>
              <Staff className="column" style={{ display: "block" }}>
                {slots.length === 0 ? (
                  <NoDataTabWrapper>No Slots</NoDataTabWrapper>
                ) : (
                  <Segmented options={opts} dark />
                )}
              </Staff>
            </BodySide>
          </ContentWrapper>
        )}
      >
        {props.children}
      </CustomPopover>
    </Wrap>
  );
};

export default HoverShiftInfoComponent;
