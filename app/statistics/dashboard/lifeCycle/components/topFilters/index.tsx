import React, { FC, useEffect, useMemo } from "react";
import { ClickableTag, HashSvg } from "components";
import { useForm } from "react-hook-form";
import { Wrapper } from "./style";
import { ITopFiltersProps } from "./type";
import { icons } from "../../data";
import { useRouter } from "next/router";
import _ from "lodash";

const TopFilters: FC<ITopFiltersProps> = ({ data }) => {
  const { control, watch, setValue } = useForm();

  const router = useRouter();

  const tagData = useMemo(() => {
    let array: any[] = [];
    if (!!data?.models?.groups)
      for (const [key, value] of Object.entries(data?.models?.groups)) {
        const Icon: any = icons.find(
          (item) => item.id.toString() === key.toString()
        )?.icon;
        array = [
          ...array,
          {
            id: key,
            name: (
              <div className="tag-item">
                {<Icon width={16} height={16} />}
                <p>{value}</p>
              </div>
            ),
          },
        ];
      }
    return array;
  }, [data]);

  useEffect(() => {
    const subscription = watch((value, { name, type }) => {
      if (type === "change" && name === "allFilter") {
        const { allFilter } = value;
        const grouped_model_String =
          allFilter.toString() === "0"
            ? Object.keys(data?.models?.groups || {}) || ""
            : [];
        router.replace({
          pathname: router.pathname,
          query: {
            ...router.query,
            grouped_model: grouped_model_String,
          },
        });
        setValue("grouped_model", grouped_model_String);
      }
      if (type === "change" && name === "grouped_model") {
        const { grouped_model } = value;
        const allTagFilterArray = Object.keys(data?.models?.groups || {});
        const sortedTagFilter = _.sortBy(grouped_model);
        const sortedAllTagFilterArray = _.sortBy(allTagFilterArray);

        const areEqual = _.isEqual(sortedTagFilter, sortedAllTagFilterArray);
        router.replace({
          pathname: router.pathname,
          query: {
            ...router.query,
            grouped_model: grouped_model,
          },
        });
        setValue("allFilter", areEqual ? [0] : []);
      }
    });
    return () => subscription.unsubscribe();
  }, [watch, data, router.query]);

  useEffect(() => {
    if (!router.query?.grouped_model) {
      setValue("grouped_model", router.query?.grouped_model);
      setValue("allFilter", []);
    }
  }, [router.query?.grouped_model]);

  return (
    <Wrapper>
      <ClickableTag
        control={control}
        name="allFilter"
        data={[
          {
            id: 0,
            name: (
              <div className="tag-item">
                <HashSvg width={16} height={16} />
                <p>All</p>
              </div>
            ),
          },
        ]}
      />
      <ClickableTag control={control} name="grouped_model" data={tagData} />
    </Wrapper>
  );
};

export default TopFilters;
