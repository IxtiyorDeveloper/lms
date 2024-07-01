import React from "react";
import { useRouter } from "next/router";
import { MiddleSelect } from "./middleSelect";
import { MyPaginationProps } from "./type";
const PageSizeSelector: React.FC<MyPaginationProps> = (props) => {
  const router = useRouter();
  const { pathname, query } = router;

  const {
    pageSizeOptions,
    defaultPageSize = +(router.query.pageSize || props.pageSize || 20),
    total,
  } = props;

  const handleChangePageSize = (value: number) => {
    let currentPage;
    if (+(props.current || 0) > +(total || 0) / value) {
      currentPage = Math.ceil(+(total || 0) / value);
    } else {
      currentPage = props.current;
    }
    router.replace(
      {
        pathname,
        query: { ...query, pageSize: value, page: currentPage },
      },
      undefined,
      { scroll: false }
    );
  };

  const options = (pageSizeOptions || [20, 40, 60, 80, 100]).map((item) => ({
    label: `${item}`,
    value: item,
  }));

  return (
    <div className="selectContainer">
      <p className="info">
        {props.current} of {props.pageCount} | Rows per page
      </p>
      <MiddleSelect
        options={options}
        defaultValue={defaultPageSize}
        style={{ minWidth: 50 }}
        onChange={(value: number) => handleChangePageSize(value)}
        value={props.pageSize}
      />
    </div>
  );
};

export default PageSizeSelector;
