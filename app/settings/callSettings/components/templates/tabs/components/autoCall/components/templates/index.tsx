import React from "react";
import {
  Wrapper,
  List,
  FieldWrapper,
  Container,
  Icon,
  Title,
  Left,
  Right,
} from "./style";
import { RedBadgeTitle, Switch } from "components";
import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd";
import { DragAndDropSvg } from "@jasurbekyuldashov/lms-web-icons";
import { useRouter } from "next/router";
import { bgColors } from "styles/theme";
import { IType } from "./type";
import { generateTemplates } from "./components/generateTemplates";

const Templates = ({ data, templateControl }: IType) => {
  const router = useRouter();
  const current_template =
    router.query?.current_template ?? data?.crons?.[0]?.key;

  const handleDrag = ({ source, destination }: any) => {
    if (destination) {
    }
  };
  const handleActive = ({ current_template }: { current_template: string }) => {
    router.replace({
      query: {
        ...router.query,
        current_template,
      },
    });
  };

  const templates = generateTemplates({ data });

  return (
    <Wrapper>
      <RedBadgeTitle title="Auto call templates" count="36" />
      <Title></Title>
      <List>
        <DragDropContext onDragEnd={handleDrag}>
          <Droppable droppableId="template-items">
            {(provided, snapshot) => (
              <Container {...provided.droppableProps} ref={provided.innerRef}>
                {templates?.map((item, index) => {
                  const isActive =
                    current_template?.toString() === item.key?.toString();

                  return (
                    <Draggable
                      key={`template[${index}]`}
                      draggableId={`template${index}`}
                      index={index}
                    >
                      {(provided) => (
                        <div
                          key={index}
                          ref={provided.innerRef}
                          {...provided.draggableProps}
                        >
                          <FieldWrapper
                            {...provided.dragHandleProps}
                            onClick={() =>
                              handleActive({ current_template: item.key })
                            }
                            className={isActive ? `active` : ""}
                          >
                            <Left>
                              <Icon>
                                <DragAndDropSvg
                                  color={
                                    isActive ? bgColors.palomino : undefined
                                  }
                                />
                              </Icon>
                              <Title>{item.label}</Title>
                            </Left>
                            <Right>
                              <Switch
                                name={`can_run_${item.key}`}
                                control={templateControl}
                                defaultValue={!!item?.can_run}
                                watchDefaultValue
                              />
                            </Right>
                          </FieldWrapper>
                        </div>
                      )}
                    </Draggable>
                  );
                })}
                {provided.placeholder}
              </Container>
            )}
          </Droppable>
        </DragDropContext>
      </List>
    </Wrapper>
  );
};

export default Templates;
