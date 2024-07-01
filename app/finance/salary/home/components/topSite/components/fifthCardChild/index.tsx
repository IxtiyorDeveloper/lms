import React from "react";
import { Wrapper } from "./style";
import { InputNumber } from "components";
import { useForm } from "react-hook-form";
import { toCurrencyFormat } from "utils/toCurrencyFormat";
import { ISalaryTotal } from "../../type";

const FifthCardChild = ({ total }: { total: ISalaryTotal }) => {
  const { control, watch } = useForm();

  return (
    <Wrapper>
      <form>
        <img src="/money-bundle-stack (1).png" className="img" alt="money" />
        <div className="input">
          <InputNumber
            control={control}
            name="number"
            placeholder="0"
            suffix={<p className="suffix">UZS</p>}
          />
        </div>
        <div className="price">
          <p className="grotesk">
            {toCurrencyFormat(total.card_5.total_cash - (watch("number") || 0))}
          </p>
        </div>
      </form>
    </Wrapper>
  );
};

export default FifthCardChild;
