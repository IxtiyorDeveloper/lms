import * as React from "react";

function Icon(props: any) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={78}
      height={119}
      viewBox="0 0 78 119"
      fill="none"
      {...props}
    >
      <g opacity={0.15}>
        <rect
          x={-19}
          width={112}
          height={112}
          rx={7}
          transform="rotate(30 -19 0)"
          fill="url(#paint0_linear_13187_329165)"
        />
        <rect
          x={-50}
          y={14}
          width={112}
          height={112}
          rx={7}
          transform="rotate(30 -50 14)"
          fill="url(#paint1_linear_13187_329165)"
        />
      </g>
      <defs>
        <linearGradient
          id="paint0_linear_13187_329165"
          x1={-21.0544}
          y1={-0.550465}
          x2={97.8498}
          y2={114.398}
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#fff" />
          <stop offset={1} stopColor="#fff" stopOpacity={0} />
        </linearGradient>
        <linearGradient
          id="paint1_linear_13187_329165"
          x1={-52.0544}
          y1={13.4495}
          x2={66.8498}
          y2={128.398}
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#fff" />
          <stop offset={1} stopColor="#fff" stopOpacity={0} />
        </linearGradient>
      </defs>
    </svg>
  );
}

export default Icon;
