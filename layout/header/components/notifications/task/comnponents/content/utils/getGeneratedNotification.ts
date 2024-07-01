import { SingleNotification } from "types/notification";

export const getGeneratedNotification = ({
  hotNotifications,
}: {
  hotNotifications: SingleNotification | undefined;
}) => {
  return {
    id: hotNotifications?.id,
    title: hotNotifications?.title,
    body: hotNotifications?.body,
    date: hotNotifications?.send_date,
    model_type: hotNotifications?.meta_tags?.model_type,
    model_id: hotNotifications?.meta_tags?.id,
    user_id: hotNotifications?.user_id,
    user_phones: hotNotifications?.meta_tags?.user_phones,
    full_name: hotNotifications?.meta_tags?.full_name,
    meta_tags: hotNotifications?.meta_tags,
  };
};
