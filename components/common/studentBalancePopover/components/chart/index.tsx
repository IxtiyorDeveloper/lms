import React, { PureComponent } from "react";
import { PieChart, Pie, ResponsiveContainer, Cell } from "recharts";
import { bgColors } from "styles/theme";
import { WalletSvg } from "@jasurbekyuldashov/lms-web-icons";
import { Wrapper } from "./style";

export default class Chart extends PureComponent<{
  sum: { [x: string]: number };
}> {
  data = [
    { name: "green", value: this.props.sum?.green, color: bgColors.midori },
    {
      name: "yellow",
      value: this.props.sum?.yellow,
      color: bgColors.primary,
    },
    { name: "red", value: this.props.sum?.red, color: bgColors.pop },
  ];
  render() {
    return (
      <Wrapper>
        <ResponsiveContainer width={52} height={52}>
          <PieChart width={42} height={42}>
            <Pie
              data={this.data}
              cx="50%"
              cy="50%"
              innerRadius={21}
              outerRadius={25}
              dataKey="value"
            >
              {this.data.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.color} />
              ))}
            </Pie>
          </PieChart>
        </ResponsiveContainer>
        <div className="wallet">
          <WalletSvg color={bgColors.white} />
        </div>
      </Wrapper>
    );
  }
}
