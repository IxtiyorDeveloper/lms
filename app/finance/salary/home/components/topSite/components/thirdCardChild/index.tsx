import React, { useState } from "react";
import { Wrapper } from "./style";
import { ISalaryTotal } from "../../type";

const ThirdCardChild = ({ total }: { total: ISalaryTotal }) => {
  const [active, setActive] = useState(0);

  const handleChange = (num: number) => {
    setActive(num);
  };

  return (
    <Wrapper>
      <ul>
        {total.card_3.penalty?.slice(0, 5)?.map((item, index) => {
          return (
            <li
              key={`${item?.num}_${index}`}
              onClick={() => handleChange(index)}
              className={active === index ? "active" : ""}
            >
              <span className="number">{index + 1}</span>
              <span className="text">{item?.role?.name}</span>
            </li>
          );
        })}
      </ul>
      <div className="count">
        <img src="/timer.svg" alt="timer" />
        <span className="number-count">
          {total.card_3.penalty?.[active]?.num}
        </span>
      </div>
    </Wrapper>
  );
};

export default ThirdCardChild;
