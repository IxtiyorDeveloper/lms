import * as React from "react";
import { Wrapper, InnerWrapper, TabWrapper } from "./style";
import { FC, useMemo, useState } from "react";
import { ETabKey, ITab } from "./type";
import { bgColors, textColors } from "styles/theme";
import { PlusSvg, Button, EditSvg, DeleteSvg } from "components";
import { useRouter } from "next/router";

const RoundedTab: FC<ITab> = ({
  tabs,
  containerStyle,
  allStyles,
  rightChild = [],
  tabName = "roundedTabIndex",
  isAdd = false,
  handleClick,
  tabKey,
  defaultKey,
}) => {
  const router = useRouter();
  const active = useMemo(() => {
    if (tabKey == ETabKey.id) {
      return Number(router.query?.[tabName] ?? defaultKey ?? tabs?.[0]?.id);
    } else {
      return Number(router.query?.[tabName] || 0);
    }
  }, [router.query?.[tabName], tabs]);

  const handlePressTab = (key: number, item: any) => {
    let newObj = {};
    if (item.query) {
      newObj = {
        ...newObj,
        ...item.query,
      };
    }
    router.replace(
      {
        pathname: router.pathname,
        query: {
          ...(router.query || {}),
          ...newObj,
          page: 1,
          pageSize: item.query?.pageSize ?? 20,
          [tabName]: key,
        },
      },
      undefined,
      { scroll: false }
    );
  };

  const [activeIndex, setIndex] = useState<number | null>(null);

  return (
    <TabWrapper>
      <Wrapper>
        <InnerWrapper
          gap={allStyles?.gap}
          tabBg={allStyles?.tabBg}
          tabWidth={allStyles?.tabWidth || "100%"}
          padding={allStyles?.paddingTab}
          tabsAlign={allStyles?.tabsAlign}
          textColor={allStyles?.textColor}
          style={containerStyle}
          activeTabBg={allStyles?.activeTabBg!}
          beforeColor={allStyles?.beforeColor}
          activeTColor={allStyles?.activeTColor}
          buttonBgColor={allStyles?.buttonBgColor}
          isBorderBottom={allStyles?.isBorderBottom}
          isSimpleBtn={allStyles?.isSimpleBtn}
          bgColor={allStyles?.bgColor ?? bgColors.purpleCrystal}>
          <ul className="tabs group">
            {tabs?.map((item, index) => {
              const key = tabKey == ETabKey.id ? Number(item.id) : index;
              const isActive = active === key;
              return (
                <li
                  className={isActive ? "active" : ""}
                  onClick={() => handlePressTab(key, item)}
                  style={{
                    display: "flex",
                    flex: !allStyles?.isSimpleBtn ? 1 : "unset",
                  }}
                  key={key}
                  onMouseMove={() => setIndex(key)}
                  onMouseLeave={() => setIndex(null)}>
                  <div
                    className="tab"
                    style={{
                      backgroundColor: isActive
                        ? allStyles?.activeTabBg
                        : allStyles?.inActiveTabBg,
                    }}>
                    <div
                      className="button"
                      style={{
                        backgroundColor: isActive
                          ? allStyles?.activeBg
                          : allStyles?.inActiveBg,
                        padding: allStyles?.buttonPadding || 0,
                      }}>
                      {item?.title(isActive)}
                    </div>
                  </div>
                  <div className="action">
                    {item?.isHaveUpdate && (
                      <div
                        className={
                          activeIndex === key
                            ? "actionItemActive"
                            : "actionItem"
                        }
                        onClick={(e) => {
                          e.stopPropagation();
                          return item.onPressUpdate && item.onPressUpdate();
                        }}
                        style={{ paddingLeft: "6px" }}>
                        <EditSvg
                          color={bgColors.mineShaft}
                          width={15}
                          height={17}
                        />
                      </div>
                    )}
                    {item?.isHaveDelete && (
                      <div
                        className={
                          activeIndex === key
                            ? "actionItemActive"
                            : "actionItem"
                        }
                        onClick={(e) => {
                          e.stopPropagation();
                          return item.onPressDelete && item.onPressDelete();
                        }}>
                        <DeleteSvg
                          color={bgColors.mineShaft}
                          width={20}
                          height={20}
                        />
                      </div>
                    )}
                  </div>
                </li>
              );
            })}
            {isAdd && (
              <div className="add">
                <Button
                  icon={<PlusSvg />}
                  style={{
                    padding: "0 24px",
                    color: textColors.blueGray,
                    zIndex: 4,
                    backgroundColor: bgColors.daisy,
                  }}
                  onClick={handleClick}
                />
              </div>
            )}
          </ul>
          {rightChild?.length > 0 && (
            <ul
              className="tabs group end"
              style={{ width: `${rightChild?.length * 10}%` }}>
              {rightChild?.map((item, key) => {
                key += tabs.length;
                const isActive = active === key;
                return (
                  <li
                    className={isActive ? "active" : ""}
                    onClick={() => handlePressTab(key, item)}
                    style={{
                      display: "flex",
                      flex: !allStyles?.isSimpleBtn ? 1 : "unset",
                    }}
                    key={key}
                    onMouseMove={() => setIndex(key)}
                    onMouseLeave={() => setIndex(null)}>
                    <div
                      className="tab"
                      style={{
                        backgroundColor: isActive ? allStyles?.activeTabBg : "",
                      }}>
                      <div
                        className="button"
                        style={{
                          backgroundColor: isActive ? allStyles?.activeBg : "",
                          padding: allStyles?.buttonPadding || 0,
                        }}>
                        {item?.title(isActive)}
                      </div>
                    </div>
                    <div className="action">
                      {item?.isHaveUpdate && (
                        <div
                          className={
                            activeIndex === key
                              ? "actionItemActive"
                              : "actionItem"
                          }
                          onClick={(e) => {
                            e.stopPropagation();
                            return item.onPressUpdate && item.onPressUpdate();
                          }}
                          style={{ paddingLeft: "6px" }}>
                          <EditSvg
                            color={bgColors.mineShaft}
                            width={15}
                            height={17}
                          />
                        </div>
                      )}
                      {item?.isHaveUpdate && (
                        <div
                          className={
                            activeIndex === key
                              ? "actionItemActive"
                              : "actionItem"
                          }
                          onClick={(e) => {
                            e.stopPropagation();
                            return item.onPressDelete && item.onPressDelete();
                          }}>
                          <DeleteSvg
                            color={bgColors.mineShaft}
                            width={20}
                            height={20}
                          />
                        </div>
                      )}
                    </div>
                  </li>
                );
              })}
              {isAdd && (
                <div className="add">
                  <Button
                    icon={<PlusSvg />}
                    style={{
                      padding: "0 24px",
                      color: textColors.blueGray,
                      zIndex: 4,
                      backgroundColor: bgColors.daisy,
                    }}
                    onClick={handleClick}
                  />
                </div>
              )}
            </ul>
          )}
        </InnerWrapper>
      </Wrapper>
      <div>{[...tabs, ...rightChild]?.[active]?.children}</div>
    </TabWrapper>
  );
};
export default RoundedTab;

RoundedTab.defaultProps = {
  allStyles: {
    buttonBgColor: bgColors.purpleCrystal,
    activeTabBg: bgColors.white,
    paddingTab: "6px",
    isSimpleBtn: false,
    isBorderBottom: true,
    gap: "0",
    tabWidth: "100%",
    activeBg: bgColors.primary,
    inActiveBg: "",
    inActiveTabBg: "",
    tabsAlign: "center",
  },
  rightChild: [],
  tabName: "roundedTabIndex",
  isAdd: false,
};
