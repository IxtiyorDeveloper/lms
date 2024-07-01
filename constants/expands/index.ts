export const expands = {
  roleOne:
    "permissions,application_roles.role,application_roles.application_key,shifts.days",
  branchAll: "room_count,coverFile,branchFiles",
  regionAll: "branch_count,room_count,branches.coverFile",
  cashflowSalaryMain: "children.totalAmount,children.detailedAmount",
  login:
    "rbacAssignment.rbacRole.permissionList,userProfile.avatar.children,userPhones,defaultBranches",
  getMe:
    "rbacAssignment.rbacRole.permissionList,userProfile.avatar.children,permissions_menu,permissions,default_route,operator,userPhones,defaultBranches",
  globalSearch:
    "groupMentors.user.userPhones,userPhones,userProfile.avatar.children,groupMentors.user.userProfile.avatar.children,student.user.userProfile.avatar,student.user.userPhones,student.currentGroupContact.group,rbacAssignment.rbacRole",
  groupSchedule:
    "real_total_contact_count,buttonActions,groupMentors.user.userProfile,free_place,level.parent,groupType,payment_count,level,room,course,lessonDay,lessonTime,total_study_contact_count,payment_count,partial_payed_count,new_student_not_attended_contact_count,new_student_attended_contact_count",
  newStudents:
    "buttonActions,actualTransfers.group,actualPayment,group.groupType,group.teacher.user.userProfile,group.support.user.userProfile,group.room,group.level.parent,group.groupMentors.user,contactResponsibles.user,user.userProfile.avatar.children,user.student.permissionLabels,group.lessonDay,group.lessonTime,user.userPhones,user.userLabels.createdBy,branch,permissionActions",
  activeStudents:
    "buttonActions,group.groupType,actualTransfers.group,actualPayment,group.teacher.user.userProfile,group.lessonDays,group.support.user.userProfile,group.room,group.level.parent,group.groupMentors.user,contactResponsibles.user,user.userProfile.avatar.children,user.student.permissionLabels,group.lessonDay,group.lessonTime,user.userPhones,user.userLabels.createdBy,branch,permissionActions",
  assignmentOne:
    "staff,user.userProfile.avatar.children,user.userPhones,rbacAssignmentBranches,rbacRoleShift,rbacRole.department",
  assignmentAll:
    "user.userProfile.avatar.children,rbacRoleShift,staff,rbacAssignmentBranches.branch",
  studentBalanceAll:
    "user.userProfile.avatar.children,course,courseType,branch,user.userPhones,level.parent,preferTimes,preferDays,actualPayment," +
    "currentGroupContact.group.groupMentors.user," +
    "currentGroupContact.group.lessonTime," +
    "currentGroupContact.group.lessonDay," +
    "currentGroupContact.group.level.parent," +
    "currentGroupContact.group.room.branch," +
    "currentGroupContact.group.groupType,",
  leadHistory: "createdBy.rbacAssignment.rbacRole,data",
  smsHistory: "createdBy.userProfile.avatar.children",
  user: "user",
  exclusionView: "user.userProfile.avatar.children",
  waitingListAll:
    "groupType,buttonActions,user.userProfile.avatar.children,user.userPhones,preferTimes,preferDays,user.userLabels.createdBy,course,level.parent,branch,groupMentors,permissionLabels,permissionActions",
  dobList:
    "buttonActions,group.groupType,actualTransfers.group,actualPayment,group.teacher.user.userProfile,group.support.user.userProfile,group.room,group.level.parent,group.groupMentors.user,contactResponsibles.user,user.userProfile.avatar.children,user.student.permissionLabels,group.lessonDay,group.lessonTime,user.userPhones,user.userLabels.createdBy,branch,permissionActions",
  recommendation:
    "buttonActions,user.userProfile.avatar.children,user.userPhones,preferTimes,preferDays,user.userLabels.createdBy,course,level.parent,branch,groupType,permissionLabels,permissionActions",
  oneRecommendation:
    "groupMentors.user.userProfile,free_place,room.branch,lessonTime,lessonDay,level.parent,groupType,lessonDay.lessonWeeks,featureLevel.parent,contactsCountByGender",
  addToGroup:
    "groupMentors.user.userProfile,free_place,room.branch,lessonTime,lessonDay,level.parent",
  allBannedStudents:
    "buttonActions,user.userProfile.avatar.children,user.userPhones,course,level.parent,preferDays,preferTimes,branch,user.userLabels.createdBy,groupType,permissionLabels,permissionActions,createdBy",
  addAction: "createdBy,user.userLabels",
  studentGetOne:
    "groupType,group,source,preferDays,preferTimes,branch,level.parent,student.source,user.userPhones,course,currentGroupContact.group.level.parent,user.userProfile.avatar.children",
  coverTeacher:
    "children.salary.receiver.userProfile.avatar.children,salary.receiver.userProfile.avatar.children",
};
