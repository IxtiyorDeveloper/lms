import React, { CSSProperties, ReactNode, useMemo, useState } from "react";
import { Wrapper, RowMark, Col, StyledToolTip } from "./style";
import { Cell, MyLink } from "components";
import { getRowNumber } from "utils/getRowNumber";
import { markColors, markColorsFreshman } from "constants/studentRowColor";
import { LABEL_COLOR_CHANGE } from "constants/labels";
import { UserLabel } from "types/userLabel";
import { Badge } from "antd";
import CircleImageBlackRedList from "../circleImageBlackRedList";

interface IProps {
  props: any;
  isMark?: boolean;
  isStudent?: boolean;
  isExpand?: boolean;
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
  fullname?: string | React.ReactNode;
  abs?: React.ReactNode;
  middleRow?: ReactNode;
  isFreshman?: boolean;
  isAntd?: boolean;
}

const UserProfile = ({
  props,
  isMark = false,
  isStudent = true,
  disabled = false,
  count,
  color,
  canGetOriginalToThumb,
  customTooltipChildren,
  fullname,
  abs,
  middleRow,
  isFreshman = false,
}: IProps) => {
  const [visible, setVisible] = useState(false);
  const data = props?.row?.original;
  const id = getRowNumber(props);

  const value = props?.value ?? data?.user?.userProfile;

  const name = value
    ? value?.fullName ?? value?.firstname + " " + value?.lastname
    : "-";
  // const status = data?.status;
  // const isBlackList = data?.isBlackList;
  // const isRedList = data?.isRedList;
  // const colorLabel = data?.user?.userLabels?.find(
  //   (i: UserLabel) => i.type === LABEL_COLOR_CHANGE
  // );

  const { status, isBlackList, isRedList, colorLabel } = useMemo(() => {
    return {
      status: data?.status,
      isBlackList: data?.isBlackList,
      isRedList: data?.isRedList,
      colorLabel: data?.user?.userLabels?.find(
        (i: UserLabel) => i.type === LABEL_COLOR_CHANGE
      ),
    };
  }, [data]);

  const handleVisible = (newValue: boolean) => {
    setVisible(newValue);
  };
  return (
    <Cell>
      <Wrapper>
        <Col>
          {isMark ? (
            <RowMark
              style={{
                backgroundColor: isFreshman
                  ? status?.toString() === "200"
                    ? markColors[
                        data.currentGroupContact?.status?.toString() as keyof typeof markColors
                      ]
                    : markColorsFreshman[
                        status?.toString() as keyof typeof markColorsFreshman
                      ]
                  : markColors[status?.toString() as keyof typeof markColors] ||
                    props?.row?.original?.color,
              }}
            />
          ) : (
            <RowMark
              style={{
                backgroundColor: colorLabel?.color,
              }}
            />
          )}
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
                      original: props?.row?.original,
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
              overflowCount={1000}
            >
              <CircleImageBlackRedList
                value={value}
                canGetOriginalToThumb={canGetOriginalToThumb}
                isBlack={isBlackList}
                isRed={isRedList}
                abs={abs}
                color={color}
              />
            </Badge>
          </StyledToolTip>
          {isStudent ? (
            <MyLink
              href={`/student/${props?.value?.user_id || props?.value?.id}`}
              disabled={disabled}
            >
              {fullname || name}
            </MyLink>
          ) : (
            <p className="name">{fullname || name}</p>
          )}
        </Col>
      </Wrapper>
    </Cell>
  );
};

export default UserProfile;
