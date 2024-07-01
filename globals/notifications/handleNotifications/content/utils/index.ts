import { ModalType, TNotificationContent } from "types/notification";
import { NotificationTypes } from "../type";

export const handleNotification = ({
  hotNotifications,
}: {
  hotNotifications: TNotificationContent | undefined;
}) => {
  if (
    hotNotifications?.model_type === ModalType.student ||
    hotNotifications?.model_type === ModalType.lead ||
    hotNotifications?.model_type === ModalType.candidate
  ) {
    return {
      type: NotificationTypes.CALL_REQUEST,
    };
  } else
    return {
      type: NotificationTypes.TASK,
    };
};
