import React, { FC, Fragment, PureComponent } from "react";

import { ArsStudentData } from "types/student";
import { VocabCard } from "../../style";
import { Cell, Pie, PieChart, ResponsiveContainer, Sector } from "recharts";
import { TopicSvg } from "components";
import { bgColors, fontSizes } from "styles/theme";

interface IProps {
  data?: ArsStudentData;
}

const SvgComponent = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="91"
    height="19"
    viewBox="0 0 91 19"
    fill="none"
  >
    <path
      d="M1.82528 -33.8413C-4.90253 -51.9709 20.0198 -53.8162 38.0054 -48.342C48.4992 -45.5268 55.3907 -54.2821 68.3904 -50.788C81.3902 -47.2938 65.8062 -36.2872 85.6974 -30.6383C105.589 -24.9895 95.8779 0.284889 78.4927 0.576069C61.1074 0.867249 65.8845 5.11848 48.4992 14.8439C31.114 24.5693 1.82532 11.0585 9.10832 -3.20926C16.3913 -17.4771 9.10824 -14.2158 1.82528 -33.8413Z"
      stroke="white"
      strokeOpacity="0.2"
      strokeWidth="0.5"
    />
    <path
      d="M5.22543 -32.6476C-0.961322 -49.286 22.0259 -51.2168 38.6422 -46.1322C48.4254 -43.4739 54.9382 -51.5 66.92 -48.2794C79.169 -44.9868 64.8431 -34.9193 83.1188 -29.646C101.436 -24.3428 92.7202 -0.926525 76.3763 -0.661816C60.1282 -0.397106 64.6036 3.62778 48.4668 12.54C32.33 21.4522 5.32748 9.04896 11.9484 -4.23975C18.5693 -17.3299 11.9638 -14.5448 5.22543 -32.6476Z"
      stroke="white"
      strokeOpacity="0.2"
      strokeWidth="0.5"
    />
    <path
      d="M8.62658 -31.4538C2.98087 -46.601 24.0329 -48.6173 39.28 -43.9223C48.3526 -41.421 54.4868 -48.7179 65.4504 -45.7708C76.9488 -42.6797 63.8811 -33.5513 80.5411 -28.6536C97.2847 -23.6961 89.5634 -2.13789 74.2609 -1.89965C59.1499 -1.66142 63.3237 2.13713 48.4354 10.2362C33.5471 18.3352 8.83063 7.03944 14.7895 -5.27018C20.7483 -17.1827 14.8204 -14.8737 8.62658 -31.4538Z"
      stroke="white"
      strokeOpacity="0.2"
      strokeWidth="0.5"
    />
    <path
      d="M12.0307 -30.26C6.92602 -43.916 26.043 -46.0178 39.9208 -41.7124C48.2828 -39.368 54.0383 -45.9358 63.9839 -43.2622C74.7315 -40.3725 62.922 -32.1833 77.9664 -27.6612C93.1362 -23.0493 86.4096 -3.34919 72.1485 -3.13743C58.1746 -2.92566 62.0467 0.646553 48.4069 7.93243C34.7671 15.2183 12.3367 5.02998 17.6335 -6.30055C22.9302 -17.0354 17.68 -15.2025 12.0307 -30.26Z"
      stroke="white"
      strokeOpacity="0.2"
      strokeWidth="0.5"
    />
    <path
      d="M15.4309 -29.0582C10.8673 -41.2231 28.0491 -43.4104 40.5576 -39.4945C48.2091 -37.3071 53.5859 -43.1457 62.5134 -40.7456C72.5103 -38.0575 61.959 -30.8074 75.3878 -26.6608C88.9838 -22.3946 83.2519 -4.55261 70.0322 -4.36731C57.1954 -4.18201 60.7659 -0.83614 48.3746 5.63656C35.9832 12.1093 15.839 3.02841 20.4736 -7.32303C25.1082 -16.8802 20.5357 -15.5235 15.4309 -29.0582Z"
      stroke="white"
      strokeOpacity="0.2"
      strokeWidth="0.5"
    />
    <path
      d="M18.8321 -27.8038C14.8096 -38.4775 30.0562 -40.7502 41.1955 -37.224C48.1363 -35.1935 53.1345 -40.3029 61.044 -38.1764C70.2902 -35.6897 60.997 -29.3787 72.8102 -25.6077C84.8325 -21.6872 80.0952 -5.70329 67.9169 -5.54447C56.2172 -5.38564 59.4861 -2.26611 48.3433 3.39342C37.2004 9.05296 19.3422 1.07957 23.3147 -8.29278C27.2873 -16.6723 23.3923 -15.7917 18.8321 -27.8038Z"
      stroke="white"
      strokeOpacity="0.2"
      strokeWidth="0.5"
    />
    <path
      d="M22.2324 -26.4855C18.7509 -35.6681 32.0625 -38.0263 41.8325 -34.8896C48.0627 -33.0161 52.6822 -37.3963 59.5737 -35.5434C68.0691 -33.2582 60.0341 -27.8863 70.2318 -24.4909C80.6802 -20.916 76.9376 -6.79021 65.8007 -6.65786C55.2381 -6.5255 58.2054 -3.6323 48.311 1.21406C38.4166 6.06042 22.8445 -0.805496 26.155 -9.19877C29.4654 -16.4006 26.2481 -15.9962 22.2324 -26.4855Z"
      stroke="white"
      strokeOpacity="0.2"
      strokeWidth="0.5"
    />
    <path
      d="M25.6338 -25.1477C22.6934 -32.8391 34.0698 -35.2828 42.4705 -32.5357C47.9901 -30.8191 52.231 -34.4701 58.1044 -32.8907C65.8491 -30.807 59.0723 -26.3742 67.6543 -23.3544C76.5289 -20.1252 73.781 -7.8575 63.6855 -7.75162C54.26 -7.64573 56.9257 -4.97888 48.2798 -0.945686C39.6339 3.08751 26.3479 -2.67094 28.9963 -10.0851C31.6446 -16.1093 29.1049 -16.181 25.6338 -25.1477Z"
      stroke="white"
      strokeOpacity="0.2"
      strokeWidth="0.5"
    />
  </svg>
);

