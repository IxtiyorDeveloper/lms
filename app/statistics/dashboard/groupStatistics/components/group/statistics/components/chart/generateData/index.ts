import { IGroupStatistics } from "types";
import { ISByStudentCount } from "../../../../../../../../../../types/statistics/group";

function mergeArrays(inputObj: IGroupStatistics | undefined) {
  let mergedArray: any = [];

  if (inputObj)
    Object.keys(inputObj).forEach((key) => {
      const array = inputObj[key];

      array.forEach((obj) => {
        const existingObjIndex = mergedArray.findIndex(
          (item: { num_students: string }) =>
            item.num_students === obj.num_students,
        );

        if (existingObjIndex !== -1) {
          mergedArray[existingObjIndex].num_groups += parseInt(obj.num_groups);
        } else {
          mergedArray.push({
            num_students: obj.num_students,
            num_groups: parseInt(obj.num_groups),
          });
        }
      });
    });

  return mergedArray;
}

export const generateData = ({
  statistics,
}: {
  statistics: ISByStudentCount[] | undefined;
}) => {
  let array: any = [];

  if (statistics)
    for (const [index, [key, value]] of Object.entries(statistics).entries()) {
      array = [
        ...array,
        {
          tabId: key,
          data: value,
        },
      ];
    }

  return [
    {
      tabId: "all",
      data: statistics,
    },
    ...array,
  ];
};
