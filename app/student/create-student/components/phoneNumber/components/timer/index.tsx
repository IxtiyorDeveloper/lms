import React, { useEffect, useState } from "react";
import { Progress } from "antd";
import { TTimer } from "./type";
import { Wrapper } from "./style";
import { ProgressProps } from "antd/es/progress/progress";

const Timer = ({
  defaultValue,
  total,
  interval,
  onComplete,
  onStarted,
  ...args
}: TTimer & ProgressProps) => {
  const [time, setTime] = useState(100);

  useEffect(() => {
    const a = (Date.now() - defaultValue) / 1000;
    setTime(100 - (a * 100) / total);
  }, []);

  useEffect(() => {
    const a = setInterval(() => {
      onStarted?.();
      setTime((prevState) => {
        if (prevState <= 0) {
          clearInterval(a);
          onComplete();
        }
        return prevState - 1;
      });
    }, interval);
    return () => clearInterval(a);
  }, []);

  return (
    <Wrapper>
      <Progress
        type="circle"
        percent={time}
        width={37}
        format={(percent) =>
          `${percent && Math.round((percent * total) / 100)}`
        }
        gapPosition="bottom"
        {...args}
      />
    </Wrapper>
  );
};

export default Timer;
