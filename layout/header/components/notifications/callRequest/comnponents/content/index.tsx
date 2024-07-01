import React, { FC, useEffect } from "react";
import { Wrapper, Top, Row, Right } from "./style";
import { RedBadgeTitle } from "components";
import { useInView } from "react-intersection-observer";
import { getGeneratedNotification } from "./utils/getGeneratedNotification";
import { Type } from "./type";
import CallRequestContent from "globals/notifications/handleNotifications/content/callRequest";
import { useReadAll } from "hooks";
import { toast } from "react-toastify";
import { validationErrorHandler } from "utils";
import { useQueryClient } from "@tanstack/react-query";

const CallRequestNotificationsContent: FC<Type> = ({ setOpen, params }) => {
  const queryClient = useQueryClient();
  const { ref, inView } = useInView();

  const {
    data,
    fetchNextPage: fetchNextPageOpened,
    isFetchingNextPage: isFetchingNextPageOpened,
    hasNextPage: hasNextPageOpened,
  } = params;

  const text = isFetchingNextPageOpened
    ? "Loading more..."
    : hasNextPageOpened
      ? "Load Newer"
      : "Nothing more to load";

  useEffect(() => {
    if (inView) {
      fetchNextPageOpened().then();
    }
  }, [inView]);

  const readAllMutation = useReadAll({
    onSuccess: () => {
      toast.success("You read all task notifications");
      queryClient.invalidateQueries({
        queryKey: ["callRequest_notifications"],
      });
    },
    onError: (err) => {
      validationErrorHandler({ err });
    },
  });
  const readAll = () => {
    readAllMutation.mutate({
      query_params: {
        topic: ["call_request"],
      },
    });
  };

  return (
    <Wrapper>
      <Top>
        <RedBadgeTitle
          title="Notifications"
          count={data?.pages?.[0]?.total_count || 0}
        />
        <Right>
          <div className="read-all" onClick={() => readAll()}>
            Read all
          </div>
          <div className="close" onClick={() => setOpen(false)}>
            Close
          </div>
        </Right>
      </Top>
      <Row>
        {data?.pages?.map((page) => {
          return page?.notifications?.map((item, index) => {
            const generated = getGeneratedNotification({
              hotNotifications: item,
            });
            return (
              <div className="col">
                <CallRequestContent
                  hotNotifications={generated}
                  key={index}
                  close
                />
              </div>
            );
          });
        })}
        <p
          ref={ref}
          onClick={() => fetchNextPageOpened()}
          className="load-more"
        >
          {text}
        </p>
      </Row>
    </Wrapper>
  );
};

export default CallRequestNotificationsContent;
