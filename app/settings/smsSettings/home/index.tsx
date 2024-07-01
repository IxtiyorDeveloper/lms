import React, { FC, useEffect, useMemo, useState } from "react";
import { Wrapper, Background, PaddingWrapper } from "./style";
import { Button, ComplexThinTab, SettingsSvg, StopSvg } from "components";
import ChildComponent from "./components/childWrapper";
import { useRouter } from "next/router";
import { useCronSms } from "hooks";
import { bgColors, textColors } from "styles/theme";
import Integration from "./components/integrationModal";
import { useDispatch } from "react-redux";
import { toggleModal } from "store";

const SmsPage: FC = () => {
  const dispatch = useDispatch();
  const [menu, setMenu] = useState<any[]>([]);
  const router = useRouter();
  const { isLoading, data, isRefetching } = useCronSms({
    query_params: {
      project: router.query?.tabKey || "LMS",
    },
  });

  useEffect(() => {
    if (!!data) {
      const menus = data?.projects.map((a, index) => {
        index += 1;
        return {
          label: a,
          icon: "",
          children: <></>,
          query: {
            tabIndex: index,
            tabKey: a,
          },
          isClickable: true,
        };
      });
      menus && setMenu(menus);
    }
  }, [isRefetching, data?.crons]);

  const initValue = useMemo(() => {
    return !!router.query.tabIndex
      ? {
          tabIndex: Number(router.query.tabIndex),
          tabKey: menu?.[Number(router.query.tabIndex)]?.query?.tabKey,
        }
      : menu.length > 0
        ? {
            tabIndex: 0,
            tabKey: menu?.[0]?.query?.tabKey,
          }
        : null;
  }, [menu, router.query?.tabIndex]);

  return (
    <Wrapper>
      <Background>
        <PaddingWrapper>
          {initValue && (
            <ComplexThinTab
              topLeftChildren={
                <div className="page-routers">
                  <Button
                    style={{ height: "32px", gap: "7px" }}
                    icon={<SettingsSvg />}
                    text="Integration"
                    bgColor={bgColors.wildSand}
                    textStyle={{
                      color: textColors.yourShadow,
                      fontWeight: "600",
                      fontSize: "12px",
                      lineHeight: "20px",
                      letterSpacing: "-0.01em",
                    }}
                    onClick={() =>
                      dispatch(
                        toggleModal({
                          key: "integration",
                          data: { open: true, data: {} },
                        }),
                      )
                    }
                  />
                  <Button
                    style={{ height: "32px", gap: "7px" }}
                    icon={<StopSvg color={bgColors.brilliance} />}
                    text="Black list"
                    bgColor={bgColors.pop}
                    textColor={textColors.brilliance}
                    textStyle={{
                      color: textColors.brilliance,
                      fontWeight: "600",
                      fontSize: "12px",
                      lineHeight: "20px",
                      letterSpacing: "-0.01em",
                    }}
                    onClick={() =>
                      router.push("/settings/sms-settings/black-list")
                    }
                  />
                </div>
              }
              menu={menu}
              initValue={0}
            />
          )}
          <ChildComponent data={data?.crons as any} isLoading={isLoading} />
        </PaddingWrapper>
      </Background>
      <Integration />
    </Wrapper>
  );
};

export default SmsPage;
