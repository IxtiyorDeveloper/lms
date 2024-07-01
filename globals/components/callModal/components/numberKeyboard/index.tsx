import React, { FC, useEffect, useState } from "react";
import { Wrapper } from "./style";
import { BackSpaceSvg, CallSvg, NumberKeyboardSvg } from "components";
import { useDispatch } from "react-redux";
import { changeCallModalSize } from "store";
import { Action_Heights } from "../../index";

const numbers = [
  {
    value: "1",
    title: "1",
    desc: null,
  },
  {
    value: "2",
    title: "2",
    desc: "ABC",
  },
  {
    value: "3",
    title: "3",
    desc: "DEF",
  },
  {
    value: "4",
    title: "4",
    desc: "GHI",
  },
  {
    value: "5",
    title: "5",
    desc: "JKL",
  },
  {
    value: "6",
    title: "6",
    desc: "MNO",
  },
  {
    value: "7",
    title: "7",
    desc: "PQRS",
  },
  {
    value: "8",
    title: "8",
    desc: "TUV",
  },
  {
    value: "9",
    title: "9",
    desc: "WXYZ",
  },

  {
    value: null,
    title: "*",
    desc: null,
  },
  {
    value: "0",
    title: "0",
    desc: "+",
  },
  {
    value: null,
    title: "#",
    desc: null,
  },
];

interface IProps {
  onCallButtonPress: () => void;
  onClickNumber: (value: string) => void;
}

const NumberKeyboard: FC<IProps> = ({ onCallButtonPress, onClickNumber }) => {
  const dispatch = useDispatch();

  const [isCollapsed, setIsCollapsed] = useState(true);

  useEffect(() => {
    if (isCollapsed) {
      dispatch(changeCallModalSize({ height: Action_Heights.dialPadLittle }));
    } else {
      dispatch(changeCallModalSize({ height: Action_Heights.dialPad }));
    }
  }, [isCollapsed]);

  return (
    <Wrapper isCollapsed={isCollapsed}>
      {!isCollapsed &&
        numbers.map((r) => {
          return (
            <div
              className="item"
              onClick={() => !!r.value && onClickNumber(r.value)}
            >
              <div>{r.title}</div>
              <div className="desc"></div>
            </div>
          );
        })}
      <div className="center" onClick={() => setIsCollapsed(!isCollapsed)}>
        <NumberKeyboardSvg />
      </div>
      <div
        className="call"
        onClick={() => {
          onCallButtonPress();
        }}
      >
        <CallSvg />
      </div>
      <div className="center">
        <BackSpaceSvg />
      </div>
    </Wrapper>
  );
};

export default NumberKeyboard;
