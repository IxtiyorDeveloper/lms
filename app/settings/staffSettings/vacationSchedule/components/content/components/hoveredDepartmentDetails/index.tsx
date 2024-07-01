import React, { FC, useState } from "react";
import {
  CalendarESvg,
  CircleOutlineCheckSvg,
  CreateNoteSvg,
  DeleteSvg,
  DoubleArrowSvg,
  EditSvg,
  HiredDateSvg,
  VacationPalmSvg,
} from "@jasurbekyuldashov/lms-web-icons";
import { CircleImage } from "components";
import {
  CustomPopover,
  ContentWrapper,
  Wrap,
  BodySide,
  Staff,
  Flex,
  Grid,
  BadgeWrapper,
} from "./style";
import moment from "moment/moment";
import { IUserProfile } from "types/userProfile";
import { IVacation } from "types";
import { EVacationType } from "../departmentsSidebar/type";
import { Flex as AntdFlex } from "antd";
import { bgColors } from "styles/theme";
import { toggleModal } from "store";
import { useDispatch } from "react-redux";
import { VacationModalType } from "../modals/createVacation";

interface IProps {
  children?: React.ReactElement;
  details: IVacation;
  userProfile?: IUserProfile;
  hiredDate: string;
}

const VacationHoverDetailsPopup: FC<IProps> = (props) => {
  const dispatch = useDispatch();
  const [open, setOpen] = useState(false);
  const { details, userProfile, hiredDate } = props;
  const fullName = `${userProfile?.firstname} ${userProfile?.lastname}`;
  const avatar = userProfile?.avatar;
  const fromDate = moment(details.from_date).format("DD MMM, YYYY");
  const toDate = moment(details.to_date).format("DD MMM, YYYY");
  const createdAt = moment(details.created_at).format("DD.MM.YYYY HH:mm");
  const hired_date = moment(hiredDate).format("MMMM YYYY");

  const onDelete = () => {
    setOpen(false);
    dispatch(
      toggleModal({
        key: "deleteVacation",
        data: {
          data: {
            id: details?.id,
          },
          open: true,
        },
      }),
    );
  };

  const onUpdate = () => {
    setOpen(false);
    dispatch(
      toggleModal({
        key: "createVacationModal",
        data: {
          data: {
            id: details?.id,
            user_id: details?.user_id,
            vacation_slot_id: details?.vacation_slot_id,
            recommended_date: details?.recommended_date,
            note: details?.note,
            type: VacationModalType.UPDATE,
          },
          open: true,
        },
      }),
    );
  };

  const handleOpenChange = (newValue: boolean) => {
    setOpen(newValue);
  };

  return (
    <Wrap>
      <CustomPopover
        placement="bottom"
        trigger="click"
        open={open}
        destroyTooltipOnHide
        onOpenChange={handleOpenChange}
        content={() => (
          <ContentWrapper>
            <BodySide>
              <Staff>
                <CircleImage src={avatar} height={40} width={40} />
                <Flex>
                  <div>
                    <p className="full-name">{fullName}</p>
                    <p className="date-period">
                      {fromDate} <DoubleArrowSvg height={14} width={14} />{" "}
                      {toDate}
                    </p>
                  </div>
                  <AntdFlex gap={6}>
                    <div className="action_icon" onClick={onUpdate}>
                      <EditSvg color={bgColors.white} />
                    </div>
                    <div className="action_icon" onClick={onDelete}>
                      <DeleteSvg color={bgColors.white} />
                    </div>
                  </AntdFlex>
                </Flex>
              </Staff>
              <Grid>
                <Staff className="column">
                  <div className="title-side">
                    <CircleOutlineCheckSvg /> <span>Created by</span>
                  </div>
                  <p className="name-f">
                    {details.createdBy?.userProfile?.firstname}{" "}
                    {details.createdBy?.userProfile?.lastname}
                  </p>
                </Staff>
                <Staff className="column">
                  <div className="title-side">
                    <CalendarESvg height={12} width={12} />{" "}
                    <span>Created date</span>
                  </div>
                  <p className="name-f">{createdAt}</p>
                </Staff>
                <Staff className="column">
                  <div className="title-side">
                    <HiredDateSvg /> <span>Hired date</span>
                  </div>
                  <p className="name-f">{hired_date}</p>
                </Staff>
                <Staff className="column">
                  <div className="title-side">
                    <VacationPalmSvg height={12} width={12} />{" "}
                    <span>Vacation type</span>
                  </div>
                  <BadgeWrapper type={details.type}>
                    <div className="status">
                      {details.type == EVacationType.early
                        ? "Early vacation"
                        : "Normal"}
                    </div>
                  </BadgeWrapper>
                </Staff>
              </Grid>
              <Staff className="column">
                <div className="title-side">
                  <CreateNoteSvg height={12} width={12} /> <span>Note</span>
                </div>
                <p className="name-f">{details.note || "No comment"}</p>
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

export default VacationHoverDetailsPopup;
