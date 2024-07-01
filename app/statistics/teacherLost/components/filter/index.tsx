import React from "react";
import { Wrapper, FormWrapper } from "./style";
import { Button, MySelect, RedBadgeTitle, SelectMonth } from "components";
import { useForm } from "react-hook-form";
import { DATE_FORMAT_MMMM_YYYY } from "constants/dates";
import { bgColors, textColors } from "styles/theme";
import { usePageDataMemo } from "hooks";
import { filterQuery } from "utils/filterQuery";
import { resetQuery } from "utils/resetQuery";
import moment from "moment";
import { useRouter } from "next/router";
import { handleNavigateMonth } from "utils/handleNavigateMonth";
import { IFetchTeachers } from "types";

const Filter = ({ data }: { data: IFetchTeachers<any> | undefined }) => {
  const router = useRouter();
  const { level, teacher, branch, args } = usePageDataMemo();
  const { control, handleSubmit, reset } = useForm();

  const onSubmit = (data: any) => {
    let nData = {
      teacher_id: data.teacher_id,
      level_id: data.level_id,
      branch_id: data.branch_id,
      year: moment(data.date).format("YYYY"),
      month: moment(data.date).format("MM"),
    };
    filterQuery(nData);
  };

  const onReset = () => {
    reset();
    resetQuery(["page", "pageSize"]);
  };

  return (
    <Wrapper>
      <RedBadgeTitle
        title="Teacher lost"
        count={data?.teachers?.reduce((acc, cur) => {
          return acc + parseInt(cur?.lost_count || 0);
        }, 0)}
      />
      <FormWrapper onSubmit={handleSubmit(onSubmit)} className="filter">
        <div className="form-element">
          <MySelect
            loading={args.isLoading}
            options={teacher}
            name="teacher_id"
            control={control}
            placeholder="Teacher"
          />
        </div>
        <div className="form-element">
          <MySelect
            loading={args.isLoading}
            options={level.options}
            name="level_id"
            control={control}
            placeholder="Level"
          />
        </div>
        <div className="form-element">
          <MySelect
            name="branch_id"
            loading={args.isLoading}
            options={branch}
            control={control}
            placeholder="All Branches"
          />
        </div>
        <div className="form-element">
          <SelectMonth
            initValue={moment(router.query.date?.toString()).format(
              DATE_FORMAT_MMMM_YYYY
            )}
            onChange={(e) =>
              handleNavigateMonth({ e, router, queryKey: ["year", "month"] })
            }
          />
        </div>
        <Button
          onClick={onReset}
          bgColor={bgColors.purpleCrystal}
          textColor={textColors.yourShadow}
        >
          Reset
        </Button>
        <Button type="submit">Save</Button>
      </FormWrapper>
    </Wrapper>
  );
};

export default Filter;
