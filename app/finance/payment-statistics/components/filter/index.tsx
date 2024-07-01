import React from "react";
import {
  Button,
  InputWithIcon,
  MySelect,
  SearchSvg,
  SelectMonth,
} from "components";
import { Wrapper } from "./style";
import moment from "moment";
import { useRouter } from "next/router";
import { usePageDataMemo } from "hooks";
import { useForm } from "react-hook-form";
import { filterQuery } from "utils/filterQuery";
import { resetQuery } from "utils/resetQuery";
import { useExclude } from "utils/excludeObjectFields";
import { bgColors, textColors } from "styles/theme";
import { handleNavigateMonth } from "utils/handleNavigateMonth";
import { DATE_FORMAT_MMMM_YYYY } from "constants/dates";

const Filter = () => {
  const { control, watch, reset, setValue, handleSubmit } = useForm();
  const router = useRouter();
  const { branch } = usePageDataMemo();

  const onSubmit = (data: any) => {
    filterQuery(data);
  };
  const onReset = () => {
    reset();
    resetQuery(["page", "pageSize", "mainTab", "date"]);
  };

  useExclude(
    watch,
    [],
    setValue,
    ["page", "pageSize", "mainTab", "date"],
    false,
    {
      setFieldsName: "from_date",
      secondDateFieldName: "to_date",
      firstDateFieldName: "from_date",
    },
    []
  );

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Wrapper>
        <div className="wr">
          <MySelect
            name="branch_id"
            options={branch}
            placeholder="Select branch"
            control={control}
            mode="multiple"
          />
        </div>
        {router.query?.mainTab == "1" && (
          <div className="wr">
            <InputWithIcon
              icon={SearchSvg}
              name="full_name"
              control={control}
              placeholder="Search"
            />
          </div>
        )}
        <SelectMonth
          initValue={moment(router.query.date?.toString()).format(
            DATE_FORMAT_MMMM_YYYY
          )}
          onChange={(e) => handleNavigateMonth({ e, router, queryKey: "date" })}
        />
        <div className="buttons">
          <Button
            onClick={onReset}
            style={{
              width: "100%",
              height: "44px",
              color: textColors.yourShadow,
              backgroundColor: bgColors.wildSand,
              minWidth: "100px",
            }}
          >
            Reset
          </Button>
          <Button
            type="submit"
            style={{
              width: "100%",
              height: "44px",
              minWidth: "100px",
            }}
          >
            Search
          </Button>
        </div>
      </Wrapper>
    </form>
  );
};

export default Filter;
