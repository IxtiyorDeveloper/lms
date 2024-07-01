import * as React from "react";

function Icon(props: any) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={143}
      height={76}
      viewBox="0 0 143 76"
      fill="none"
      {...props}
    >
      <g opacity={0.7}>
        <rect
          opacity={0.4}
          x={101.615}
          y={13}
          width={158}
          height={158}
          rx={7}
          transform="rotate(75 101.615 13)"
          fill="url(#paint0_linear_13208_277920)"
        />
        <rect
          x={80.6172}
          width={158}
          height={158}
          rx={7}
          transform="rotate(75 80.617 0)"
          fill="url(#paint1_linear_13208_277920)"
        />
      </g>
      <defs>
        <linearGradient
          id="paint0_linear_13208_277920"
          x1={98.7171}
          y1={12.2235}
          x2={266.457}
          y2={174.382}
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#fff" />
          <stop offset={1} stopColor="#fff" />
        </linearGradient>
        <linearGradient
          id="paint1_linear_13208_277920"
          x1={77.719}
          y1={-0.776548}
          x2={245.459}
          y2={161.382}
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#FFED9E" />
          <stop offset={1} stopColor="#fff" />
        </linearGradient>
      </defs>
    </svg>
  );
}

export default Icon;
