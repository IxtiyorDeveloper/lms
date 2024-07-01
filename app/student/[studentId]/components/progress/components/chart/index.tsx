import React, { FC, useMemo } from "react";
import {
  ResponsiveContainer,
  LineChart,
  CartesianGrid,
  YAxis,
  XAxis,
  Tooltip,
  Line,
} from "recharts";
import { IStudentProgress } from "types/student";

interface IProps {
  data?: IStudentProgress[];
}

const LineCharts: FC<IProps> = ({ data }) => {
  const chartData = useMemo(() => {
    const result: { [key: string]: any }[] = [];
    data?.map((e) => {
      e.sub_units.map((i) => {
        const percent =
          i.student_score?.total_points > 0
            ? (
                (100 * i.student_score?.collected_points) /
                i.student_score?.total_points
              ).toFixed(0)
            : 0;
        result.push({
          name: `${e.name}.${i.order}`,
          "Collected point": +percent > 100 ? 100 : percent,
        });
      });
    });
    return result;
  }, [data]);

  return (
    <div className="chart">
      <ResponsiveContainer width="100%" height="100%">
        <LineChart
          width={500}
          height={300}
          data={chartData}
          margin={{ left: -12 }}
        >
          <CartesianGrid vertical={false} />
          <XAxis
            style={{
              color: "#9A9FA5",
              fontSize: "9.885px",
              fontWeight: "500",
              letterSpacing: "-0.099px",
            }}
            strokeOpacity={0}
            dataKey="name"
          />
          <YAxis strokeOpacity={0} />
          <Tooltip useTranslate3d filterNull />
          <Line
            type="monotone"
            dataKey="Collected point"
            stroke="#FF5247"
            opacity={0.7}
            dot={{ r: 0 }}
            strokeWidth={12}
            strokeOpacity={0.5}
            tooltipType="none"
          />
          <Line
            type="monotone"
            dataKey="Collected point"
            stroke="#FF5247"
            activeDot={{ r: 8 }}
            dot={{ r: 0 }}
            strokeWidth={2}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default LineCharts;
