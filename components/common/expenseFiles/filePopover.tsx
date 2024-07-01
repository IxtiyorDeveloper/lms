import React from "react";
import { Wrapper } from "./style";
import { IExpenseFile } from "types/finance/transactionExpense";

const FilePopover = ({ expenseFiles }: { expenseFiles: IExpenseFile[] }) => {
  return (
    <Wrapper>
      <div className="container">
        {expenseFiles?.map((item, index) => {
          return (
            <div className="items" key={index}>
              <a href={item?.file?.full_url} target="_blank">
                {index + 1}. {item?.name}
              </a>
            </div>
          );
        })}
      </div>
    </Wrapper>
  );
};

export default FilePopover;
