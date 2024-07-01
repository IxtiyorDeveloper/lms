// import React, { FC, ReactElement, ReactNode, useEffect } from "react";
// import {
//   BarChart,
//   Bar,
//   Rectangle,
//   XAxis,
//   YAxis,
//   CartesianGrid,
//   Tooltip,
//   ResponsiveContainer,
//   Brush,
// } from "recharts";
// import { bgColors } from "styles/theme";
// import { Wrapper } from "./style";
// import { TooltipProps } from "recharts/types/component/Tooltip";
// import { DataFormatter } from "utils/chartNumberFormatter";
//
// interface IProps {
//   name1: string;
//   name2: string;
//   xAxisName: string;
//   customTooltip?: ReactElement | ((props: TooltipProps<any, any>) => ReactNode);
//   data: any[];
//   color1?: string;
//   color2?: string;
//   xAxisVertical?: boolean;
// }
//
// const DoubleChart: FC<IProps> = ({
//   name1,
//   name2,
//   xAxisVertical = false,
//   color1,
//   color2,
//   xAxisName,
//   data,
//   customTooltip,
// }) => {
//   const brush = document.getElementsByClassName("recharts-brush")?.[0];
//   const d = document.getElementsByClassName("recharts-brush-slide")?.[0];
//   const e = document.getElementsByClassName(
//     "recharts-layer recharts-brush-traveller",
//   )?.[0];
//
//   useEffect(() => {
//     if (d) {
//       d.setAttribute("fill-opacity", "1");
//       d.setAttribute("fill", bgColors.primary);
//       // d.setAttribute("width", "200");
//       d.setAttribute("x", "55");
//
//       const rect = brush.getElementsByTagName("rect")?.[0];
//
//       if (rect) {
//         rect.setAttribute("stroke", bgColors.whiteSmoke);
//         rect.setAttribute("strokeWidth", "1px");
//         rect.setAttribute("fill", bgColors.whiteSmoke);
//         rect.setAttribute("radius", "20px");
//       }
//     }
//   }, [d, e]);
//
//   return (
//     <Wrapper>
//       <ResponsiveContainer
//         width="100%"
//         height={400}
//         style={{ marginTop: "16px" }}
//       >
//         <BarChart
//           data={data}
//           margin={{
//             top: 0,
//             right: 30,
//             left: 10,
//             bottom: 0,
//           }}
//           barSize={16}
//           barGap={2}
//         >
//           <CartesianGrid
//             vertical={false}
//             strokeDasharray="4 4"
//             stroke={bgColors.purpleCrystal}
//           />
//           {xAxisVertical ? (
//             <XAxis
//               strokeWidth={0}
//               dataKey={xAxisName}
//               tick={(e) => {
//                 const { x, y, payload } = e;
//
//                 return (
//                   <g transform={`translate(${x},${y})`}>
//                     <text
//                       x={0}
//                       y={0}
//                       dy={16}
//                       textAnchor="end"
//                       fill="#666"
//                       transform="rotate(-35)"
//                     >
//                       {payload.value}
//                     </text>
//                   </g>
//                 );
//               }}
//             />
//           ) : (
//             <XAxis strokeWidth={0} dataKey={xAxisName} />
//           )}
//           <YAxis
//             strokeWidth={0}
//             minTickGap={20}
//             padding={{ top: 10 }}
//             color={bgColors.sadet}
//             tickFormatter={DataFormatter}
//             orientation="left"
//             domain={["dataMin", "dataMax"]}
//           />
//           <Tooltip
//             cursor={{ fill: bgColors.cascading }}
//             content={customTooltip}
//           />
//           <Bar
//             radius={4}
//             dataKey={name1}
//             fill={color1 || bgColors.primary}
//             width={16}
//             activeBar={<Rectangle fill={color1 || "rgb(201, 163, 0)"} />}
//           />
//           <Bar
//             radius={4}
//             dataKey={name2}
//             fill={color2 || bgColors.midori}
//             width={16}
//             activeBar={<Rectangle fill={color2 || "rgb(68, 178, 107)"} />}
//           />
//           {/*<Legend />*/}
//           {data?.length > 0 && (
//             <Brush
//               height={16}
//               y={xAxisVertical ? 230 : undefined}
//               strokeWidth={0}
//               startIndex={0}
//               endIndex={data?.length > 60 ? 60 : data?.length - 1}
//               floodColor="red"
//               colorInterpolation="red"
//               colorProfile="red"
//               colorRendering="red"
//               lightingColor="red"
//               dataKey="asdasd"
//             />
//           )}
//         </BarChart>
//       </ResponsiveContainer>
//     </Wrapper>
//   );
// };
// export default DoubleChart;

