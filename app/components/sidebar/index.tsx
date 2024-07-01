import React, { useEffect, useMemo, useState } from "react";
import * as components from "components/common";
import { Wrapper } from "./style";
import { Menu } from "antd";
import type { MenuProps } from "antd";
import { useRouter } from "next/router";
import { Input } from "components/common";
import { useForm } from "react-hook-form";

type MenuItem = Required<MenuProps>["items"][number];

function getItem(
  label: React.ReactNode,
  key: React.Key,
  icon?: React.ReactNode,
  children?: any,
  type?: "group",
): MenuItem {
  return {
    key,
    icon,
    children,
    label,
    type,
  } as MenuItem;
}

const Sidebar = () => {
  const router = useRouter();

  const arrayFromIconsObj = useMemo(() => {
    const newItem = [];
    for (let key in components) {
      newItem.push(key);
    }
    return newItem;
  }, []);

  const [filteredComponents, setFilteredComponents] =
    useState(arrayFromIconsObj);

  const items: MenuProps["items"] = useMemo(() => {
    return filteredComponents?.map((item, index) => getItem(item, `${item}`));
  }, [filteredComponents]);

  const onClick: MenuProps["onClick"] = (e) => {
    router.replace({
      query: {
        component: e?.key,
      },
    });
  };

  const { control, watch } = useForm();

  useEffect(() => {
    const subscription = watch((value, { type, name }) => {
      if (name == "component" && type == "change") {
        setFilteredComponents(
          arrayFromIconsObj.filter((i) =>
            i.toLowerCase().includes(value?.component?.toLowerCase()),
          ),
        );
      }
    });
    return () => subscription.unsubscribe();
  }, [watch]);

  return (
    <Wrapper>
      <form>
        <Input
          label=""
          name="component"
          control={control}
          placeholder="Search components"
        />
      </form>
      <Menu
        onClick={onClick}
        style={{ width: 256 }}
        defaultSelectedKeys={["AbsMergedWithUnit"]}
        mode="inline"
        theme="dark"
        items={items}
      />
    </Wrapper>
  );
};

export default Sidebar;
