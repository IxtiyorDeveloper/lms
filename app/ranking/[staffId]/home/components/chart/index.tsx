import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Line } from "react-chartjs-2";
import { ResponsiveContainer } from "recharts";
import moment from "moment";
import { Wrapper } from "./style";
import { IRankingChart } from "types";
import { Spin } from "antd";
import { DATE_FORMAT_YYYY_MM_DD } from "constants/dates";
import { bgColors } from "styles/theme";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
);

type Props = {
  loading: boolean;
  data?: IRankingChart[];
  order?: number;
  overall?: number;
};

const ProgressLineChart = ({
  data,
  loading,
  order = 0,
  overall = 0,
}: Props) => {
  const labels = data
    ?.sort((a, b) =>
      moment(a.date, DATE_FORMAT_YYYY_MM_DD).diff(
        moment(b.date, DATE_FORMAT_YYYY_MM_DD),
      ),
    )
    .map((item) => moment(item.date, DATE_FORMAT_YYYY_MM_DD).format("MMMM"));

  const today = moment();
  const previousYear = moment()
    .subtract(1, "year")
    .isoWeek(today.isoWeek())
    .isoWeekday(today.isoWeekday())
    .year();
  return (
    <Spin spinning={loading}>
      <Wrapper className="container progress_line_chart">
        <h2>
          {previousYear}/{moment().year()}
        </h2>
        <div className="progress_container">
          <ResponsiveContainer width="100%" className="class">
            <Line
              className="progress_line"
              options={{
                maintainAspectRatio: false,
                responsive: true,
                font: {
                  family: "Inter",
                },
                plugins: {
                  legend: {
                    display: false,
                  },
                  tooltip: {
                    mode: "index",
                    position: "nearest",
                    callbacks: {
                      label: function (context: any) {
                        const item = data?.find(
                          (item) =>
                            moment(item.date, DATE_FORMAT_YYYY_MM_DD).format(
                              "MMMM",
                            ) === context.label,
                        );
                        return `progress: ${item?.progress_total}% offence: ${item?.offence_total}% overall: ${item?.overall}% lost: ${item?.lost_total}`;
                      },
                    },
                  },
                },
                scales: {
                  y: {
                    min: 70,
                    max: 120,
                    type: "linear",
                    ticks: {
                      stepSize: 10,
                    },
                  },
                },
              }}
              data={{
                labels,
                datasets: (data || [])?.map((el, i: any, chartData) => {
                  return {
                    fill: false,
                    label: moment(el.date, DATE_FORMAT_YYYY_MM_DD).format(
                      "MMMM",
                    ),
                    pointRadius: 8,
                    pointHoverRadius: 10,
                    pointBackgroundColor: "#fff",
                    pointHoverBackgroundColor: "#fff",
                    borderColor: i
                      ? Number(el.overall ?? 0) >
                        Number(chartData[i - 1]?.overall ?? 0)
                        ? bgColors.midori
                        : bgColors.pop
                      : bgColors.midori,
                    data:
                      i > 1
                        ? [...Array(i - 1)].concat([
                            chartData?.[i - 1]?.overall,
                            el.overall,
                          ])
                        : i
                          ? [chartData?.[i - 1]?.overall, el.overall]
                          : [el.overall],
                  };
                }),
              }}
            />
          </ResponsiveContainer>
          <div className="my_statistic">
            <div className="circle">{overall ?? 0}%</div>
            <p className="position">
              Position <span>{order ?? 0}</span>
            </p>
          </div>
        </div>
      </Wrapper>
    </Spin>
  );
};

export default ProgressLineChart;
