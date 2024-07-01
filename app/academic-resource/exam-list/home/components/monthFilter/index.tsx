import React from "react";
import { Wrapper } from "./style";
import { Button, PodoSvg, Segmented, SelectMonth } from "components";
import moment from "moment";
import { useRouter } from "next/router";
import { handleNavigateMonth } from "utils/handleNavigateMonth";
import { DATE_FORMAT_MMMM_YYYY } from "constants/dates";

export enum ExamTabOptions {
  REAL = "1",
  MOCK = "2",
}
const MonthFilter = () => {
  const router = useRouter();

  return (
    <Wrapper>
      <div>
        <Segmented
          options={[
            {
              label: "Real exam",
              value: ExamTabOptions.REAL,
            },
            {
              label: "Mock exam",
              value: ExamTabOptions.MOCK,
            },
          ]}
          routerKey="tabId"
          initValue={(router.query?.tabId as string) || ExamTabOptions.REAL}
        />
      </div>
      <div className="filter">
        <Button className="btn">
          <PodoSvg width={20} />
          &nbsp;
          <span className="btn-text">Set Podo</span>
        </Button>
        <SelectMonth
          initValue={moment(router.query.date?.toString()).format(
            DATE_FORMAT_MMMM_YYYY
          )}
          onChange={(e) => handleNavigateMonth({ e, router, queryKey: "date" })}
        />
      </div>
    </Wrapper>
  );
};

export default MonthFilter;
