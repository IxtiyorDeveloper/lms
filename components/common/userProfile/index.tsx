import React, { CSSProperties, ReactNode, useState } from "react";
import { Wrapper, RowMark, Col, StyledToolTip } from "./style";
import { BanUserSvg, Cell, MyLink } from "components";
import { getRowNumber } from "utils/getRowNumber";
import { markColors, markColorsFreshman } from "constants/studentRowColor";
import { LABEL_COLOR_CHANGE } from "constants/labels";
import { UserLabel } from "types/userLabel";
import { Badge } from "antd";
import CircleImageBlackRedList from "../circleImageBlackRedList";
import { StudentStat, StudentType } from "types";
import { bgColors } from "styles/theme";

interface IProps {
  props: any;
  isMark?: boolean;
  labelColor?: boolean;
  isStudent?: boolean;
  isExpand?: boolean;
  isAge?: boolean;
  disabled?: boolean;
  count?: number;
  color?: string;
  canGetOriginalToThumb?: boolean;
  imgContainerStyle?: CSSProperties;
  customTooltipChildren?: ({
    original,
    setVisible,
  }: {
    original?: any;
    setVisible?: React.Dispatch<React.SetStateAction<boolean>>;
  }) => ReactNode;
  fullname?: string | ReactNode;
  abs?: React.ReactNode;
  middleRow?: ReactNode;
  isFreshman?: boolean;
  index?: number;
  propsValue?: any;
  markColor?: any;
  user_id?: any;
  children?: any;
}

const UserProfile = ({
  props,
  isMark = false,
  labelColor = true,
  isStudent = true,
  isAge = false,
  isExpand = false,
  disabled = false,
  count,
  color,
  canGetOriginalToThumb,
  imgContainerStyle,
  customTooltipChildren,
  fullname,
  abs,
  middleRow,
  isFreshman = false,
  index,
  propsValue,
  markColor,
  user_id,
  children,
}: IProps) => {
  const [visible, setVisible] = useState(false);
  const id = getRowNumber({ index });
  const value = propsValue ?? props?.user?.userProfile;
  const name = value
    ? value?.fullName ?? value?.firstname + " " + value?.lastname
    : "-";
  const age = value?.age;

  const status = props?.status;
  const isBlackList = props?.isBlackList;
  const isRedList = props?.isRedList;
  const colorLabel = props?.user?.userLabels?.find(
    (i: UserLabel) => i.type === LABEL_COLOR_CHANGE,
  );

  const isBanned = StudentType.TYPE_BANNED == props?.type;
  const handleVisible = (newValue: boolean) => {
    setVisible(newValue);
  };
  return (
    <Cell>
      <Wrapper labelColor={labelColor}>
        <Col>
          {markColor ? (
            <RowMark bgColor={markColor} />
          ) : labelColor ? (
            isMark ? (
              <RowMark
                style={{
                  backgroundColor: isFreshman
                    ? status?.toString() ===
                      StudentStat.STUDENT_STUDYING?.toString()
                      ? markColors[
                          props?.currentGroupContact?.status?.toString() as keyof typeof markColors
                        ]
                      : markColorsFreshman[
                          status?.toString() as keyof typeof markColorsFreshman
                        ]
                    : markColors[
                        status?.toString() as keyof typeof markColors
                      ] || props?.color,
                }}
              />
            ) : (
              <RowMark
                style={{
                  backgroundColor: colorLabel?.color,
                }}
              />
            )
          ) : null}
          <div className="id">{id}</div>
        </Col>
        {middleRow && <Col>{middleRow}</Col>}
        <Col>
          <StyledToolTip
            title={
              !customTooltipChildren?.({})
                ? null
                : () =>
                    customTooltipChildren({
                      original: props,
                      setVisible,
                    })
            }
            placement="bottomLeft"
            className="blackTooltip"
            open={visible}
            onOpenChange={handleVisible}
          >
            <Badge
              count={count}
              color={color}
              style={{ zIndex: 3 }}
              className="pointer"
              overflowCount={10000}
            >
              {!isBanned ? (
                <CircleImageBlackRedList
                  value={value}
                  canGetOriginalToThumb={canGetOriginalToThumb}
                  isBlack={isBlackList}
                  isRed={isRedList}
                  abs={abs}
                  color={color}
                />
              ) : (
                <div className="content">
                  <CircleImageBlackRedList
                    src={value?.avatar}
                    width={40}
                    height={40}
                    isRed
                  />
                  <div className="ban">
                    <BanUserSvg color={bgColors.white} width={12} height={12} />
                  </div>
                </div>
              )}
            </Badge>
          </StyledToolTip>
          <div>
            {isStudent ? (
              <MyLink
                href={`/student/${user_id || value?.user_id || value?.id}`}
                disabled={disabled}
              >
                {fullname || name}
              </MyLink>
            ) : (
              <p className="name">
                {fullname || name} {!!isAge && `(${age})`}
              </p>
            )}
            {children}
          </div>
        </Col>
      </Wrapper>
    </Cell>
  );
};

export default UserProfile;
