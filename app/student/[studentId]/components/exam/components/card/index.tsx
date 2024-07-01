import React, { FC, useEffect, useState } from "react";
import { Wrapper } from "./style";
import {
  IStudentProfileExam,
  IStudentProfileObjExamComponent,
} from "types/student";
import { CircleImage } from "components";
import { bgColors } from "styles/theme";

interface IProps {
  level?: string;
  subLevel: string;
  data: IStudentProfileExam;
}

const Card: FC<IProps> = (props) => {
  const [components, setComponents] = useState<
    IStudentProfileObjExamComponent[]
  >([]);

  useEffect(() => {
    const collectedComponents: any = [];
    const collectedComponentsList: any = [];

    props.data.exam.exam_parts.map((obj) => {
      obj.config.components.map((component) => {
        collectedComponents.push(component);
      });
    });

    collectedComponents.map((obj: IStudentProfileObjExamComponent) => {
      props.data.process.data.components.map((obj2) => {
        if (obj.id === obj2.component_id) {
          collectedComponentsList.push({ ...obj, point: obj2.point });
        }
      });
    });

    setComponents(collectedComponentsList);
  }, [props.data]);

  const process = props.data.process;
  const isPassed = process.pass_point <= process.point;

  return (
    <Wrapper color={isPassed ? bgColors.spring : bgColors.pale}>
      <div className="item item-level">
        <div className="child none-bottom">{props.data?.exam?.level?.name}</div>
        <div className="child ">{props.data?.exam?.subLevel?.name}</div>
      </div>
      <div className="item">
        <div className="child">{props.data?.exam?.group?.name}</div>
        <div className="child"></div>
      </div>
      {components.map((e) => {
        return (
          <div className="item">
            <div className="child">
              <div>
                <CircleImage width={16} height={16} src={e.image_url} />
                {e.label}
              </div>
            </div>
            <div className="child">{e.point}</div>
          </div>
        );
      })}
      <div className={`item bg item-overall`}>
        <div className="child none-bottom">Overall</div>
        <div className="child">{process.point}</div>
      </div>
    </Wrapper>
  );
};

export default Card;
