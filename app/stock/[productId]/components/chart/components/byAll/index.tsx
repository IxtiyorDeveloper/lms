import React, { FC, useEffect, useState } from "react";
import { PieChart, Pie, Sector, ResponsiveContainer, Tooltip } from "recharts";
import { Wrapper } from "./style";
import { bgColors, textColors } from "styles/theme";
import { IStockPage, IStockProduct } from "types";
import { StockProductType } from "constants/stock";

const renderActiveShape = (props: any) => {
  const {
    cx,
    cy,
    innerRadius,
    outerRadius,
    startAngle,
    endAngle,
    fill,
    payload,
  } = props;
  return (
    <g>
      <text
        style={{
          color: textColors.blueGray,
          fontSize: "20px",
          fontWeight: "700",
          letterSpacing: "0.2px",
        }}
        x={cx}
        y={cy}
        dy={-0}
        textAnchor="middle"
        // fill={fill}
      >
        {payload}
      </text>
      <text
        x={cx}
        y={cy}
        dy={16}
        style={{
          color: textColors.blueGray,
          fontSize: "10px",
          fontWeight: "500",
          letterSpacing: "0.2px",
        }}
        textAnchor="middle"
        // fill={fill}
      >
        All count
      </text>
      <Sector
        cx={cx}
        cy={cy}
        innerRadius={innerRadius}
        outerRadius={outerRadius}
        startAngle={startAngle}
        endAngle={endAngle}
        fill={fill}
      />
    </g>
  );
};

interface IProps {
  data?: IStockProduct;
  pageData?: IStockPage;
}
const ByAll: FC<IProps> = ({ data, pageData }) => {
  const [state, setState] = useState({
    activeIndex: 0,
  });

  const onPieEnter = (_: any, index: number) => {
    setState({
      activeIndex: index,
    });
  };

  const isVisivbleOrdered =
    !!data && !data?.isStationary && data.type == +StockProductType.Student;

  const chartData = [
    {
      fill: bgColors.eucalyptus,
      name: "Active",
      value: data?.units?.["100"] || 0,
    },
    {
      fill: bgColors.ginger,
      name: "Recovery",
      value: data?.units?.["200"] || 0,
    },
    { fill: bgColors.pop, name: "Broken", value: data?.units?.["300"] || 0 },
    // {
    //   fill: bgColors.primary,
    //   name: "Ordered",
    //   value: data?.units?.["400"] || 0,
    // },
  ];

  useEffect(() => {
    if (isVisivbleOrdered) {
      chartData.push({
        fill: bgColors.primary,
        name: "Ordered",
        value: data?.units?.["400"] || 0,
      });
    }
  }, [isVisivbleOrdered]);

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
      <ResponsiveContainer width="100%" height="80%">
        <PieChart width={480} height={480}>
          <Pie
            activeIndex={state.activeIndex}
            activeShape={(args: any) =>
              renderActiveShape({
                ...args,
                payload:
                  (data?.units?.["100"] || 0) +
                  (data?.units?.["200"] || 0) +
                  (data?.units?.["300"] || 0) +
                  (isVisivbleOrdered ? data?.units?.[400] || 0 : 0),
              })
            }
            data={chartData}
            cx="50%"
            cy="50%"
            innerRadius={60}
            outerRadius={80}
            // fill="#8884d8"
            dataKey="value"
            onMouseEnter={onPieEnter}
          />
          <Tooltip />
        </PieChart>
      </ResponsiveContainer>
    </Wrapper>
  );
};

export default ByAll;
