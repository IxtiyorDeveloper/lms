import { CandidateStatus } from "constants/hr";
import { ModalType, TNotificationContent } from "types/notification";

export const generateLink = ({
  hotNotifications,
}: {
  hotNotifications: TNotificationContent | undefined;
}) => {
  const tabOrder =
    hotNotifications?.meta_tags?.status === CandidateStatus.CANDIDATE
      ? hotNotifications?.meta_tags?.stage
      : hotNotifications?.meta_tags?.vacancy_id;

  if (hotNotifications?.model_type == ModalType.student) {
    return `/student/${hotNotifications?.model_id}`;
  } else if (hotNotifications?.model_type == ModalType.lead) {
    return `/leads?search=${
      hotNotifications?.user_phones?.find((i) => i.is_confirmed == 1)
        ?.phone_number
    }`;
  } else {
    return `/hr?status=${hotNotifications?.meta_tags?.status}&stage=${hotNotifications?.meta_tags?.stage}&search=${hotNotifications?.meta_tags?.id}&id=${hotNotifications?.meta_tags?.id}&roundedTabIndex=${tabOrder}`;
  }
};
