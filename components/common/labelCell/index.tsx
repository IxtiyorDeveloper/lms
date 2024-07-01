import { Flex } from "utils/style";
import {
  CallRequestSvg,
  ComingSvg,
  NotRespondedSvg,
  PaintSvg,
  PodoSvg,
  StartDateSvg,
  StopSvg,
  WillPaySvg,
  XCircleSvg,
} from "components";
import React from "react";
import {
  LABEL_ACCEPT,
  LABEL_CALL_REQUEST,
  LABEL_CHECKED,
  LABEL_COLOR_CHANGE,
  LABEL_COMING,
  LABEL_NOT_ANSWERED,
  LABEL_PODO,
  LABEL_REJECT,
  LABEL_START_DATE,
  LABEL_WILL_PAY,
  NO_COLOR,
} from "constants/labels";
import { bgColors } from "styles/theme";
import {
  AcceptSvg,
  CheckedSvg,
  RejectSvg,
} from "@jasurbekyuldashov/lms-web-icons";

const labelOptions = [
  {
    value: null,
    label: (
      <Flex gap="10px">
        <StopSvg bgColor={bgColors.dark} width={17.37} height={17.37} />
        <p>No label</p>
      </Flex>
    ),
  },
  {
    value: LABEL_CALL_REQUEST.toString(),
    label: (
      <Flex gap="10px">
        <CallRequestSvg width={17.37} height={17.37} />
        <p>Call request</p>
      </Flex>
    ),
  },
  {
    value: LABEL_COMING.toString(),
    label: (
      <Flex gap="10px">
        <ComingSvg width={17.37} height={17.37} />
        <p>Coming</p>
      </Flex>
    ),
  },
  {
    value: LABEL_NOT_ANSWERED.toString(),
    label: (
      <Flex gap="10px">
        <NotRespondedSvg width={17.37} height={17.37} />
        <p>Not Answered</p>
      </Flex>
    ),
  },
  {
    value: LABEL_CHECKED.toString(),
    label: (
      <Flex gap="10px">
        <CheckedSvg width={17.37} height={17.37 / 2} />
        <p>Checked</p>
      </Flex>
    ),
  },
  {
    value: LABEL_PODO.toString(),
    label: (
      <Flex gap="10px">
        <PodoSvg width={17.37} height={17.37} />
        <p>Podo</p>
      </Flex>
    ),
  },
  {
    value: LABEL_START_DATE.toString(),
    label: (
      <Flex gap="10px">
        <StartDateSvg width={17.37} height={17.37} />
        <p>Start date</p>
      </Flex>
    ),
  },
  {
    value: LABEL_WILL_PAY.toString(),
    label: (
      <Flex gap="10px">
        <WillPaySvg width={17.37} height={17.37} />
        <p>Will pay</p>
      </Flex>
    ),
  },
  {
    value: LABEL_COLOR_CHANGE.toString(),
    label: (
      <Flex gap="10px">
        <PaintSvg width={17.37} height={17.37} />
        <p>Paint</p>
      </Flex>
    ),
  },
  {
    value: NO_COLOR.toString(),
    label: (
      <Flex gap="10px">
        <XCircleSvg width={20} height={20} />
        <p>No label</p>
      </Flex>
    ),
  },
  {
    value: LABEL_ACCEPT.toString(),
    label: (
      <Flex gap="10px">
        <AcceptSvg width={20} height={20} color={bgColors.blueGray} />
        <p>Join Accept</p>
      </Flex>
    ),
  },
  {
    value: LABEL_REJECT.toString(),
    label: (
      <Flex gap="10px">
        <RejectSvg width={20} height={20} color={bgColors.blueGray} />
        <p>Join Reject</p>
      </Flex>
    ),
  },
];

export default labelOptions;