import React, { FC, ReactElement, ReactNode, useEffect } from "react";
import {
  BarChart,
  Bar,
  Rectangle,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Brush,
} from "recharts";
import { bgColors } from "styles/theme";
import { Wrapper } from "./style";
import { TooltipProps } from "recharts/types/component/Tooltip";
import { DataFormatter } from "utils/chartNumberFormatter";

interface IProps {
  name1: string;
  name2: string;
  name2Part1: string;
  name2Part2: string;
  xAxisName: string;
  customTooltip?: ReactElement | ((props: TooltipProps<any, any>) => ReactNode);
  data: any[];
  color1?: string;
  color2?: string;
  color2Part1?: string;
  color2Part2?: string;
  xAxisVertical?: boolean;
}

const DoubleChart: FC<IProps> = ({
  name1,
  name2,
  name2Part1,
  name2Part2,
  xAxisVertical = false,
  color1,
  color2,
  color2Part1,
  color2Part2,
  xAxisName,
  data,
  customTooltip,
}) => {
  const brush = document.getElementsByClassName("recharts-brush")?.[0];
  const d = document.getElementsByClassName("recharts-brush-slide")?.[0];
  const e = document.getElementsByClassName(
    "recharts-layer recharts-brush-traveller",
  )?.[0];

  useEffect(() => {
    if (d) {
      d.setAttribute("fill-opacity", "1");
      d.setAttribute("fill", bgColors.primary);
      d.setAttribute("x", "55");

      const rect = brush.getElementsByTagName("rect")?.[0];

      if (rect) {
        rect.setAttribute("stroke", bgColors.whiteSmoke);
        rect.setAttribute("strokeWidth", "1px");
        rect.setAttribute("fill", bgColors.whiteSmoke);
        rect.setAttribute("radius", "20px");
      }
    }
  }, [d, e]);

  return (
    <Wrapper>
      <ResponsiveContainer
        width="100%"
        height={400}
        style={{ marginTop: "16px" }}
      >
        <BarChart
          data={data}
          margin={{
            top: 0,
            right: 30,
            left: 10,
            bottom: 0,
          }}
          barSize={16}
          barGap={2}
        >
          <CartesianGrid
            vertical={false}
            strokeDasharray="4 4"
            stroke={bgColors.purpleCrystal}
          />
          {xAxisVertical ? (
            <XAxis
              strokeWidth={0}
              dataKey={xAxisName}
              tick={(e) => {
                const { x, y, payload } = e;

                return (
                  <g transform={`translate(${x},${y})`}>
                    <text
                      x={0}
                      y={0}
                      dy={16}
                      textAnchor="end"
                      fill="#666"
                      transform="rotate(-35)"
                    >
                      {payload.value}
                    </text>
                  </g>
                );
              }}
            />
          ) : (
            <XAxis strokeWidth={0} dataKey={xAxisName} />
          )}
          <YAxis
            strokeWidth={0}
            minTickGap={20}
            padding={{ top: 10 }}
            color={bgColors.sadet}
            tickFormatter={DataFormatter}
            orientation="left"
            domain={["dataMin", "dataMax"]}
          />
          <Tooltip
            cursor={{ fill: bgColors.cascading }}
            content={customTooltip}
          />
          <Bar
            radius={4}
            dataKey={name1}
            fill={color1 || bgColors.primary}
            width={16}
            activeBar={<Rectangle fill={color1 || "rgb(201, 163, 0)"} />}
          />
          <Bar
            dataKey={name2Part1}
            fill={color2Part1 || color2 || bgColors.midori}
            width={16}
            stackId="a"
            activeBar={<Rectangle fill={color2Part1} />}
          />
          <Bar
            dataKey={name2Part2}
            fill={color2Part2 || color2}
            width={16}
            stackId="a"
            activeBar={<Rectangle fill={color2Part2} />}
          />
          {data?.length > 0 && (
            <Brush
              height={16}
              y={xAxisVertical ? 230 : undefined}
              strokeWidth={0}
              startIndex={0}
              endIndex={data?.length > 60 ? 60 : data?.length - 1}
            />
          )}
        </BarChart>
      </ResponsiveContainer>
    </Wrapper>
  );
};
export default DoubleChart;
