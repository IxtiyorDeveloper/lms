import { IGroupDetail } from "types/statistics/teacherLost";
import { GROUP_MENTOR_100 } from "constants/groupMentors";

export const generateGroup = ({
  group_detail,
}: {
  group_detail: IGroupDetail;
}) => {
  return {
    record: {
      group: {
        id: group_detail?.id,
      },
    },
    value: {
      name: group_detail?.name,
      groupType: {
        name: group_detail?.group_type,
      },
      groupMentors: [
        {
          type: GROUP_MENTOR_100,
          user: {
            userProfile: {
              fullname: group_detail?.teacher,
            },
          },
        },
      ],
      lessonTime: {
        time: group_detail?.time,
      },
      room: {
        branch: {
          name: group_detail?.branch,
        },
      },
      lessonDay: {
        name: group_detail?.day,
      },
      level: {
        name: group_detail?.level_name,
        parent: {
          name: group_detail?.parent_level_name,
        },
      },
    },
  };
};
