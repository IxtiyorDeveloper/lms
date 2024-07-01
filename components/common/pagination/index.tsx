import React from "react";
import { Space } from "antd";
import { StyledPagination } from "./style";
import { useRouter } from "next/router";
import { MyPaginationProps } from "./type";
import PageSizeSelector from "./pageSizeSelector";

const MyPagination: React.FC<MyPaginationProps> = (props) => {
  const router = useRouter();
  const { pathname, query } = router;
  const { showSizeChanger: showSizeChangerProp, showTotal, total } = props;

  const showSizeChanger = showSizeChangerProp ?? (total ?? 0) >= 20;

  return (
    <StyledPagination
      {...props}
      pageSize={props.pageSize}
      current={props.current}
      total={props.total}
      showTotal={(total, range) => {
        return (
          <Space>
            {showTotal?.(total, range)}
            {showSizeChanger && <PageSizeSelector {...props} />}
          </Space>
        );
      }}
      showSizeChanger={false}
      onChange={(page, pageSize) => {
        router.replace(
          {
            pathname,
            query: { ...query, page, pageSize },
          },
          undefined,
          { scroll: false }
        );
      }}
    />
  );
};

export default MyPagination;
