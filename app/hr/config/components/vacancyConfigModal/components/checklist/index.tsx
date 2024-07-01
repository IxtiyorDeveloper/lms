import { IVacancy } from "types";
import { PlusSvg } from "components";
import { bgColors } from "styles/theme";
import { useFieldArray } from "react-hook-form";
import { DeleteSvg, GripSvg, Input } from "components";
import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd";
import { DraggableItemWrapper, FieldWrapper, Row, Plus } from "./style";

const Checklist = ({
  data,
  control,
  watch,
  setValue,
  errors,
}: {
  data?: IVacancy;
  control: any;
  watch: any;
  setValue: any;
  errors: any;
}) => {
  const { fields, append, remove, move, update } = useFieldArray({
    control,
    name: "root.general.checkList",
  });

  const handleDrag = ({ source, destination }: any) => {
    if (destination) {
      move(source.index, destination.index);
    }
  };
  return (
    <div>
      <DragDropContext onDragEnd={handleDrag}>
        <Droppable droppableId="subLevel-items">
          {(provided, snapshot) => (
            <div {...provided.droppableProps} ref={provided.innerRef}>
              {fields.map((item, index) => {
                return (
                  <Draggable
                    key={`note[${index}]`}
                    draggableId={`checkList${index}`}
                    index={index}
                  >
                    {(provided) => (
                      <DraggableItemWrapper
                        key={item.id}
                        ref={provided.innerRef}
                        className={"draggable_item"}
                        {...provided.draggableProps}
                      >
                        <div className="grip">
                          <GripSvg />
                        </div>
                        <FieldWrapper {...provided.dragHandleProps}>
                          <Row>
                            <div className="num">{index + 1} Stage</div>
                            {index === 0 ? (
                              <Plus
                                onClick={() =>
                                  append({
                                    name: undefined,
                                    duration: undefined,
                                    id: null,
                                  })
                                }
                              >
                                <PlusSvg
                                  color={bgColors.secondary}
                                  width={16}
                                  height={16}
                                />
                              </Plus>
                            ) : (
                              <div className="icon">
                                <DeleteSvg
                                  onClick={() => {
                                    remove(index);
                                    if (
                                      watch()?.general?.checkList?.length === 0
                                    ) {
                                      setValue("general.duration", undefined);
                                    }
                                  }}
                                />
                              </div>
                            )}
                          </Row>
                          <Input
                            label="Training stage text"
                            control={control}
                            type={"textarea"}
                            placeholder="Type here..."
                            name={`root.general.checkList[${index}].stage`}
                            error={
                              errors?.general?.checkList?.[index]?.name?.message
                            }
                          />
                        </FieldWrapper>
                      </DraggableItemWrapper>
                    )}
                  </Draggable>
                );
              })}

              {provided?.placeholder as any}
            </div>
          )}
        </Droppable>
      </DragDropContext>
    </div>
  );
};

export default Checklist;
