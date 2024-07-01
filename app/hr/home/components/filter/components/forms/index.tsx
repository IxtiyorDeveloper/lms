import { Col } from "antd";
import { generateFormData } from "./data";
import { InitialDataHR } from "types";

export const Forms = ({
  control,
  initialData,
}: {
  control: any;
  initialData: InitialDataHR | undefined;
}) => {
  const forms = generateFormData({ control, initialData });

  return forms
    ?.filter((item) => !item.hide)
    ?.map((item) => {
      return (
        <Col lg={4} md={6} sm={12} xs={24} key={item.name}>
          {item.render()}
        </Col>
      );
    });
};
