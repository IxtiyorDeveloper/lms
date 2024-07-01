import { AntdSwitch, Collapse, Input } from "components";
import { Source } from "..";
import { Panel } from "./panel";
import { IConfigVacancy, IVacancy } from "types";

import {
  WrapperRoleName,
  RoleName,
  Title,
  CollapseWrapper,
  SourceWrapper,
  WrapperFormItem,
  FormItem,
} from "./style";
import { Flex } from "antd";

const Vacancy = ({
  role_name,
  data,
  control,
  vacancyData,
}: {
  control: any;
  data?: IVacancy;
  role_name?: string;
  vacancyData?: IConfigVacancy[];
}) => {
  return (
    <div>
      <WrapperRoleName>
        <div>Role name</div>
        <RoleName>{role_name}</RoleName>
      </WrapperRoleName>

      <Title distance={10}>Active Tabs</Title>
      <Flex vertical gap={20}>
        <CollapseWrapper>
          <Collapse
            bordered={true}
            items={Panel({
              data,
              control,
              vacancyData,
            })}
          />
        </CollapseWrapper>

        <WrapperFormItem>
          <div className="label">IELTS</div>
          <FormItem>
            <Flex justify="space-between">
              <div>Required</div>
              <AntdSwitch name={"root.require_ielts"} control={control} />
            </Flex>
          </FormItem>
        </WrapperFormItem>

        <WrapperFormItem>
          <div className="label">Bonus for</div>
          <FormItem>
            <Flex justify="space-between">
              <div>Exist</div>
              <AntdSwitch name={"root.is_bonus_for"} control={control} />
            </Flex>
          </FormItem>
        </WrapperFormItem>

        <Input
          control={control}
          label="Terms and conditions"
          name="root.terms_and_conditions_link"
          placeholder="link here..."
        />

        {/*<WrapperRoleName>*/}
        {/*  <div>Responsibles</div>*/}
        {/*  <RoleName>Ahmad Nazarov</RoleName>*/}
        {/*</WrapperRoleName>*/}

        <Input
          label={"Description template"}
          name="root.description_template"
          control={control}
          type="textarea"
          placeholder={"type here..."}
        />
      </Flex>
      <SourceWrapper>
        <Source data={data?.sourceList} slug={data?.slug} />
      </SourceWrapper>
    </div>
  );
};

export default Vacancy;
