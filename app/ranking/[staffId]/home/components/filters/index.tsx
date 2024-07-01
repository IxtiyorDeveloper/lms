import React, { FC, useEffect } from "react";
import { AntdSwitch, Button, PrintSvg, SelectMonth } from "components";
import { Wrapper } from "./style";
import { useRouter } from "next/router";
import moment from "moment/moment";
import { bgColors, textColors } from "styles/theme";
import { useForm } from "react-hook-form";
import { useSetOneTeacherRankingStatus } from "hooks/useAcademicControl";
import { validationErrorHandler } from "utils";
import { toast } from "react-toastify";
import { useQueryClient } from "@tanstack/react-query";
import { queryKeys } from "constants/queryKeys";

interface IProps {
  handlePrint: any;
  id?: any;
  status?: any;
  ranking_less_reason?: any;
}

const date = moment();
const year = date.format("YYYY");
const month = date.format("MM");
const Filters: FC<IProps> = ({ handlePrint, id, status }) => {
  const router = useRouter();
  const queryClient = useQueryClient();
  const { control, watch } = useForm();

  const change = useSetOneTeacherRankingStatus({
    onSuccess: (data) => {
      toast.success("Status changed!");
      queryClient.setQueryData<any>(
        [queryKeys.client_ranking_mentor_rank_view],
        (oldData: any) => {
          return {
            ...oldData,
            ...data,
          };
        }
      );
    },
    onError: (err) => {
      validationErrorHandler({ err });
    },
  });

  useEffect(() => {
    const subscription = watch((value, { name, type }) => {
      if (name === "status") {
        change.mutate({
          query_params: { id },
          body: {
            status: value?.status,
          },
        });
      }
    });
    return () => subscription.unsubscribe();
  }, [watch, id]);

  return (
    <Wrapper>
      {(!router.query.year ||
        (router.query.year == year && router.query.month == month)) && (
        <div className="flex-c">
          <AntdSwitch
            name="status"
            watchDefaultValue
            defaultValue={status == 450}
            control={control}
          />
          Remove from ranking
        </div>
      )}
      <SelectMonth
        onChange={(e) => {
          const date = moment(e);
          router.replace(
            {
              pathname: router.pathname,
              query: {
                ...router.query,
                year: date.format("YYYY"),
                month: date.format("M"),
              },
            },
            undefined,
            { scroll: false }
          );
        }}
        initValue={moment(
          `${router.query.year || moment().year()} ${
            router.query.month || moment().month() + 1
          }`,
          "YYYY MM"
        ).format("MMMM YYYY")}
      />
      <Button
        bgColor={bgColors.deep}
        textColor={textColors.white}
        style={{ height: "37px" }}
        onClick={handlePrint}
      >
        <PrintSvg color={bgColors.white} />
        Print
      </Button>
    </Wrapper>
  );
};

export default Filters;
