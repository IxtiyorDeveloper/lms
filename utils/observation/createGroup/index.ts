import { IGroupDetail } from "types/observation";
import { GROUP_MENTOR_100 } from "constants/groupMentors";

export const createGroup = ({ value }: { value: IGroupDetail }) => {
  return {
    name: value?.name,
    id: value?.group_id,
    groupType: {
      name: value?.type,
    },
    groupMentors: [
      {
        type: GROUP_MENTOR_100,
        user: {
          userProfile: {
            fullname: value?.teacher,
          },
        },
      },
    ],
    lessonTime: {
      time: value?.time,
    },
    room: {
      branch: {
        name: value?.branch,
      },
    },
    lessonDay: {
      name: value?.lessonDay,
    },
    level: {
      name: value?.level,
      parent: {
        name: value?.parentLevel,
      },
    },
  };
};
