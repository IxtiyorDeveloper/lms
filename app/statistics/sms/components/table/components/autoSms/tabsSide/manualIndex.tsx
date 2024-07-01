import React, { FC, useEffect } from "react";
import {
  Badge,
  NestedItem,
  NestedWrapper,
  TemplateTextWrapper,
  Wrapper,
} from "./style";
import { toCapitalize } from "utils/toCapitalize";
import { ISMSStatisticsPageDataTypeManual } from "types";
import { useRouter } from "next/router";

interface IProps {
  smsPageData?: ISMSStatisticsPageDataTypeManual;
}

const ManualTabSideComponent: FC<IProps> = (props) => {
  const { smsPageData } = props;
  const router = useRouter();

  useEffect(() => {
    router
      .push(
        {
          query: {
            ...router.query,
            type: "200",
            template_id: smsPageData?.period[0].id,
          },
        },
        undefined,
        { scroll: false },
      )
      .then();
  }, [router.query?.type, router.query?.project, smsPageData?.period]);

  return (
    <Wrapper>
      <TemplateTextWrapper>
        <p className="title">Manual SMS templates</p>
        <Badge>{smsPageData?.period?.length}</Badge>
      </TemplateTextWrapper>
      <NestedWrapper>
        {smsPageData?.period?.map((res, index) => {
          const today = smsPageData?.today?.filter((t) => t.id == res.id);

          return (
            <NestedItem
              key={index}
              className={router.query?.template_id == res.id ? "active" : ""}
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
              <p>{toCapitalize(res.name.split("_").join(" "))}</p>
              <div className="stats">
                <p className="total">{res.count}</p>
                <p className="daily">
                  +{today.length === 0 ? 0 : today[0].count}
                </p>
              </div>
            </NestedItem>
          );
        })}
      </NestedWrapper>
    </Wrapper>
  );
};

export default ManualTabSideComponent;
