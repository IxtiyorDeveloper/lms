import React, { FC, useEffect } from "react";
import { MySelect } from "components";
import { useForm } from "react-hook-form";
import { usePageDataMemo } from "hooks";
import { filterQuery } from "utils/filterQuery";
import { useExclude } from "utils/excludeObjectFields";

const Filter: FC = () => {
  const { control, watch, setValue } = useForm();
  const selects = usePageDataMemo();

  const onSubmit = (data: any) => {
    filterQuery(data);
  };

  useExclude(watch, [], setValue, ["page", "pageSize"], false, null);

  useEffect(() => {
    const subscription = watch((value) => {
      onSubmit(value);
    });
    return () => subscription.unsubscribe();
  }, [watch]);

  return (
    <div className="header-side">
      <h1 className="title-stat">New student statistics</h1>
      <form style={{ width: "150px" }}>
        <div
          style={{
            width: "100%",
          }}
        >
          <MySelect
            name="branches"
            control={control}
            options={selects.branch}
            placeholder="All branch"
          />
        </div>
      </form>
    </div>
  );
};

export default Filter;
