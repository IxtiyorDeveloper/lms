import { IArsTeacher, IUnit } from "types/ars/teacher";
import { useRouter } from "next/router";
import { usePageDataMemo } from "hooks";
import { IGroup, TParams, IGroupInfo } from "types";
import moment from "moment";

export const customSort = (
  a: { parent_unit: { id: number }; order: number },
  b: { parent_unit: { id: number }; order: number }
) => {
  if (a.parent_unit.id === b.parent_unit.id) {
    return a.order - b.order;
  } else {
    return a.parent_unit.id - b.parent_unit.id;
  }
};

function divideArray(
  objects: IUnit[] | undefined,
  dynamicNumber: number,
  subLevel:
    | {
        label: string;
        value: string;
      }[]
    | undefined
) {
  const totalObjects = objects?.length || 0;
  const baseSize = Math.floor(totalObjects / dynamicNumber);
  const remainingObjects = totalObjects % dynamicNumber;

  let subarrays: TParams = {};
  let startIndex = 0;

  for (let i = 0; i < dynamicNumber; i++) {
    const currentSize = baseSize + (i < remainingObjects ? 1 : 0);
    const endIndex = startIndex + currentSize;
    const subarray = objects?.slice(startIndex, endIndex);
    subarrays = {
      ...subarrays,
      [subLevel?.[i]?.value as string]: subarray,
    };
    startIndex = endIndex;
  }

  return subarrays;
}

export const currentUnits = ({
  units,
  info,
}: {
  units: IArsTeacher[] | undefined;
  info: IGroupInfo | undefined;
}) => {
  const router = useRouter();
  const level = !!router.query?.level
    ? router.query?.level
    : info?.level?.id.toString();

  const allLevals = units
    ?.map((day) => {
      return day.units
        .sort((a, b) => a.system_order - b.system_order)
        .map((unit) => {
          return {
            ...unit,
          };
        })
        .flat();
    })
    .flat();
  return allLevals?.filter((unit) => unit.level?.id.toString() == level);
};
