import React, { FC, useEffect } from "react";
import { MySelect, SelectMonth } from "components";
import { useForm } from "react-hook-form";
import { usePageDataMemo } from "hooks";
import { filterQuery } from "utils/filterQuery";
import { useExclude } from "utils/excludeObjectFields";
import moment from "moment";
import { useRouter } from "next/router";

const Filter: FC = () => {
  const router = useRouter();

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
      <h1 className="title-stat">Group statistics</h1>
      <form style={{ width: "450px" }}>
        <div
          style={{
            width: "100%",
            display: "flex",
            alignItems: "center",
            gap: "10px",
          }}
        >
          <MySelect
            name="branches"
            maxTagCount={1}
            mode="multiple"
            control={control}
            options={selects.branch}
            placeholder="All branch"
          />
          <div style={{ width: "300px" }}>
            <SelectMonth
              onChange={(e) => {
                router.push({
                  query: {
                    ...router.query,
                    monthM: moment(e, "MMMM YYYY").format("MM"),
                  },
                });
              }}
            />
          </div>
        </div>
      </form>
    </div>
  );
};

export default Filter;
