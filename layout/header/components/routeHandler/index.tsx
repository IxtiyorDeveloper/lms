import React, { useMemo } from "react";
import { HeaderTitle } from "../../style";
import { useRouter } from "next/router";
import { urlToJson } from "utils/functions/urlToJson";
import { ChevronRightSvg } from "components";
import { routeMenu } from "constants/menuList";
import { useFolder, useRouteParams } from "hooks";
import { bgColors } from "styles/theme";
import { Spin } from "antd";
import { PROJECT_LMS } from "../../../../constants";

interface IUrls {
  url?: string;
  key?: string;
}

const RouteHandler = () => {
  const router = useRouter();

  const additionalQueryParams = {
    "/settings/staff-settings": {
      roundedTabIndex: 1,
    },
  };

  const result: IUrls[] = useMemo(() => urlToJson(router.pathname), [router]);
  const { page, pageSize, ...rest } = router.query;

  const get = useFolder({
    onSuccess: (data) => {
      router.push({
        pathname: data.originalUrl,
        query: {
          ...rest,
          ...additionalQueryParams[
            data.originalUrl as keyof typeof additionalQueryParams
          ],
        },
      });
    },
    onError: () => {},
  });

  const object = useMemo(() => {
    return result
      .filter((e) => !!e.key)
      .map((e) => {
        return {
          [e?.key as string]: router.query?.[e?.key as string],
        };
      });
  }, [result]);
  const isStock = router.pathname.startsWith("/stock");
  const { data } = useRouteParams({
    project: isStock ? "stock" : PROJECT_LMS,
    action: isStock ? "page_data_route_params" : "admin_tools_route_params",
    query_params: Object.assign({}, ...object),
  });

  const onClickRoute = (index: number) => {
    let url = "";
    let originalUrl = "";

    for (let i = 0; i < index + 1; i++) {
      originalUrl +=
        "/" +
        (result[i].url ? result[i].url : router.query?.[result[i].key as any]);
      url += "/" + (result[i].url ? result[i].url : `[${result[i].key}]`);
    }
    get.mutate({
      url,
      originalUrl,
    });
  };

  return (
    <Spin spinning={get.isLoading}>
      <HeaderTitle>
        <div className="container">
          {result.map((e, index) => {
            const isLast = index + 1 === result.length;
            const Svg = routeMenu?.[e.url as keyof typeof routeMenu];
            let str = e.url || "";
            str = str.charAt(0).toUpperCase() + str.slice(1); // Capitalize first letter
            str = str.replace(/[^\w\s]/g, " ");
            if (str === "Kpi" || str === "Hr") str = str.toUpperCase();
            if (str === "Create student" && router.query.type === "update") {
              str = "Update student";
            }
            if (str === "Cycle action") {
              if (!!router.query.id) {
                if (router.query.type == "100") {
                  str = "Update internal cycle";
                } else {
                  str = "Update external cycle";
                }
              } else {
                if (router.query.type == "100") {
                  str = "Create internal cycle";
                } else {
                  str = "Create external cycle";
                }
              }
            }
            return (
              <div
                onClick={() => onClickRoute(index)}
                key={index}
                className={isLast ? "first" : ""}
              >
                {e.url && !!Svg ? (
                  <div>
                    <div className="arrow">
                      <Svg width={16} height={16} color={bgColors.yourShadow} />
                    </div>
                    {str}
                  </div>
                ) : (
                  str
                )}
                {e.key && data?.[e.key] !== "" ? data?.[e.key] || e.key : ""}
                {!isLast && (
                  <div className="arrow">
                    <ChevronRightSvg width={10} height={10} />
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </HeaderTitle>
    </Spin>
  );
};
export default RouteHandler;
