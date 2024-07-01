import { Flex } from "antd";
import { MyDateRangePicker } from "components";
import { useRouter } from "next/router";
import { useForm } from "react-hook-form";
import { useEffect } from "react";
import moment from "moment";
import dayjs from "dayjs";

const AverageScoreCalculatedInfo = () => {
  const router = useRouter();

  const { control, setValue, watch } = useForm();

  useEffect(() => {
    if (watch("start_date")) {
      router.replace({
        query: {
          ...router.query,
          start_date_stats: moment(watch("start_date")[0]?.["$d"]).format(
            "YYYY-MM-DD",
          ),
          end_date_stats: moment(watch("start_date")[1]?.["$d"]).format(
            "YYYY-MM-DD",
          ),
        },
      });
    }
  }, [watch("start_date")]);

  const today = dayjs();

  const startOfMonth = dayjs().startOf("month");
  const defaultValue = [startOfMonth, today];

  return (
    <Flex gap={8} align="center">
      <div style={{ width: "260px" }}>
        <MyDateRangePicker
          defaultValue={defaultValue}
          name="start_date"
          control={control}
        />
      </div>
    </Flex>
  );
};

export default AverageScoreCalculatedInfo;
