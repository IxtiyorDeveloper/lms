import { ETabStatuses } from "../../../../types";

export const expand =
  "user.userProfile,user.userPhones,user.userProfile.avatar.children,course,level.parent,preferTimes,preferDays,branch,buttonActions,user.userLabels.createdBy,permissionLabels,permissionActions,currentGroupContact.group.groupMentors.user,currentGroupContact.group.lessonTime,currentGroupContact.group.lessonDay,currentGroupContact.group.level.parent,currentGroupContact.group.room.branch,currentGroupContact.group.groupType,freshman_count";
export const non_group_expand =
  "user.userProfile,user.userPhones,user.userProfile.avatar.children,course,level.parent,preferTimes,preferDays,branch,buttonActions,user.userLabels.createdBy,permissionLabels,permissionActions,freshman_count,lastGroup.groupType,lastGroup.groupMentors.user.userProfile.avatar,lastGroup.room,lastGroup.level.parent,lastGroup.lessonDay,lastGroup.lessonTime,lastStudentFlow";

export const expands = {
  [ETabStatuses.TAB_WAITING]: non_group_expand,
  [ETabStatuses.TAB_NEW_STUDENT_ATTENDED]: expand,
  [ETabStatuses.TAB_NEW_STUDENT_NOT_ATTENDED]: expand,
  [ETabStatuses.TAB_STOPPING]: expand,
  [ETabStatuses.TAB_STUDYING]: expand,
  [ETabStatuses.TAB_TRANSFERRING]: expand,
  [ETabStatuses.TAB_ARCHIVED]: non_group_expand,
};
