import { GeneralParams } from "types";
import { useForm } from "react-hook-form";
import React, { useEffect } from "react";
import Columns from "../priceList/columns";
import { Buttons, TableWrapper } from "../priceList/style";
import { AntdTable, Button } from "components";
import { useSetPrice } from "hooks/usePrices";
import _ from "lodash";
import { Price, Type } from "./type";
import { useRouter } from "next/router";
import { toast } from "react-toastify";
import { useQueryClient } from "@tanstack/react-query";
import { queryKeys } from "constants/queryKeys";
import { validationErrorHandler } from "utils";

const LevelPrice = ({
  course,
  id,
  index,
  parentLevel,
  data,
  isLoading,
  isPreviousData,
  isPageDataLoading,
  isPageDataPreviousData,
}: Type) => {
  const router = useRouter();
  const course_id = router?.query?.update_id;
  const queryClient = useQueryClient();
  const setPrice = useSetPrice({
    onSuccess: () => {
      toast.success("Price List is updated");
      queryClient.invalidateQueries([queryKeys.admin_course_index]);
    },
    onError: (err) => {
      validationErrorHandler({ err });
    },
  });
  const { control, watch, setValue, handleSubmit } = useForm<GeneralParams>();

  useEffect(() => {
    let general = {};
    if (course?.coursePrices && data) {
      for (let i = 0; i < course?.groupTypes?.length; i++) {
        for (let j = 0; j < data?.branches?.length; j++) {
          const branch_id = data?.branches[j]?.id;
          const groupType = course?.groupTypes[i];
          const price = course?.coursePrices?.find(
            (co) =>
              co?.branch_id.toString() == branch_id.toString() &&
              co?.level_id.toString() == id.toString() &&
              co.group_type_id.toString() == groupType?.id.toString()
          )?.amount;
          general = {
            ...general,
            [`amount_groupType${groupType?.id}_branch${branch_id}_level${id}`]:
              price,
          };
        }
      }
      setValue("general", general);
    }
  }, [course, data]);

  const columns = Columns({ course, id, control });
  const onSubmit = (data: GeneralParams) => {
    const { general } = data;
    let prices: Price[] = [];
    {
      _.map(general, (value, key) => {
        if (!!value) {
          const str = key;
          const regex = /amount_groupType(\d+)_branch(\d+)_level(\d+)/;

          const matches = str.match(regex);

          if (matches) {
            const group_type_id = parseInt(matches[1]);
            const branch_id = parseInt(matches[2]);
            const level_id = parseInt(matches[3]);

            prices = [
              ...prices,
              {
                level_id,
                group_type_id,
                branch_id,
                amount: value,
              },
            ];
          }
        }
      });
    }
    if (prices?.length) {
      setPrice.mutate({
        query_params: {
          id: course_id,
        },
        body: {
          prices,
        },
      });
    } else {
      toast.info("No change is detected");
    }
  };
  return (
    <TableWrapper key={index}>
      <p className="l-name">{parentLevel?.name}</p>
      <form onSubmit={handleSubmit(onSubmit)}>
        <AntdTable
          // styles={{
          //   padding: 0,
          //   borderBottom: `1px solid ${bgColors.purpleCrystal}`,
          // }}
          // paddingRow={0}
          columns={columns}
          dataSource={data?.branches ?? []}
          // tdStyles={{ height: "1px" }}
          // theadStyle={{ height: "1px" }}
          loading={
            isLoading ||
            isPreviousData ||
            isPageDataLoading ||
            isPageDataPreviousData
          }
        />
        <Buttons>
          <div className="wr">
            <Button
              className="save"
              style={{ width: "100%" }}
              type="submit"
              buttonLoading={setPrice.isLoading}
            >
              Save
            </Button>
          </div>
        </Buttons>
      </form>
    </TableWrapper>
  );
};
export default LevelPrice;
