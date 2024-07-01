import React, {
  CSSProperties,
  FC,
  ReactElement,
  useEffect,
  useState,
} from "react";
import {
  Badge,
  CollapseHeaderText,
  IconWrap,
  NestedItem,
  NestedWrapper,
  NoData,
  TemplateTextWrapper,
  Wrapper,
} from "./style";
import { Collapse, CollapseProps } from "antd";
import { ChevronDownSvg } from "@jasurbekyuldashov/lms-web-icons";
import { bgColors } from "styles/theme";
import { toCapitalize } from "utils/toCapitalize";
import { ISMSStatisticsPageData } from "types";
import { useRouter } from "next/router";

interface IProps {
  smsPageData?: ISMSStatisticsPageData[];
}

const panelStyle: React.CSSProperties = {
  marginBottom: 6,
  background: bgColors.white,
  borderRadius: 6,
  border: "none",
};

const TabSideComponent: FC<IProps> = (props) => {
  const { smsPageData } = props;
  const router = useRouter();

  const [templatesCount, setTemplatesCount] = useState<number>(0);

  useEffect(() => {
    let count = 0;
    smsPageData?.map((tempObj) => {
      count += tempObj.periodTemplates.length;
    });

    setTemplatesCount(count);
  }, [smsPageData]);

  const pageData = smsPageData?.map((res) => {
    const allTotal = res.periodTemplates.reduce(
      (acc, cer) => acc + +cer.count,
      0,
    );

    const todayTotal = res.todayTemplates.reduce(
      (acc, cer) => acc + +cer.count,
      0,
    );

    return {
      ...res,
      periodTemplates: res.periodTemplates.map((p) => {
        return {
          ...p,
          daily: res.todayTemplates.filter((t) => t.id === p.id)[0]?.count || 0,
        };
      }),
      overall: allTotal,
      daily: todayTotal,
    };
  });

  useEffect(() => {
    const templatesWithIndexes = pageData?.filter(
      (item: any) => item.periodTemplates.length > 0,
    );

    router
      .push(
        {
          query: {
            ...router.query,
            type: "100",
            template_id: templatesWithIndexes
              ? templatesWithIndexes[0]?.periodTemplates[0]?.id
              : 1,
          },
        },
        undefined,
        { scroll: false },
      )
      .then();
  }, [router.query?.type, router.query?.project]);

  const getNestedItems = (val: any): ReactElement => {
    const content = val.periodTemplates.map((res: any) => {
      return (
        <NestedItem
          key={res.id}
          className={router.query?.template_id === res.id ? "active" : ""}
          onClick={() => {
            router
              .push(
                {
                  query: {
                    ...router.query,
                    template_id: res.id,
                  },
                },
                undefined,
                { scroll: false },
              )
              .then();
          }}
        >
          <span>&#8226;</span>
          <p>{toCapitalize(res.name)}</p>
          <div className="stats">
            <p className="total">{res.count}</p>
            <p className="daily">+{res.daily}</p>
          </div>
        </NestedItem>
      );
    });
    return val.periodTemplates.length === 0 ? (
      <NoData>No Templates</NoData>
    ) : (
      <NestedWrapper>{content}</NestedWrapper>
    );
  };

  const getItems: (panelStyle: CSSProperties) => CollapseProps["items"] = (
    panelStyle,
  ) => {
    return pageData?.map((res, index) => {
      return {
        key: index + 1,
        label: (
          <CollapseHeaderText>
            {toCapitalize(res.label)}
            <div className="stats">
              <p className="total">{res.overall}</p>
              <p className="daily">+{res.daily}</p>
            </div>
          </CollapseHeaderText>
        ),
        children: getNestedItems(res),
        style: panelStyle,
      };
    });
  };

  return (
    <Wrapper>
      <TemplateTextWrapper>
        <p className="title">Auto SMS templates</p>
        <Badge>{templatesCount}</Badge>
      </TemplateTextWrapper>
      <Collapse
        accordion
        bordered={false}
        defaultActiveKey={["1"]}
        expandIcon={({ isActive }: any) => {
          return (
            <IconWrap
              style={{
                transform: isActive ? "rotate(0deg)" : "rotate(-90deg)",
              }}
            >
              <ChevronDownSvg width={20} height={20} />
            </IconWrap>
          );
        }}
        style={{ background: bgColors.whiteSmoke }}
        items={getItems(panelStyle)}
      />
    </Wrapper>
  );
};

export default TabSideComponent;
