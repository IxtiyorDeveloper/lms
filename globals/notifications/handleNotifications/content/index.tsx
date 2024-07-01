import React from "react";
import { NotificationTypes } from "./type";
import CallRequestContent from "./callRequest";
import TaskContent from "./task";
import { TNotificationContent } from "types/notification";
import { handleNotification } from "./utils";

const NotificationContent = ({
  hotNotifications,
}: {
  hotNotifications: TNotificationContent | undefined;
}) => {
  const { type } = handleNotification({ hotNotifications });
  const content = {
    [NotificationTypes.CALL_REQUEST]: (
      <CallRequestContent hotNotifications={hotNotifications} />
    ),
    [NotificationTypes.TASK]: (
      <TaskContent hotNotifications={hotNotifications} />
    ),
  };
  return <div>{content[type]}</div>;
};
export default NotificationContent;
