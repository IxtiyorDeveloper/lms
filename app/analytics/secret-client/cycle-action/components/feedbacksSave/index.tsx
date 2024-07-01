import React, { FC } from "react";
import { Wrapper } from "./style";
import { Button, RedBadgeTitle } from "components";
import { bgColors, textColors } from "styles/theme";
import { useRouter } from "next/router";
import { UseMutationResult } from "@tanstack/react-query";
import { TParams } from "types";

interface IProps {
  count: number;
  action: UseMutationResult<any, Error, TParams, unknown>;
  onSubmit: any;
}

const FeedbacksSave: FC<IProps> = ({ count = 0, action, onSubmit }) => {
  const router = useRouter();
  return (
    <Wrapper>
      <div>
        <RedBadgeTitle count={count} title="Feedbacks" />
      </div>
      <div className="buttons">
        {router.query.id && (
          <Button
            className="cancel"
            style={{ width: "100%", fontWeight: "600" }}
            bgColor={bgColors.wildSand}
            textColor={textColors.pop}
            onClick={() =>
              action.mutate({
                action: "admin_v1_secret_client_cycle_delete",
                query_params: { id: router.query.id },
              })
            }
          >
            Delete
          </Button>
        )}
        <Button
          className="save"
          style={{ width: "100%", fontWeight: "600" }}
          type="submit"
          onClick={onSubmit}
          // buttonLoading={createSalaryComponent?.isLoading}
        >
          Save
        </Button>
      </div>
    </Wrapper>
  );
};

export default FeedbacksSave;
