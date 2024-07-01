import { IAssignment, TParams } from "types";
import { IOption } from "components/common/select/type";
import { ICoverTeacher, IValue } from "./type";
import {
  ICoverTeacherSettings,
  IDetailedCoverTeacherFormData,
  IFormDataCover,
} from "types/finance/salary";
import moment from "moment";
import { DATE_FORMAT_MMM_DD_YYYY } from "constants/dates";
import { ToHourMinute } from "utils/toHourMinute";
import _ from "lodash";
import { makeGroupOptions } from "./options";

export const makeAssignmentOptions = (arr?: IAssignment[]) => {
  return arr?.map((item) => {
    const name = item?.user?.userProfile?.firstname
      ? item?.user?.userProfile?.firstname +
        " " +
        item?.user?.userProfile?.lastname
      : item?.user?.username;
    return {
      value: item?.id?.toString(),
      label: name,
    };
  });
};
export const makeAssignmentUserOptions = (arr?: IAssignment[]) => {
  return arr?.map((item) => {
    const name = item?.user?.userProfile?.firstname
      ? item?.user?.userProfile?.firstname +
        " " +
        item?.user?.userProfile?.lastname
      : item?.user?.username;
    return {
      value: item?.user?.id?.toString(),
      label: name,
    };
  });
};

export function disableOptions(
  groupsCollector: undefined | IOption[],
  teachers: { group_id?: string[] }[] | undefined
): IOption[] | undefined {
  const disabledValues = new Set<string>();

  if (teachers && Array.isArray(teachers)) {
    teachers.forEach((item) => {
      if (
        item.group_id &&
        Array.isArray(item.group_id) &&
        item.group_id.length > 0
      ) {
        item.group_id.forEach((value: string) => {
          disabledValues.add(value);
        });
      }
    });
  }

  if (groupsCollector && Array.isArray(groupsCollector)) {
    return groupsCollector.map((item) => {
      if (disabledValues.has(item.value as string)) {
        return { ...item, disabled: true };
      } else {
        return { ...item, disabled: false };
      }
    });
  }

  return groupsCollector; // Return undefined if groupsCollector is undefined
}

export function createAssignments({ data }: { data: ICoverTeacher }) {
  const newAssignmentsArray: {
    group_id: any;
    assignment_id: any;
    description: string;
    main_description?: string;
    has_cover_teacher_money_operation?: boolean;
    has_main_teacher_money_operation?: boolean;
  }[] = [];
  if (data?.teachers)
    data?.teachers?.forEach((teacher) => {
      teacher.group_id?.forEach((groupId) => {
        newAssignmentsArray.push({
          group_id: groupId,
          assignment_id: teacher?.user_id,
          description: teacher?.description?.[groupId] ?? "",
          main_description: teacher?.main_description?.[groupId] ?? "",
          has_cover_teacher_money_operation:
            !!teacher?.has_cover_teacher_money_operation,
          has_main_teacher_money_operation:
            !!data?.has_main_teacher_money_operation,
        });
      });
    });

  return newAssignmentsArray;
}

export function restructureData(inputData: IFormDataCover[] | undefined) {
  if (inputData)
    return Object.values(
      inputData.reduce((acc: any, item) => {
        if (!acc[item.assignment_id]) {
          acc[item.assignment_id] = {
            assignment_id: item.assignment_id,
            covers: [],
          };
        }
        acc[item.assignment_id].covers.push({
          group_id: item.group_id,
          description: item.description,
          main_description: item.main_description,
          has_cover_teacher_money_operation:
            item.has_cover_teacher_money_operation,
          due_amount: item.due_amount,
          reward_amount: item.reward_amount,
        });
        return acc;
      }, {})
    );
}

export function generateText({
  covered_name,
  was_covered_name,
  group_name,
  amount,
  date,
}: {
  covered_name: string;
  was_covered_name: string;
  group_name: string;
  amount: string | number;
  date: string;
}) {
  return `${covered_name} (You) covered ${was_covered_name}’s group ${group_name} Reward: ${amount} UZS Date: ${date}`;
}

export function generateTextForReplacedTeacher({
  covered_name,
  was_covered_name,
  group_name,
  amount,
  date,
}: {
  covered_name: string;
  was_covered_name: string;
  group_name: string;
  amount: string | number;
  date: string;
}) {
  return `${covered_name} covered ${was_covered_name}’s (your) group ${group_name} Given: ${amount} UZS Date: ${date}`;
}

export function generateDescriptionArray({
  reduxData,
  value,
  dynamicId,
  group_id,
  formData,
  description,
  currentGroupSum,
}: {
  reduxData: TParams;
  value: IValue;
  dynamicId: number;
  group_id: string | undefined;
  formData: IDetailedCoverTeacherFormData | undefined;
  description: any;
  currentGroupSum: number;
}) {
  const coveredUserProfile = reduxData?.data?.assignments?.find(
    (ass: IAssignment) => ass?.id == value?.teachers?.[dynamicId]?.user_id
  )?.user?.userProfile;

  const wasCoveredUserProfile = reduxData?.data?.assignments?.find(
    (ass: IAssignment) => ass?.id == value?.user_id
  )?.user?.userProfile;

  const covered_name = coveredUserProfile
    ? coveredUserProfile?.firstname + " " + coveredUserProfile?.lastname
    : "-";
  const was_covered_name = wasCoveredUserProfile
    ? wasCoveredUserProfile?.firstname + " " + wasCoveredUserProfile?.lastname
    : "-";

  description = {
    ...description,
    [group_id as any]: generateText({
      amount: value?.teachers?.[dynamicId]?.has_cover_teacher_money_operation
        ? currentGroupSum
        : 0,
      date: `${moment(value.date).format(
        DATE_FORMAT_MMM_DD_YYYY
      )} ${ToHourMinute(
        formData?.groups?.find((opt) => opt?.id == group_id)?.lessonTime
          ?.time ?? ""
      )}`,
      group_name: makeGroupOptions(formData?.groups)?.find(
        (opt) => opt?.value == group_id
      )?.name as string,
      covered_name,
      was_covered_name,
    }),
  };
  return description;
}

