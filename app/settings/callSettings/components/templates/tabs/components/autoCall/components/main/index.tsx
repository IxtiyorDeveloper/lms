import React from "react";
import { Wrapper, Box, Content, Flex, Repeat } from "./style";
import {
  InputNumber,
  Segmented,
  Switch,
  TabSelect,
  UploadFile,
} from "components";
import { bgColors } from "styles/theme";
import { useCallTemplatePageData } from "hooks";
import { generateKeyOptions } from "utils/callTemplate/generateKeyOptions";
import { IType } from "./type";

const Main = ({ menu, main_tab, setValue, control, watch }: IType) => {
  const { data: callPageData } = useCallTemplatePageData();

  const options = generateKeyOptions({ callPageData });
  const onSuccess = (e: any, name: string) => {
    setValue(name, e.url);
  };

  const menuList = menu?.map((item, index) => {
    const file = {
      name: item?.templateObj?.url,
      full_url: item?.templateObj?.url,
    };
    setValue(`templates[${index}].scenario"`, +item.templateObj?.scenario);
    setValue(`templates[${index}].id"`, +item.value);
    setValue(`templates[${index}].name"`, item.label);
    return {
      ...item,
      children: (
        <Content key={index}>
          <Box className="first-box">
            <UploadFile
              name={`templates[${index}].url`}
              label="Audio file"
              control={control}
              setValue={setValue}
              onSuccess={(e) => onSuccess(e, `templates[${index}].url`)}
              file={item?.templateObj?.url ? file : undefined}
              className="file-wrapper"
              text="Upload file"
              height="76px"
            />
            <Flex>
              <InputNumber
                label="Recall attempt"
                name={`templates[${index}].max_attempt`}
                control={control}
                colorBgContainer={bgColors.white}
              />
              <InputNumber
                label="Recall interval"
                name={`templates[${index}].attempt_interval`}
                control={control}
                colorBgContainer={bgColors.white}
                suffix={<div className="suffix">Hour</div>}
              />
            </Flex>
            <Repeat>
              <Switch
                name={`templates[${index}].is_repeat`}
                label="Notify Candidate"
                control={control}
                size="small"
              />
              <Flex>
                <InputNumber
                  label="Hold time"
                  name={`templates[${index}].delay`}
                  control={control}
                  colorBgContainer={bgColors.white}
                  suffix={<div className="suffix">Sec</div>}
                />
                <TabSelect
                  label="Forward to"
                  name={`templates[${index}].default`}
                  control={control}
                  colorBgContainer={bgColors.white}
                  popupMatchSelectWidth={false}
                  options={options}
                  disabled={!!watch("is_repeat")}
                />
              </Flex>
            </Repeat>
          </Box>
          <Box>
            <Flex>
              <TabSelect
                label="Key 1"
                name={`templates[${index}].dial_pads.one`}
                control={control}
                colorBgContainer={bgColors.white}
                popupMatchSelectWidth={false}
                options={options}
              />
              <TabSelect
                label="Key 2"
                name={`templates[${index}].dial_pads.two`}
                control={control}
                colorBgContainer={bgColors.white}
                popupMatchSelectWidth={false}
                options={options}
              />
              <TabSelect
                label="Key 3"
                name={`templates[${index}].dial_pads.three`}
                control={control}
                colorBgContainer={bgColors.white}
                popupMatchSelectWidth={false}
                options={options}
              />
            </Flex>
            <Flex>
              <TabSelect
                label="Key 4"
                name={`templates[${index}].dial_pads.four`}
                control={control}
                colorBgContainer={bgColors.white}
                popupMatchSelectWidth={false}
                options={options}
              />
              <TabSelect
                label="Key 5"
                name={`templates[${index}].dial_pads.five`}
                control={control}
                colorBgContainer={bgColors.white}
                popupMatchSelectWidth={false}
                options={options}
              />
              <TabSelect
                label="Key 6"
                name={`templates[${index}].dial_pads.six`}
                control={control}
                colorBgContainer={bgColors.white}
                popupMatchSelectWidth={false}
                options={options}
              />
            </Flex>
            <Flex>
              <TabSelect
                label="Key 7"
                name={`templates[${index}].dial_pads.seven`}
                control={control}
                colorBgContainer={bgColors.white}
                popupMatchSelectWidth={false}
                options={options}
              />
              <TabSelect
                label="Key 8"
                name={`templates[${index}].dial_pads.eight`}
                control={control}
                colorBgContainer={bgColors.white}
                popupMatchSelectWidth={false}
                options={options}
              />
              <TabSelect
                label="Key 9"
                name={`templates[${index}].dial_pads.nine`}
                control={control}
                colorBgContainer={bgColors.white}
                popupMatchSelectWidth={false}
                options={options}
              />
            </Flex>
            <Flex>
              <TabSelect
                label="Key *"
                name={`templates[${index}].dial_pads.astr`}
                control={control}
                colorBgContainer={bgColors.white}
                popupMatchSelectWidth={false}
                options={options}
              />
              <TabSelect
                label="Key 0"
                name={`templates[${index}].dial_pads.zero`}
                control={control}
                colorBgContainer={bgColors.white}
                popupMatchSelectWidth={false}
                options={options}
              />
              <TabSelect
                label="Key #"
                name={`templates[${index}].dial_pads.sharp`}
                control={control}
                colorBgContainer={bgColors.white}
                popupMatchSelectWidth={false}
                options={options}
              />
            </Flex>
          </Box>
        </Content>
      ),
    };
  });

  return (
    <Wrapper>
      {menu && menu?.length > 1 && (
        <Segmented
          options={menuList || []}
          routerKey="main_tab"
          initValue={main_tab}
        />
      )}
    </Wrapper>
  );
};

export default Main;
