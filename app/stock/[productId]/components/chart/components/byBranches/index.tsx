import React, { FC } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { Wrapper } from "./style";
import { bgColors } from "styles/theme";
import { IStockPage, IStockProduct } from "types";
import { StockProductType } from "constants/stock";

interface IProps {
  data?: IStockProduct;
  pageData?: IStockPage;
}
const ByBranches: FC<IProps> = ({ data, pageData }) => {
  const isVisivbleOrdered =
    !!data && !data?.isStationary && data.type == +StockProductType.Student;

  const chartData = data?.locations?.map((e) => {
    const location = pageData?.locations.find((l) => l.id == e.location_id);
    return isVisivbleOrdered
      ? {
          name: location?.name,
          Active: e.units?.["100"] || 0,
          Recovery: e.units?.["200"] || 0,
          Broken: e.units?.["300"] || 0,
          Ordered: e.units?.["400"] || 0,
        }
      : {
          name: location?.name,
          Active: e.units?.["100"] || 0,
          Recovery: e.units?.["200"] || 0,
          Broken: e.units?.["300"] || 0,
          // Ordered: e.units?.["400"] || 0,
        };
  });
  return (
    <Wrapper>
      <div className="flex-c">
        <div className="item">
          <div className="circle " />
          Active
        </div>
        <div className="item">
          <div className="circle second-circle" />
          Recovery
        </div>
        <div className="item">
          <div className="circle third-circle" />
          Broken
        </div>
        {isVisivbleOrdered && (
          <div className="item">
            <div className="circle fourth-circle" />
            Ordered
          </div>
        )}
      </div>
      <ResponsiveContainer height="85%" width="100%">
        <BarChart
          width={700}
          height={300}
          data={chartData}
          margin={{
            top: 30,
            right: 30,
            left: 10,
            bottom: 5,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip reverseDirection={{ x: true, y: false }} cursor={false} />
          {isVisivbleOrdered && (
            <Bar
              dataKey="Ordered"
              stackId="a"
              fill={bgColors.primary}
              radius={3}
              barSize={34}
            />
          )}
          <Bar
            dataKey="Broken"
            stackId="a"
            fill={bgColors.pop}
            radius={3}
            barSize={34}
          />{" "}
          <Bar
            dataKey="Recovery"
            stackId="a"
            fill={bgColors.orange}
            radius={3}
            barSize={34}
          />
          <Bar
            dataKey="Active"
            stackId="a"
            fill={bgColors.midori}
            radius={3}
            style={{
              boxShadow: "2px 2px 8px 0px rgba(255, 255, 255, 0.50) inset",
            }}
            barSize={34}
          />
        </BarChart>
      </ResponsiveContainer>
    </Wrapper>
  );
};

export default ByBranches;
