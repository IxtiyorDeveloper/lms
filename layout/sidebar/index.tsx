import React, { useCallback, useLayoutEffect } from "react";
import Image from "next/image";
import { useRouter } from "next/router";
import { menuList } from "constants/index";
import { settingConstants } from "constants/menuList";
import { Divider, LogoContainer, MenuContainer, MenuTextStyled } from "./style";
import { Menu, MenuItem, Sidebar, SubMenu } from "components/sidebar";
import { useDispatch, useSelector } from "react-redux";
import { IStore } from "store";
import { toggleSidebar } from "store/slices/sidebar/sidebar";
import company from "api/company";
import Link from "next/link";
import { LINK_IELTS } from "constants/menuLinks";
import ielts from "api/ielts";
import { funcCheckPermission } from "utils/guard";
import { validationErrorHandler } from "utils";

function getObject(array: any[], key: string, value: any) {
  let o: any;
  array.some(function iter(a) {
    if (a[key] === value) {
      o = a;
      return true;
    }
    return Array.isArray(a.child) && a.child.some(iter);
  });
  return o;
}

function SidebarMenu() {
  const router = useRouter();
  const isOpen = useSelector((state: IStore) => state.sidebar.isOpen);

  const dispatch = useDispatch();
  // render function to render menu item
  const render = useCallback(
    (
      title: string,
      icon: string,
      child?: any[],
      route?: string,
      index?: number | string,
      key?: string,
      parentTitle?: string,
      permissions?: string[]
    ) => {
      let bool = funcCheckPermission(permissions || []);

      const routeMenu = async (e: any, route: any) => {
        if (!!key) {
          //if not IELTS login company
          if (key !== LINK_IELTS) {
            try {
              const data = await company.login({ key });
              if (data.data.result && window) {
                const newWindow = window.open(
                  data.data.result,
                  "_blank",
                  "noopener,noreferrer"
                );
                if (newWindow) newWindow.opener = null;
              }
            } catch (err) {
              validationErrorHandler({ err });
            }
          } else {
            try {
              const data = await ielts.createTicketUrl();
              if (data.data.result) {
                const newWindow = window.open(
                  data.data.result,
                  "_blank",
                  "noopener,noreferrer"
                );
                if (newWindow) newWindow.opener = null;
              }
            } catch (err: any) {
              validationErrorHandler({ err });
            }
          }
        } else if (e.ctrlKey || e.metaKey) {
          const newWindow = window.open(`${route}`, "_blank");
          newWindow!.focus();
        } else {
          route && router.push(route);
        }
      };

      if (!bool) return null;
      const onPressMenu = (isDropDown?: boolean) => {
        dispatch(
          toggleSidebar({
            id:
              isOpen?.id === title || !!getObject(child!, "title", isOpen?.id)
                ? parentTitle || title
                : title,
            isOpen:
              isOpen?.id === title || !!getObject(child!, "title", isOpen?.id)
                ? !isOpen?.isOpen || !!parentTitle
                : true,
          })
        );
        !isDropDown && route && router.push(route);
      };
      //sub menu
      if (child) {
        return (
          <SubMenu
            active={router.pathname === route?.split("?")[0]}
            open={
              (title === isOpen?.id ||
                !!getObject(child, "title", isOpen?.id)) &&
              isOpen?.isOpen
            }
            key={`${route}_${index}`}
            label={<MenuTextStyled className="title">{title}</MenuTextStyled>}
            icon={
              icon && (
                <Image
                  style={{ marginTop: "0" }}
                  src={icon}
                  alt={`${title}`}
                  width="20"
                  height="20"
                />
              )
            }
            onClick={(event) => {
              event.stopPropagation();
              onPressMenu(true);
            }}
          >
            <div style={{ display: "flex" }}>
              <div
                style={{
                  borderRight: `1px solid #F4F5F6`,
                  paddingLeft: "32px",
                  marginTop: "16px",
                  opacity: 0.2,
                  marginRight: "-10px",
                }}
              />
              <div className="scrollHide" style={{ overflow: "auto" }}>
                {child.map(
                  ({
                    title: ownTitle,
                    icon,
                    route,
                    child,
                    key,
                    permissions,
                  }) => {
                    return render(
                      ownTitle,
                      icon,
                      child,
                      route,
                      title,
                      key,
                      title,
                      permissions
                    );
                  }
                )}
              </div>
            </div>
          </SubMenu>
        );
      }

      return (
        <div
          onClick={(e) => {
            if (e.ctrlKey || e.metaKey) {
              e.stopPropagation();
            }
          }}
          key={`${route}_${index}`}
        >
          <Link href={route! || ""} onClick={(e) => key && routeMenu(e, route)}>
            <MenuItem
              icon={
                icon && (
                  <Image
                    style={{ marginTop: "0" }}
                    src={icon}
                    alt={`${title}`}
                    width="20"
                    height="20"
                  />
                )
              }
              active={router.pathname === route?.split("?")[0]}
            >
              <MenuTextStyled className="title"> {title}</MenuTextStyled>
            </MenuItem>
          </Link>
        </div>
      );
    },
    [isOpen?.id, isOpen?.isOpen, router.pathname]
  );

  useLayoutEffect(() => {
    if (isOpen?.id === 0) {
      const a = getObject(menuList, "route", router.pathname);
      if (!!a) {
        dispatch(
          toggleSidebar({
            id: (a as any)?.title,
            isOpen: true,
          })
        );
      }
    }
  }, []);

  return (
    <Sidebar
      backgroundColor="transparent"
      className="scrollHide"
      style={{ height: "100vh", fontFamily: "inter" }}
    >
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          height: "100%",
        }}
      >
        <Menu>
          <div>
            <LogoContainer>
              <Link href="/schedule">
                <Image
                  src="/logo/mainLogo.svg"
                  alt="Main logo"
                  height="39"
                  width="170"
                />
              </Link>
            </LogoContainer>
            <Divider />
            {/*all menu list*/}
            <MenuContainer>
              {menuList.map(
                ({ title, icon, child, route, key, permissions }) => {
                  return render(
                    title,
                    icon,
                    child,
                    route,
                    title,
                    key,
                    undefined,
                    permissions
                  );
                }
              )}
            </MenuContainer>
          </div>
        </Menu>
        {/*additional settings menu*/}
        <Menu>
          <div style={{ marginBottom: "20px" }}>
            {render(
              settingConstants.title,
              settingConstants.icon,
              settingConstants.child,
              settingConstants.route,
              settingConstants.title,
              "settingConstants.title",
              undefined,
              settingConstants.permissions
            )}
          </div>
        </Menu>
      </div>
    </Sidebar>
  );
}

export default React.memo(SidebarMenu);
