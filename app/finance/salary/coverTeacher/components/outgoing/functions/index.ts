import { ICoverTeacherComponent } from "types/finance/salary";
import { IAssignment } from "types";
import moment from "moment";
import { removeDuplicatesByDate } from "../toolTip/utils";
import { calculateTotalScore } from "../leftCoverItem/utils";

export interface RestructuredObjectForInitialArray {
  user_id: number;
  assignment?: IAssignment;
  user_covers: ICoverTeacherComponent[];
  // You can add other properties you want in the restructured object here
}

export interface OutgoingRestructuredObject {
  user_id: number;
  assignment?: IAssignment;
  user_covers: IUserCover[];
  // You can add other properties you want in the restructured object here
}

export interface IUserCover {
  data: ICoverTeacherComponent[];
  user: IAssignment;
  user_id: number;
}

function sortByDate(data: ICoverTeacherComponent[]) {
  // Custom sorting function
  function compareDates(
    a: { data: { date: string | number | Date } },
    b: { data: { date: string | number | Date } }
  ) {
    const dateA: any = new Date(a.data.date);
    const dateB: any = new Date(b.data.date);
    return dateA - dateB;
  }

  // Sort the data array using the compareDates function
  data.sort(compareDates);

  return data; // Return the sorted array
}

export function restructureArrayToUser({
  data,
  assignments,
}: {
  data?: ICoverTeacherComponent[];
  assignments?: IAssignment[];
}): OutgoingRestructuredObject[] {
  const restructuredArray: RestructuredObjectForInitialArray[] = [];

  if (data) {
    data.forEach((item) => {
      const { receiver_id } = item.pair.salary;

      const existingReceiver = restructuredArray.find(
        (receiver) => receiver.user_id == receiver_id
      );

      const newObj: RestructuredObjectForInitialArray = {
        user_id: receiver_id,
        assignment: assignments?.find((ass) => ass?.user?.id == receiver_id),
        user_covers: [],
        // Add other properties from the initial object if needed
      };

      if (existingReceiver) {
        existingReceiver.user_covers.push(item);
      } else {
        newObj.user_covers.push(item);
        restructuredArray.push(newObj);
      }
    });
  }
  let resultData: any = [];
  for (let i = 0; i < restructuredArray?.length; i++) {
    resultData = [
      ...resultData,
      {
        ...restructuredArray?.[i],
        user_covers: groupByReceiverId({
          data: sortByDate(restructuredArray?.[i].user_covers),
          assignments,
        }),
      },
    ];
  }

  return resultData;
}

function groupByReceiverId({
  data,
  assignments,
}: {
  data: ICoverTeacherComponent[];
  assignments?: IAssignment[];
}) {
  const groupedData: any = {};

  data.forEach((item) => {
    const receiverId = item.salary?.receiver_id;
    if (groupedData[receiverId as keyof typeof groupedData]) {
      groupedData[receiverId as keyof typeof groupedData].data.push({
        ...item,
        assignment: assignments?.find(
          (ass) => ass?.user?.id == item?.pair?.salary?.receiver_id
        ),
      });
    } else {
      groupedData[receiverId as keyof typeof groupedData] = {
        user_id: receiverId,
        user: assignments?.find((ass) => ass?.user?.id == receiverId),
        data: [
          {
            ...item,
            assignment: assignments?.find(
              (ass) => ass?.user?.id == item?.pair?.salary?.receiver_id
            ),
          },
        ],
      };
    }
  });
  return Object.values(groupedData);
}

export function formatDateRange(data: ICoverTeacherComponent[]) {
  const initialData = removeDuplicatesByDate(data);
  const dates = initialData.map((entry) => moment(entry.data.date));
  const validDates = dates.filter((date) => date.isValid());

  if (validDates.length === 0) {
    return null;
  }
  validDates.sort((a, b) => a.diff(b));
  if (validDates.length === 1) {
    return [validDates[0].format("MMMM D")];
  }
  return [validDates[0].format("MMMM D"), `+${validDates.length - 1}`];
}
export function sumAmountCalculator({
  restructured,
}: {
  restructured: OutgoingRestructuredObject[];
}) {
  let leftSum = 0;
  let rightSum = 0;
  if (restructured.length) {
    for (let i = 0; i < restructured.length; i++) {
      const singleOutgoingRestructured = restructured[i];

      rightSum = rightSum + calculateTotalScore(singleOutgoingRestructured);

      if (singleOutgoingRestructured.user_covers.length)
        for (
          let j = 0;
          j < singleOutgoingRestructured.user_covers.length;
          j++
        ) {
          const user_covers = singleOutgoingRestructured.user_covers[j];
          leftSum =
            leftSum +
            user_covers?.data?.reduce((acc, cur) => {
              return acc + Math.abs(parseFloat(cur?.value?.toString()) || 0);
            }, 0);
        }
    }
  }
  return {
    leftSum,
    rightSum,
  };
}