const LineCharts: FC<IProps> = ({ data }) => {
  return (
    <Fragment>
      <div className="chart">
        <Chart
          total={data?.passed_words_count! + data?.failed_words_count! || 0}
          dataChart={[
            {
              name: "failed",
              value: data?.failed_words_count,
              color: "#FF5247",
            },
            {
              name: "total",
              value: data?.passed_words_count! + data?.failed_words_count! || 0,
              color: bgColors.success,
            },
          ]}
        />
        <div className="right">
          <VocabCard color="#DC6361">
            <div className="flex">
              <div>
                <TopicSvg />
              </div>
              <div className="svg">
                <SvgComponent />
              </div>
            </div>
            <div className="flex">
              <div>Repeat</div>
              <div>{data?.failed_words_count} words</div>
            </div>
          </VocabCard>
          <VocabCard color="#45B26B">
            <div className="flex">
              <div>
                <TopicSvg color="#45B26B" />
              </div>
              <div className="svg">
                <SvgComponent />
              </div>
            </div>
            <div className="flex">
              <div>My vocabulary</div>
              <div>{data?.passed_words_count} words</div>
            </div>
          </VocabCard>
          <VocabCard color="#6084FF">
            <div className="flex">
              <div>
                <TopicSvg color="#6084FF" />
              </div>
              <div className="svg">
                <SvgComponent />
              </div>
            </div>
            <div className="flex">
              <div>Pocket</div>
              <div>{data?.added_words_count} words</div>
            </div>
          </VocabCard>
        </div>
      </div>
    </Fragment>
  );
};

export default LineCharts;

const renderActiveShape = (props: any, total: number) => {
  const { cx, cy, innerRadius, outerRadius, startAngle, endAngle, fill } =
    props;

  return (
    <g>
      <text
        x={cx}
        y={cy}
        dy={-6}
        textAnchor="middle"
        fill={bgColors.sceptreBlue}
        style={{
          fontFamily: "Manrope",
          fontSize: fontSizes.f16,
          fontWeight: "800",
          lineHeight: "0.6",
          letterSpacing: "-0.163px",
        }}
      >
        {total}
      </text>
      <text
        x={cx}
        y={cy}
        dy={16}
        textAnchor="middle"
        fill={bgColors.soulfulBlue}
        style={{
          fontSize: "14px",
          fontWeight: "500",
          lineHeight: "0.66",
          letterSpacing: "-0.147px",
        }}
      >
        Total words
      </text>
      <Sector
        cx={cx}
        cy={cy}
        innerRadius={innerRadius}
        outerRadius={outerRadius}
        startAngle={startAngle - 2}
        endAngle={endAngle}
        fill={fill}
      />
    </g>
  );
};

class Chart extends PureComponent {
  state = {
    activeIndex: 0,
  };
  props: { total: number; dataChart: { [key: string]: any }[] } = {
    total: 0,
    dataChart: [],
  };

  onPieEnter = (_: any, index: number) => {
    this.setState({
      activeIndex: index,
    });
  };

  render() {
    return (
      <ResponsiveContainer width="100%" height="100%">
        <PieChart width={400} height={400}>
          <Pie
            data={this.props.dataChart}
            cx="50%"
            cy="50%"
            innerRadius={82}
            outerRadius={100}
            dataKey="value"
            activeShape={(props: any) =>
              renderActiveShape(props, this.props.total)
            }
            fill="#8884d8"
            activeIndex={this.state.activeIndex}
            onMouseEnter={this.onPieEnter}
          >
            {this.props.dataChart.map((entry: any, index: number) => (
              <Cell key={`cell-${index}`} fill={entry.color} />
            ))}
          </Pie>
        </PieChart>
      </ResponsiveContainer>
    );
  }
}
