import React, { FC, useMemo } from "react";
import { RoundedTab } from "components";
import { bgColors, textColors } from "styles/theme";
import { HexToRgbA } from "utils/hexToRgba";
import { Content, Leads, Wrapper } from "./style";
import { IStyles } from "components/common/roundedTab/type";
import { toggleModal } from "store";
import { useDispatch } from "react-redux";
import { IDocumentsCategory, IFetchList } from "types";
import { Badge, Spin } from "antd";

const allStyles: IStyles = {
  bgColor: bgColors.hat,
  boxShadow: "0 2px 20px rgba(0, 0, 0, 0.2)",
};

interface IProps {
  categories?: IFetchList<IDocumentsCategory>;
  loading?: boolean;
}

const DocumentTabs: FC<IProps> = ({ categories, loading }) => {
  const dispatch = useDispatch();
  const extraTabs = useMemo(() => {
    return loading
      ? []
      : !categories?.list
      ? []
      : categories?.list.map((tab) => {
          return {
            title: (isActive: boolean) => (
              <Leads
                style={{
                  backgroundColor: isActive
                    ? tab.color ?? bgColors.primary
                    : HexToRgbA(tab.color ?? bgColors.primary, 0.7),
                  color: textColors.blueGray,
                }}
              >
                {tab.name}
                <Badge count={tab?.fileCount || 0} showZero />
              </Leads>
            ),
            children: null,
            query: {
              page: 1,
              pageSize: 20,
              category_id: tab.id,
            },
            isHaveDelete: (tab?.fileCount || 0) == 0,
            // isHaveUpdate: (tab?.fileCount || 0) == 0,
            isHaveUpdate: true,
            onPressDelete: () => {
              dispatch(
                toggleModal({
                  key: "deleteDocumentTab",
                  data: {
                    data: {
                      id: tab?.id,
                    },
                    open: true,
                  },
                })
              );
            },
            onPressUpdate: () => {
              dispatch(
                toggleModal({
                  key: "addDocumentTab",
                  data: {
                    data: {
                      id: tab?.id,
                      type: "update",
                      data: tab,
                    },
                    open: true,
                  },
                })
              );
            },
          };
        });
  }, [categories]);

  return (
    <Spin spinning={loading}>
      <Wrapper>
        <Content>
          <RoundedTab
            tabs={extraTabs}
            containerStyle={{ backgroundColor: bgColors.hat }}
            allStyles={allStyles}
            isAdd
            handleClick={() =>
              dispatch(
                toggleModal({
                  key: "addDocumentTab",
                  data: {
                    data: {},
                    open: true,
                  },
                })
              )
            }
            tabName="roundedTabIndex"
          />
        </Content>
      </Wrapper>
    </Spin>
  );
};

export default DocumentTabs;
