import { Col } from "antd";
import { ICandidate } from "types";
import { bgColors } from "styles/theme";
import { Badge, Row, Tooltip } from "antd";
import {
  AbsentWrapper,
  AbsentsWrapper,
  CandidateInfoTooltip,
  CandidateRow,
  NameWrapper,
  CEOConfirmed,
  StatusIcon,
  BadgeWrapper,
} from "./style";
import moment from "moment";
import {
  BannedSvg,
  CircleImageBlackRedList,
  CircleSuccessSvg,
  OnlineRejectedSvg,
  XMoreInfoIcon,
} from "components";
import {
  DATE_FORMAT_DD_MMM__YYYY_HH_mm,
  DATE_FORMAT_YYYY_MM_DD_HH_mm,
} from "constants/dates";
import { CandidateStatus, RejectionType } from "constants/hr";
import { getRowNumber } from "utils/getRowNumber";

const CandidateProfile = ({
  data,
  index,
  color = bgColors.fluorescent,
  hideCreatedInfo,
  onClickFullName,
}: {
  index: number;
  width?: number;
  height?: number;
  data: ICandidate;
  color?: string;
  hideCreatedInfo?: boolean;
  onClickFullName?: () => void;
}) => {
  const icon = {
    [RejectionType.OFFLINE]: <BannedSvg />,
    [RejectionType.ONLINE]: <OnlineRejectedSvg />,
  }[data?.rejection_type];

  const iconTitle = {
    [RejectionType.OFFLINE]: "Offline reject",
    [RejectionType.ONLINE]: "Online reject",
  }[data?.rejection_type];

  const order = getRowNumber({ index });

  return (
    <CandidateRow gutter={10}>
      <Col className="order">{order}</Col>
      <Col className="col_left">
        <Tooltip
          title={
            data?.abs?.length ? (
              <AbsentsWrapper>
                {data?.abs?.map((abs, index) => (
                  <AbsentWrapper key={abs?.id}>
                    <div className="wrap_top">
                      <h4>{index + 1}. Absent</h4>
                      <p>{abs?.createdBy?.fullName}</p>
                    </div>
                    <div className="wrap_body">
                      <div>{abs?.comment}</div>
                      <p>
                        {moment(abs?.datetime).format(
                          DATE_FORMAT_DD_MMM__YYYY_HH_mm
                        )}
                      </p>
                    </div>
                  </AbsentWrapper>
                ))}
              </AbsentsWrapper>
            ) : null
          }
          trigger={["hover"]}
          placement="bottomLeft"
        >
          <BadgeWrapper>
            <Badge
              count={data?.abs?.length}
              color={color}
              className="pointer"
              overflowCount={1000}
              style={{ zIndex: 3 }}
            >
              <CircleImageBlackRedList
                src={data?.candidateAvatar?.url ?? "/user.svg"}
                isRed={data?.status === CandidateStatus.BANNED}
                color={data?.status === CandidateStatus.BANNED ? "#E92857" : ""}
              />
            </Badge>
          </BadgeWrapper>
        </Tooltip>
        {data?.ceo_approved && (
          <CEOConfirmed>
            <CircleSuccessSvg width={14} height={14} />
          </CEOConfirmed>
        )}

        {icon && (
          <StatusIcon>
            <Tooltip
              trigger={["click"]}
              title={iconTitle}
              placement="bottomLeft"
            >
              <span>{icon}</span>
            </Tooltip>
          </StatusIcon>
        )}
      </Col>
      <Col className="col_right">
        <NameWrapper onClick={onClickFullName}>
          {data?.first_name} {data?.last_name} ({data?.age})
        </NameWrapper>

        {!hideCreatedInfo && (
          <Tooltip
            trigger={["click"]}
            placement="bottomLeft"
            title={
              <CandidateInfoTooltip>
                <Row justify="space-between">
                  <Col className="label">Created date & time</Col>
                  <Col className="value">
                    {data?.created_at &&
                      moment(
                        data?.created_at,
                        DATE_FORMAT_YYYY_MM_DD_HH_mm
                      ).format(DATE_FORMAT_DD_MMM__YYYY_HH_mm)}
                  </Col>
                </Row>
                <div className="line" />
                <Row justify="space-between">
                  <Col className="label">Created by</Col>
                  <Col className="value">{data?.responsible?.fullName}</Col>
                </Row>
              </CandidateInfoTooltip>
            }
          >
            <XMoreInfoIcon
              style={{
                cursor: "pointer",
              }}
            />
          </Tooltip>
        )}
      </Col>
    </CandidateRow>
  );
};

export default CandidateProfile;
