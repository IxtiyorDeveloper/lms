import React from "react";

const Blur = () => {
  return (
    <svg
      width="146"
      height="138"
      viewBox="0 0 146 138"
      fill="none"
      xmlns="http://www.w3.org/2000/svg">
      <g filter="url(#filter0_f_14629_38897)">
        <circle cx="73" cy="65" r="13" fill="#FA791D" />
      </g>
      <defs>
        <filter
          id="filter0_f_14629_38897"
          x="0"
          y="-8"
          width="146"
          height="146"
          filterUnits="userSpaceOnUse"
          color-interpolation-filters="sRGB">
          <feFlood flood-opacity="0" result="BackgroundImageFix" />
          <feBlend
            mode="normal"
            in="SourceGraphic"
            in2="BackgroundImageFix"
            result="shape"
          />
          <feGaussianBlur
            stdDeviation="30"
            result="effect1_foregroundBlur_14629_38897"
          />
        </filter>
      </defs>
    </svg>
  );
};

export default Blur;
