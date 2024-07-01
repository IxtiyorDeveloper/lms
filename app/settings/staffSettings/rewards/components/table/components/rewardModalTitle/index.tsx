import { Flex } from "antd";
import moment from "moment";
import { DateWrapper, Title } from "./style";
import { HealthMedicineSvg } from "@jasurbekyuldashov/lms-web-icons";
import { DATE_FORMAT_SHOW_MMMM_YYYY } from "constants/dates";

const RewarModalTitle = ({ title, date }: { title: string; date: string }) => {
  return (
    <Flex justify="space-between" align="middle">
      <Title>{title}</Title>
      <DateWrapper>
        <HealthMedicineSvg />
        <p>H/D: {moment(date).format(DATE_FORMAT_SHOW_MMMM_YYYY)}</p>
      </DateWrapper>
    </Flex>
  );
};

export default RewarModalTitle;