export function generateDescriptionArrayForMain({
  reduxData,
  value,
  dynamicId,
  group_id,
  formData,
  description,
  currentGroupSum,
}: {
  reduxData: TParams;
  value: IValue;
  dynamicId: number;
  group_id: string | undefined;
  formData: IDetailedCoverTeacherFormData | undefined;
  description: any;
  currentGroupSum: number;
}) {
  const coveredUserProfile = reduxData?.data?.assignments?.find(
    (ass: IAssignment) => ass?.id == value?.teachers?.[dynamicId]?.user_id
  )?.user?.userProfile;

  const wasCoveredUserProfile = reduxData?.data?.assignments?.find(
    (ass: IAssignment) => ass?.id == value?.user_id
  )?.user?.userProfile;

  const covered_name = coveredUserProfile
    ? coveredUserProfile?.firstname + " " + coveredUserProfile?.lastname
    : "-";
  const was_covered_name = wasCoveredUserProfile
    ? wasCoveredUserProfile?.firstname + " " + wasCoveredUserProfile?.lastname
    : "-";

  description = {
    ...description,
    [group_id as any]: generateTextForReplacedTeacher({
      amount: value?.has_main_teacher_money_operation ? currentGroupSum : 0,
      date: `${moment(value.date).format(
        DATE_FORMAT_MMM_DD_YYYY
      )} ${ToHourMinute(
        formData?.groups?.find((opt) => opt?.id == group_id)?.lessonTime
          ?.time ?? ""
      )}`,
      group_name: makeGroupOptions(formData?.groups)?.find(
        (opt) => opt?.value == group_id
      )?.name as string,
      covered_name,
      was_covered_name,
    }),
  };
  return description;
}

export function rewardSumCalculator({
  sum,
  settings,
  formData,
  group_id,
}: {
  sum: number;
  settings: ICoverTeacherSettings | undefined;
  formData: IDetailedCoverTeacherFormData | undefined;
  group_id: string | undefined;
}) {
  sum =
    sum +
    (settings?.shares?.find(
      (s) =>
        s.groupType?.id?.toString() ==
        formData?.groups
          ?.find((form) => form.id == group_id)
          ?.group_type_id?.toString()
    )?.to?.reward_amount || 0);
  return sum;
}

export function dueSumCalculator({
  sum,
  settings,
  formData,
  group_id,
}: {
  sum: number;
  settings: ICoverTeacherSettings | undefined;
  formData: IDetailedCoverTeacherFormData | undefined;
  group_id: string | undefined;
}) {
  sum =
    sum +
    (settings?.shares?.find(
      (s) =>
        s.groupType?.id?.toString() ==
        formData?.groups
          ?.find((form) => form.id == group_id)
          ?.group_type_id?.toString()
    )?.from?.due_amount || 0);
  return sum;
}

export function currentGroupSumCalculator({
  settings,
  formData,
  group_id,
}: {
  settings: ICoverTeacherSettings | undefined;
  formData: IDetailedCoverTeacherFormData | undefined;
  group_id: string | undefined;
}) {
  return (
    settings?.shares?.find(
      (s) =>
        s.groupType?.id?.toString() ==
        formData?.groups
          ?.find((form) => form.id == group_id)
          ?.group_type_id?.toString()
    )?.to?.reward_amount || 0
  );
}

export function currentDueGroupSumCalculator({
  settings,
  formData,
  group_id,
}: {
  settings: ICoverTeacherSettings | undefined;
  formData: IDetailedCoverTeacherFormData | undefined;
  group_id: string | undefined;
}) {
  return (
    settings?.shares?.find(
      (s) =>
        s.groupType?.id?.toString() ==
        formData?.groups
          ?.find((form) => form.id == group_id)
          ?.group_type_id?.toString()
    )?.from?.due_amount || 0
  );
}

export function mergeAndCheckGroupIds(data: ICoverTeacher) {
  if (
    !data.hasOwnProperty("group_id") ||
    !Array.isArray(data.group_id) ||
    data.group_id.length === 0
  ) {
    return false; // Invalid data or no group_id array present
  }

  if (
    !data.hasOwnProperty("teachers") ||
    !Array.isArray(data.teachers) ||
    data.teachers.length === 0
  ) {
    return false; // Invalid data or no teachers array present
  }

  const mergedGroupIds = _.union(
    ...data.teachers.map((teacher) => teacher.group_id)
  );
  const sortedMainGroupId = _.sortBy(data.group_id);
  const sortedMergedGroupId = _.sortBy(mergedGroupIds);

  return _.isEqual(sortedMainGroupId, sortedMergedGroupId);
}
