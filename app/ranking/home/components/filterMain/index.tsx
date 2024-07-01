import React, { FC, useEffect } from "react";
import { AntdSwitch, Button, Input, MySelect, SearchSvg } from "components";
import { Wrapper } from "./style";
import { useRouter } from "next/router";
import { useForm } from "react-hook-form";
import { filterQuery } from "utils";
import { Spin } from "antd";
import { IMentorConfig } from "types";
import { Buttons } from "globals/components/changePassword/style";
import { bgColors } from "styles/theme";
import { resetQuery } from "utils/resetQuery";

const FilterMain: FC<{
  count: number | string;
  loading: boolean;
  config?: IMentorConfig;
}> = ({ count, loading, config }) => {
  const router = useRouter();

  const { control, watch, setValue, handleSubmit, getValues, reset } = useForm({
    defaultValues: {
      search: router.query.search,
      group_count: router.query.group_count,
    },
  });

  const onChangeInput = (values: any) => {
    let a: any = {
      from_group_count: undefined,
      to_group_count: undefined,
      new_staff: undefined,
    };
    (typeof values?.group_count == "string"
      ? [values?.group_count]
      : values?.group_count || []
    )?.map((e: any) => {
      switch (e) {
        case "1": {
          a = { ...a, from_group_count: count };
          break;
        }
        case "-1": {
          a = { ...a, new_staff: true };
          break;
        }
        case "0": {
          a = { ...a, to_group_count: count };
          break;
        }
      }
    });
    filterQuery({ ...values, ...a });
  };

  const clear = () => {
    resetQuery(["year", "month", "branch_id", "type"]);
    reset();
    setTimeout(() => {
      setValue("group_count", router.query.type != "200" ? "1" : ["1", "0"]);
      onChangeInput(getValues());
    }, 0);
  };

  useEffect(() => {
    if (count > 0) {
      // router.query.type != "200" ? setFirstTime(false) : setFirstTime1(false);
      router.replace(
        {
          pathname: router.pathname,
          query: {
            ...router.query,
            from_group_count: count,
            to_group_count: router.query.type != "200" ? undefined : count,
            group_count: router.query.type != "200" ? "1" : ["1", "0"],
          },
        },
        undefined,
        { scroll: false }
      );
      setValue("group_count", router.query.type != "200" ? "1" : ["1", "0"]);
    }
  }, [count, router.query.type]);

  return (
    <Spin spinning={loading}>
      <Wrapper>
        <div className="flex">
          <Input
            name="search"
            control={control}
            placeholder="Search"
            prefix={<SearchSvg />}
            style={{ width: "180px" }}
          />
          <MySelect
            name="group_count"
            placeholder="Group count"
            control={control}
            label="Group count"
            options={[
              {
                value: "1",
                label: `Groups count >=${count}`,
              },
              {
                value: "0",
                label: `Groups count <${count}`,
              },
              {
                value: "-1",
                label: `New staff`,
              },
            ]}
            // defaultValue="1"
            mode="multiple"
            maxTagCount={1}
            style={{ width: "250px" }}
          />
          <div className="container">
            <AntdSwitch
              name="status"
              control={control}
              defaultValue={router.query.status === "true"}
            />
            Not in ranking list
          </div>
          {router.query.type != "200" && (
            <div className="container">
              <AntdSwitch
                name="is_observed"
                control={control}
                defaultValue={router.query.is_observed === "true"}
              />
              Observed
            </div>
          )}
        </div>
        <div>
          <Buttons>
            <Button
              className="cancel"
              onClick={clear}
              style={{
                backgroundColor: bgColors.wildSand,
                width: "100%",
              }}
            >
              Reset
            </Button>
            <Button
              className="save"
              type="submit"
              onClick={handleSubmit(onChangeInput)}
              style={{
                width: "100%",
              }}
            >
              Save
            </Button>
          </Buttons>
        </div>
      </Wrapper>
    </Spin>
  );
};

export default FilterMain;
