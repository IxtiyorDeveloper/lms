import Router from "next/router";
import { useEffect, useMemo } from "react";
import dayjs from "dayjs";
import { DATE_FORMAT_YYYY_MM_DD } from "constants/dates";

export function excludeObjectFields(array: string[]) {
  let newObj = {};
  for (const [key, value] of Object.entries(Router.query)) {
    if (!array.includes(key)) {
      newObj = {
        ...newObj,
        [key]: value,
      };
    }
  }
  return newObj;
}

type sType = {
  isSuccess?: boolean;
};
export interface IUseExcludeInterface {
  watch: any;
  data: any;
  setValue: any;
  array?: string[] | null;
  isHaveGeneral?: boolean;
  isDate?: {
    setFieldsName: string;
    firstDateFieldName: string;
    secondDateFieldName: string;
  } | null;
  isClearChange?: {
    watchField: string;
    clearField: string;
  }[];
  isSuccess: sType["isSuccess"];
  dependencies?: any;
}
export const useExclude = (
  watch: any,
  data: any,
  setValue: any,
  array?: string[] | null,
  isHaveGeneral?: boolean,
  isDate?: {
    setFieldsName: string;
    firstDateFieldName: string;
    secondDateFieldName: string;
  } | null,
  isClearChange?: {
    watchField: string;
    clearField: string;
  }[],
  isSuccess: sType["isSuccess"] = true,
  dependencies?: any
) => {
  useEffect(() => {
    /**
     * after loading data renders router values to filter inputs
     */
    const objects = excludeObjectFields(
      array || ["page", "pageSize", "previous_place", "roundedTabIndex"]
    );
    let first = null;
    let second = null;
    if (isSuccess) {
      if (data)
        for (const [key, value] of Object.entries(objects)) {
          if (!!value) {
            if (
              isDate?.firstDateFieldName === key ||
              isDate?.secondDateFieldName === key
            ) {
              const changedData = dayjs(
                value as string,
                DATE_FORMAT_YYYY_MM_DD
              );
              isDate?.firstDateFieldName === key
                ? (first = changedData)
                : (second = changedData);
            } else {
              if (!!isHaveGeneral) {
                setValue(`general.${key}`, value);
              } else {
                setValue(key, value);
              }
            }
          }
        }

      if (first && second && isDate) {
        if (!!isHaveGeneral) {
          setValue(`general.${isDate?.setFieldsName}`, [first, second]);
        } else {
          setValue(isDate?.setFieldsName, [first, second]);
        }
      }
    }
  }, [isSuccess, watch, dependencies]);

  useEffect(() => {
    let subscription: any = null;
    if (isClearChange) {
      subscription = watch((value: any, { name, type }: any) => {
        isClearChange.map((item) => {
          if (type === "change" && name === item.watchField) {
            setValue(item.clearField, undefined);
          }
        });
      });
    }
    return () => subscription && subscription.unsubscribe();
  }, [watch]);
  return useMemo(() => [], [isSuccess, dependencies]);
};
