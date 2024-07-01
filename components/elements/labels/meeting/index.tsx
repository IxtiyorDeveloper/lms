import { Row, Tooltip, Col } from "antd";
import { ICandidateLabel, TIcon } from "types";
import { EditSvg, MeetingSvg } from "components";
import { userFullNameCreator } from "utils/userFullNameCreator";
import { Wrapper, Container, LabelWrapper, ActionWrapper } from "./style";
import { bgColors } from "styles/theme";
import { Popover } from "antd";
import { useState } from "react";
import { MeetingAction } from "./type";

const Meeting = ({
  userId,
  size,
  defaultValue,
  label,
  isOpen,
  createdBy,
  meeting,
  onClick,
}: TIcon & {
  meeting: ICandidateLabel | undefined;
  onClick?: ({ type, title }: { type: MeetingAction; title: string }) => void;
}) => {
  const [open, setOpen] = useState(false);
  const s = size === "small" ? " 17.37" : size === "medium" ? "22" : "";

  const handleMeeting = (title: string, type: MeetingAction) => {
    setOpen(false);
    onClick?.({ type, title });
  };

  return (
    <Tooltip
      title={createdBy || userFullNameCreator(defaultValue?.createdBy)}
      trigger="hover"
      destroyTooltipOnHide>
      <Container>
        <Popover
          destroyTooltipOnHide
          color={bgColors.white}
          style={{ padding: "0", background: "white" }}
          trigger="click"
          open={open && !!meeting}
          onOpenChange={(e) => setOpen(e)}
          placement="bottom"
          content={
            <ActionWrapper>
              <div
                className="edit_icon"
                onClick={() =>
                  handleMeeting("Edit meeting", MeetingAction.EDIT)
                }>
                <EditSvg color={bgColors.transparentGreen} />
              </div>
              <div
                className="absent_icon"
                onClick={() => handleMeeting("Absent", MeetingAction.ABSENT)}>
                ABS
              </div>
            </ActionWrapper>
          }>
          <Wrapper
            clicked={!!isOpen}
            onClick={() => {
              if (!meeting) {
                handleMeeting("Set meeting", MeetingAction.SET);
              }
            }}
            size={size}>
            <MeetingSvg color={bgColors.sceptreBlue} />{" "}
          </Wrapper>
        </Popover>
        {!!isOpen && label && <LabelWrapper size={size}>{label}</LabelWrapper>}
      </Container>
    </Tooltip>
  );
};

export default Meeting;
