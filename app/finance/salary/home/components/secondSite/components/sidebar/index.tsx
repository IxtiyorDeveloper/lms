import React, { useMemo, useState } from "react";
import { Wrapper, Label, StyledParentCollapse } from "./style";
import { Anchor } from "antd";
import RoleMenu from "./components/roleMenu";

const { Link } = Anchor;

const Sidebar = ({ sidebarItems }: { sidebarItems: any[] | undefined }) => {
  const [activeParentKey, setActiveParentKey] = useState<string | string[]>([]);
  const [activeChildKey, setActiveChildKey] = useState<string | string[]>([]);

  const onParentChange = (key: string | string[]) => {
    if (key?.length) {
      setActiveParentKey(key);
      setActiveChildKey([]);
    }
  };

  const onChildChange = (key: string | string[]) => {
    if (key?.length) setActiveChildKey(key);
  };
  const myItems = useMemo(() => {
    let items: any = [];
    if (sidebarItems) {
      for (let i = 0; i < sidebarItems?.length; i++) {
        const { name, num } = sidebarItems[i];
        items = [
          ...items,
          {
            key: `${i}`,
            label: (
              <Link
                href={`#part-${i}`}
                title={
                  <Label className="label">
                    <p className="name">{name}</p>
                    <p className="num">{num}</p>
                  </Label>
                }
              />
            ),
            children: (
              <RoleMenu
                sidebarItems={sidebarItems}
                item={sidebarItems[i]}
                onChildChange={onChildChange}
                activeChildKey={activeChildKey}
              />
            ),
          },
        ];
      }
      return items;
    } else return [];
  }, [sidebarItems, activeChildKey, activeParentKey]);

  return (
    <Wrapper>
      <StyledParentCollapse
        items={myItems}
        accordion
        activeKey={activeParentKey}
        onChange={onParentChange}
      />
    </Wrapper>
  );
};

export default Sidebar;
