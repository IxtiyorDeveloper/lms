import moment from "moment";
import React, { FC } from "react";
import { IStockPage } from "types";
import { useRouter } from "next/router";
import { MySelect, SelectYear } from "components";
import { handleNavigateYear } from "utils/handleNavigateYear";

interface IProps {
  control: any;
  pageData?: IStockPage;
}

const ByMonthFilter: FC<IProps> = ({ control, pageData }) => {
  const router = useRouter();
  const options = [
    // { label: "All branch", value: null },
    ...(pageData?.locations?.map((e) => {
      return {
        label: e.name,
        value: e.id,
      };
    }) || []),
  ];
  return (
    <div className="filter-container">
      <div>
        <SelectYear
          onChange={(e) => {
            setTimeout(() => {
              handleNavigateYear({ e, router, queryKey: ["statistics_year"] });
            }, 300);
          }}
          initValue={
            (router.query.statistics_year as string) ||
            moment().year().toString()
          }
        />
      </div>
      <div className="select-container">
        <MySelect
          name="statistics_location_id"
          control={control}
          placeholder="All"
          options={options}
        />
      </div>
    </div>
  );
};

export default ByMonthFilter;
