import { IArsTeacher } from "types/ars/teacher";
import { useRouter } from "next/router";
import { usePageDataMemo } from "hooks";
import { IGroup, TParams } from "types";

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
  objects: string | any[],
  dynamicNumber: number,
  subLevel:
    | {
        label: string;
        value: string;
      }[]
    | undefined
) {
  const totalObjects = objects.length;
  const baseSize = Math.floor(totalObjects / dynamicNumber);
  const remainingObjects = totalObjects % dynamicNumber;

  let subarrays: TParams = {};
  let startIndex = 0;

  for (let i = 0; i < dynamicNumber; i++) {
    const currentSize = baseSize + (i < remainingObjects ? 1 : 0);
    const endIndex = startIndex + currentSize;
    const subarray = objects.slice(startIndex, endIndex);
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
  group,
}: {
  units: IArsTeacher[] | undefined;
  group?: IGroup;
}) => {
  const router = useRouter();
  const selects = usePageDataMemo();

  if (units?.length && group) {
    const sortedUnits = units?.[0]?.units.slice().sort(customSort);
    const level = selects.level?.options?.find(
      (l) => l.value?.toString() == sortedUnits?.[0]?.level?.id?.toString()
    );

    const levelCount = level?.subLevel?.length;
    const subLevel = level?.subLevel;
    const individualSubLevel =
      router?.query?.level?.toString() || group?.level_id || "";
    return divideArray(sortedUnits, levelCount || 1, subLevel)?.[
      individualSubLevel
    ];
  } else {
    return [];
  }
};
