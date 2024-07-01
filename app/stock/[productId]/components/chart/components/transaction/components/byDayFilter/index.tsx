import React, { FC } from "react";
import { MySelect, SelectMonth } from "components";
import { IStockPage } from "types";
import { handleNavigateMonth } from "utils/handleNavigateMonth";
import moment from "moment/moment";
import { useRouter } from "next/router";

interface IProps {
  control: any;
  pageData?: IStockPage;
}

const ByDayFilter: FC<IProps> = ({ control, pageData }) => {
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
        <SelectMonth
          onChange={(e) =>
            setTimeout(
              () =>
                handleNavigateMonth({
                  e,
                  router,
                  queryKey: ["statistics_year", "statistics_month"],
                }),
              300,
            )
          }
          initValue={moment(
            `${router.query.statistics_year || moment().year()} ${
              router.query.statistics_month || moment().month() + 1
            }`,
            "YYYY MM",
          ).format("MMMM YYYY")}
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

export default ByDayFilter;
