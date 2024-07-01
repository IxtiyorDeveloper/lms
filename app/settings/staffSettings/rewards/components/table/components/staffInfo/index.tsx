import { Badge, Col, Flex, Row } from "antd";
import { Call, CircleImage, Mail } from "components";
import { StaffInfoWrapper } from "./style";
import { bgColors } from "styles/theme";
import PhoneCell from "components/common/tableCells/phoneCell";
import { IStaffReward } from "types/staffSettings";

const StaffInfo = ({ data }: { data: IStaffReward | undefined }) => {
  const user = data?.user;
  return (
    <StaffInfoWrapper>
      <Row justify="space-between" wrap={false}>
        <Col className="col_left">
          <CircleImage
            src={user?.userProfile.avatar_base_url}
            width={75}
            height={75}
          />
          <Flex vertical gap={8}>
            <h4>
              {user?.userProfile?.firstname} {user?.userProfile?.lastname}
            </h4>
            <PhoneCell value={user?.userPhones} />

            <Badge count={data?.vacancy} color={bgColors.soulfulBlue}></Badge>
          </Flex>
        </Col>
        <Col className="col_right">
          <Flex align="center" gap={10}>
            <Call
              size="small"
              key={`call_${user?.id}_key`}
              value={user?.userPhones || []}
            />
            <Mail key={`sms_${user?.id}_key`} size="small" />
          </Flex>
        </Col>
      </Row>
    </StaffInfoWrapper>
  );
};

export default StaffInfo;
