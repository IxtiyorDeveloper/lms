import { Quill, DefaultTab } from "components";
import { Label } from "components/common/input/style";
import React, { useMemo } from "react";
import { TabWrapper } from "./style";

const Description = ({ control }: { control: any }) => {
  const menu = useMemo(() => {
    return [
      {
        label: "Uzbek",
        key: "uz",
        children: (
          <Quill
            label=""
            name="root.description.uz"
            control={control}
            placeholder={"Type here..."}
          />
        ),
      },
      {
        label: "English",
        key: "en",
        children: (
          <Quill
            label=""
            name="root.description.en"
            control={control}
            placeholder={"Type here..."}
          />
        ),
      },
      {
        label: "Russian",
        key: "ru",
        children: (
          <Quill
            label=""
            name="root.description.ru"
            control={control}
            placeholder={"Type here..."}
          />
        ),
      },
    ];
  }, []);

  return (
    <TabWrapper>
      <Label htmlFor={"root.description"}>Description</Label>

      <DefaultTab initValue="uz" items={menu} routerKey="defaultTabMenu" />
    </TabWrapper>
  );
};

export default Description;
