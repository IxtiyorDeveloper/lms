import React, { FC } from "react";
import { TableWrapper, MessageButtonWrapper } from "./style";
import { Button, MailSvg } from "components";
import { Empty } from "antd";

const TableSite: FC = () => {
  return (
    <TableWrapper>
      <MessageButtonWrapper>
        <Button style={{ padding: "12px 12px" }}>
          <MailSvg height={20} width={20} />
        </Button>
      </MessageButtonWrapper>
      <Empty />
    </TableWrapper>
  );
};

export default TableSite;
