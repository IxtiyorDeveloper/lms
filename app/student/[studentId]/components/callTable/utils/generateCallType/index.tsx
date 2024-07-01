import { Flex } from "./style";
import { ECallEventType } from "types/paymentList";

const eventTypeText = {
  100: "Not Answered",
};

const directionTypeText = {
  100: "Answered",
  200: "Incall",
  300: "Local",
};

const eventTypeIcon = {
  100: <img src="/phone/not-answered.svg" alt="Not Answered" />,
};

const directionTypeIcon = {
  100: <img src="/phone/outbound.svg" alt="Answered" />,
  200: <img src="/phone/inbound.svg" alt="Incall" />,
  300: <></>,
};

export const generateCallType = ({ record }: { record: any }) => {
  return (
    <Flex>
      {record?.event === ECallEventType.call_end
        ? directionTypeIcon[record.direction as keyof typeof directionTypeText]
        : eventTypeIcon[ECallEventType.call_missed]}
      <p className="text-status">
        {record?.event === ECallEventType.call_end
          ? directionTypeText[
              record.direction as keyof typeof directionTypeText
            ]
          : eventTypeText[ECallEventType.call_missed]}
      </p>
    </Flex>
  );
};
