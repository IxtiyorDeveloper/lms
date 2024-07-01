import Router from "next/router";
import { useEffect, useMemo } from "react";
import dayjs from "dayjs";
import { DATE_FORMAT_YYYY_MM_DD } from "constants/dates";
import _ from "lodash";

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
  watch?: any;
  data?: any;
  setValue?: any;
  array?: string[] | null;
  isDate?: {
    setFieldsName: string;
    firstDateFieldName: string;
    secondDateFieldName: string;
  } | null;
  isClearChange?: {
    watchField: string;
    clearField: string | string[];
  }[];
  isSuccess?: sType["isSuccess"];
  dependencies?: any;
  deletedFields?: string[];
  dates?:
    | {
        enterFieldsName: string;
        firstFieldName: string;
        secondFieldName: string;
      }[]
    | undefined;
}

/**
 * router dan querylarni o'qib u yerdagi qiymarlatni formga joylash uchun ishlaydi
 */
export const useExclude = ({
  watch,
  data = [],
  setValue,
  array,
  isClearChange,
  isSuccess = true,
  dependencies,
  deletedFields,
  dates,
}: IUseExcludeInterface) => {
  useEffect(() => {
    /**
     * after loading data renders router values to filter inputs
     */

    const objects = excludeObjectFields(
      array || ["page", "pageSize", "previous_place", "roundedTabIndex"]
    );

    if (isSuccess) {
      if (data)
        for (const [key, value] of Object.entries(objects)) {
          if (!!value) {
            if (deletedFields) {
              if (deletedFields?.some((f) => f !== `${key}`))
                setValue(key, value);
            } else {
              setValue(key, value);
            }
          }
        }

      let datesTemp = {};

      if (dates) {
        for (let i = 0; i < dates?.length; i++) {
          const singleDate = dates?.[i];

          const firstField =
            singleDate?.firstFieldName as string as keyof typeof objects;
          const secondField =
            singleDate?.secondFieldName as string as keyof typeof objects;

          if (objects[firstField] && objects[secondField]) {
            let first = dayjs(objects[firstField], DATE_FORMAT_YYYY_MM_DD);

            let second = dayjs(objects[secondField], DATE_FORMAT_YYYY_MM_DD);

            datesTemp = {
              ...datesTemp,
              [singleDate?.enterFieldsName]: [first, second],
            };
          }
        }
        if (!_.isEmpty(datesTemp))
          for (const [key, value] of Object.entries(datesTemp)) {
            setValue(key, value);
          }
      }
    }
    // }, [isSuccess, watch, dependencies]);
  }, [isSuccess, dependencies]);

  useEffect(() => {
    let subscription: any = null;
    if (isClearChange) {
      subscription = watch((value: any, { name, type }: any) => {
        isClearChange.map((item) => {
          if (type === "change" && name === item.watchField) {
            if (!!item.clearField) {
              if (Array.isArray(item.clearField)) {
                item.clearField.map((clearFieldItem) => {
                  setValue(clearFieldItem, undefined);
                });
              } else {
                setValue(item.clearField, undefined);
              }
            }
          }
        });
      });
    }
    return () => subscription && subscription.unsubscribe();
  }, [watch]);
  return useMemo(() => [], [isSuccess, dependencies]);
};
