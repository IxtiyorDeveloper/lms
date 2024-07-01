import { Popover } from "antd";
import { useGetOneStudent } from "hooks";
import { expand } from "../../../../expand";
import { Container, Note, Wrapper } from "./style";
import { CircleImage, PaymentInfo } from "components";
import React, { forwardRef, useImperativeHandle } from "react";
import { colors } from "layout/header/style";
import { studentStatusIdentifier } from "utils/studentStatusIdentifier";

interface IProps {
  data: any;
}
const Student = forwardRef(({ data }: IProps, ref) => {
  const { data: activeStudent, isFetching } = useGetOneStudent({
    expand,
    id: data?.id,
    type: "update",
  });
  useImperativeHandle(ref, () => ({
    clear: () => {},
  }));

  const group = activeStudent?.currentGroupContact?.group;
  return (
    <Container>
      <Wrapper>
        <div className="info">
          <CircleImage
            width={68}
            height={68}
            src={activeStudent?.user?.userProfile?.avatar?.full_url}
          />
          <div className="main">
            <div className="name">
              {activeStudent?.user?.userProfile?.firstname +
                " " +
                (activeStudent?.user?.userProfile?.lastname || "")}
            </div>
            <div className="level">
              {activeStudent?.currentGroupContact?.group?.level?.parent?.name +
                " "}
              {activeStudent?.currentGroupContact?.group?.level?.name}
            </div>
            <div className="data">
              <div
                className="studying"
                style={
                  colors[
                    studentStatusIdentifier(
                      activeStudent,
                    ) as keyof typeof colors
                  ]
                }
              >
                {studentStatusIdentifier(activeStudent)}
              </div>
              <div>{group?.name || "Group name"}</div>
              <div>
                <div className="flex">
                  {`${group?.teacher?.user?.userProfile?.firstname} ${group?.teacher?.user?.userProfile?.lastname}`}
                </div>
              </div>
            </div>
          </div>
          <div className="payment-info">
            {activeStudent?.currentGroupContact && (
              <PaymentInfo
                user={activeStudent?.currentGroupContact}
                group={activeStudent?.currentGroupContact?.group}
              />
            )}
          </div>
        </div>
      </Wrapper>
      <div className="notes">
        <div>Student’s note</div>
        <div className="note">
          <div className="text">
            {activeStudent?.note ? (
              <Popover
                content={<Note full>{activeStudent?.note}</Note>}
                destroyTooltipOnHide
              >
                <Note>{activeStudent?.note}</Note>
              </Popover>
            ) : (
              "-"
            )}
          </div>
        </div>
      </div>
      <div className="divider" />
    </Container>
  );
});

export default Student;
