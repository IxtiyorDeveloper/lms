import React, { useEffect, useState } from "react";
import { TableWrapper } from "../../style";
import { ISalaryMain } from "types/finance/salary";
import TableComponent from "./table";
import { Spin } from "antd";

const DepartmentDraw = ({
  sidebarItems,
  isLoading,
}: {
  sidebarItems: { children: ISalaryMain[] }[];
  isLoading?: boolean;
}) => {
  const [renderSecondPart, setRenderSecondPart] = useState(false);

  useEffect(() => {
    let animationFrameId: number;

    const animate = () => {
      if (!renderSecondPart && shouldRenderSecondPart()) {
        setRenderSecondPart(true);
      } else {
        animationFrameId = requestAnimationFrame(animate);
      }
    };

    const shouldRenderSecondPart = () => {
      const currentTime = performance.now();
      const elapsedTime = currentTime - startTime;
      return elapsedTime >= 1500; // 1.5 seconds delay
    };

    const startTime = performance.now();
    animationFrameId = requestAnimationFrame(animate);

    return () => cancelAnimationFrame(animationFrameId);
  }, [renderSecondPart]);

  return (
    <TableWrapper>
      {sidebarItems?.slice(0, 1)?.map((item, itemKey) => {
        return (
          <div id={`part-${itemKey}`} key={`part-${itemKey}`}>
            {item?.children
              .slice(0, 3)
              .map((tableData: ISalaryMain, assignmentIndex: number) => {
                const shift_id = tableData?.shift ? tableData?.shift?.id : 0;
                const part_id = `${tableData?.role?.id}_${shift_id}`;

                return (
                  <div
                    id={`part-${part_id}`}
                    key={`${itemKey}_${assignmentIndex}`}
                  >
                    <TableComponent
                      title={`Title ${itemKey}`}
                      count={itemKey}
                      index={`${itemKey}${assignmentIndex}`}
                      data={tableData}
                    />
                  </div>
                );
              })}
            <Spin spinning={isLoading}>
              {renderSecondPart &&
                item?.children
                  .slice(3)
                  .map((tableData: ISalaryMain, assignmentIndex: number) => {
                    const shift_id = tableData?.shift
                      ? tableData?.shift?.id
                      : 0;
                    const part_id = `${tableData?.role?.id}_${shift_id}`;

                    return (
                      <div
                        id={`part-${part_id}`}
                        key={`${itemKey}_${assignmentIndex}`}
                      >
                        <TableComponent
                          title={`Title ${itemKey}`}
                          count={itemKey}
                          index={`${itemKey}${assignmentIndex}`}
                          data={tableData}
                        />
                      </div>
                    );
                  })}
            </Spin>
          </div>
        );
      })}
      <Spin spinning={isLoading}>
        {renderSecondPart &&
          sidebarItems?.slice(1)?.map((item, key) => {
            return (
              <div id={`part-${key + 1}`} key={`part-${key}`}>
                {item?.children?.map(
                  (tableData: ISalaryMain, assignmentIndex: number) => {
                    const shift_id = tableData?.shift
                      ? tableData?.shift?.id
                      : 0;

                    const part_id = `${tableData?.role?.id}_${shift_id}`;

                    return (
                      <div id={`part-${part_id}`}>
                        <TableComponent
                          title={`Title ${key}`}
                          count={key}
                          index={`${key}${assignmentIndex}`}
                          key={`${key}_${assignmentIndex}`}
                          data={tableData}
                        />
                      </div>
                    );
                  },
                )}
              </div>
            );
          })}
      </Spin>
    </TableWrapper>
  );
};

export default DepartmentDraw;
