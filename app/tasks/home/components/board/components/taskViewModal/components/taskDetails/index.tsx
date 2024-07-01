import React, { FC, useState } from "react";
import {
  AttachmentsWrapper,
  Body,
  DateWrapper,
  Header,
  NoAttachment,
  OpenedTaskDetails,
  Title,
  VideoWrapper,
  Wrapper,
} from "./style";
import { ETaskStatus, ISingleTask, ITaskEnums, ITaskFile } from "types";
import TaskStatus from "../../../taskStatus";
import moment from "moment";
import Item from "../item";
import CreatedByView from "../../../myTasks/components/createdByView";
import { Image, Rate } from "antd";
import { checkImageURL } from "utils/image";
import { VideoFile } from "components";
import DeadlineAlert from "../../../deadlineAlert";

interface IProps {
  singleTask?: ISingleTask;
  taskEnums?: ITaskEnums;
}

const Details: FC<IProps> = (props) => {
  const { singleTask } = props;
  const [visible, setVisible] = useState([]);

  return (
    <Wrapper>
      <DeadlineAlert deadline={singleTask?.deadline} />

      <Title>Attachments</Title>
      <AttachmentsWrapper>
        {singleTask?.taskFiles.length === 0 ? (
          <NoAttachment>No data</NoAttachment>
        ) : (
          singleTask?.taskFiles?.map((file: ITaskFile, index) => (
            <>
              {checkImageURL(file.url) ? (
                <Image
                  height="110px"
                  style={{
                    objectFit: "cover",
                    borderRadius: 6,
                  }}
                  src={file.url}
                  alt={file.name}
                />
              ) : (
                <VideoWrapper
                  onClick={() =>
                    setVisible((prev) => ({
                      ...prev,
                      [`${file?.name}_${index}`]: true,
                    }))
                  }>
                  <VideoFile />
                  <p>{file?.name}</p>

                  <Image
                    style={{
                      objectFit: "cover",
                      display: "none",
                    }}
                    preview={{
                      destroyOnClose: true,
                      visible:
                        visible[`${file?.name}_${index}` as any] || false,
                      onVisibleChange: (value) => {
                        setVisible({
                          ...visible,
                          [`${file?.name}_${index}`]: value,
                        });
                      },
                      imageRender: () => (
                        <video
                          muted
                          width="fit-content"
                          controls
                          src={file?.url}
                          style={{
                            maxWidth: "100%",
                            maxHeight: "70%",
                          }}
                        />
                      ),
                      toolbarRender: () => null,
                    }}
                    src="/novideo.png"
                  />
                </VideoWrapper>
              )}
            </>
          ))
        )}
      </AttachmentsWrapper>
      <OpenedTaskDetails>
        <Header>
          <TaskStatus
            taskEnums={props.taskEnums}
            statusNumber={singleTask?.status}
          />
          <DateWrapper>
            {moment(singleTask?.created_at).format("DD MMM, HH:mm")}
          </DateWrapper>
        </Header>
        <Body>
          <Item text="Category" data={singleTask?.categoryName} />
          <Item text="Branch" data={singleTask?.branch_object.name} />
          <Item
            text="Responsible"
            data={
              <>
                {singleTask?.responsible.map((str) => (
                  <>{str.name}, </>
                ))}
              </>
            }
          />
          <Item
            styles={{
              marginBottom:
                singleTask?.status === Number(ETaskStatus.CHECKED) ? "16px" : 0,
            }}
            text="Comment"
            data={singleTask?.description}
          />
          {singleTask?.status === Number(ETaskStatus.CHECKED) ? (
            <Item
              styles={{
                marginBottom: 0,
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
              }}
              text="Rate"
              data={<Rate defaultValue={Number(singleTask?.point)} disabled />}
            />
          ) : null}
        </Body>
        <div>
          <CreatedByView
            createdBy={singleTask?.creator}
            profilePic={
              singleTask?.taskUsers.filter(
                (user) => user.user_type_str === "CREATOR"
              )[0]?.profile?.avatar_children
            }
          />
        </div>
      </OpenedTaskDetails>
    </Wrapper>
  );
};

export default Details;
