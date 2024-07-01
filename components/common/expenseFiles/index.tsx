import React from "react";
import { Popover } from "antd";
import { AttachmentSvg } from "components";
import { Container, Flex } from "./style";
import { IExpenseFile } from "types/finance/transactionExpense";
import FilePopover from "./filePopover";

const ExpenseFiles = ({
  expenseFiles,
}: {
  expenseFiles: IExpenseFile[];
  class?: string;
}) => {
  return (
    <Container>
      {expenseFiles?.length > 0 ? (
        <Popover
          destroyTooltipOnHide
          content={() => FilePopover({ expenseFiles })}
        >
          <Flex>
            <AttachmentSvg />
            <p>
              {expenseFiles?.length || 0}{" "}
              {expenseFiles?.length > 1 ? "Files" : "File"}
            </p>
          </Flex>
        </Popover>
      ) : (
        "No files"
      )}
    </Container>
  );
};

export default ExpenseFiles;
