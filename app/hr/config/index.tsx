import { Segmented } from "components";
import { Tools, Vacancy } from "./components";
import { useRouter } from "next/router";
import { CONFIG_TYPE } from "./type";

import { Wrapper, TabWrapper } from "./style";

const options = [
  {
    label: "Vacancies",
    value: CONFIG_TYPE.VACANCIES,
  },
  {
    label: "Tools",
    value: CONFIG_TYPE.TOOLS,
  },
];

const content = {
  vacancies: <Vacancy />,
  tools: <Tools />,
};

const ConfigPage = () => {
  const router = useRouter();

  return (
    <Wrapper>
      <TabWrapper>
        <Segmented
          options={options}
          initValue={
            router.query.config_type?.toString() || CONFIG_TYPE.VACANCIES
          }
          routerKey="config_type"
        />
      </TabWrapper>

      {
        content[
          (router.query.config_type ||
            CONFIG_TYPE.VACANCIES) as keyof typeof content
        ]
      }
    </Wrapper>
  );
};

export default ConfigPage;
