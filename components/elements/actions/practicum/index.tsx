import React, { FC } from "react";
import { Wrapper } from "./style";
import { TIcon } from "types";
import { LearningSvg } from "components/index";
import { useCreateTicketUrl } from "hooks";
import { useRouter } from "next/router";
import { validationErrorHandler } from "utils";

const PracticumAction: FC<TIcon> = ({ size, clicked, userId }) => {
  const s = size === "small" ? " 17.37" : size === "medium" ? "24" : "";
  const router = useRouter();
  const createSalaryComponent = useCreateTicketUrl({
    onSuccess: (data) => {
      router.replace(data?.data?.result);
    },
    onError: (err) => {
      validationErrorHandler({ err });
    },
  });
  return (
    <Wrapper
      size={size}
      clicked={!!clicked}
      onClick={() =>
        createSalaryComponent.mutate({
          query_params: {
            student_id: userId,
          },
        })
      }
    >
      <LearningSvg width={s} height={s} />
    </Wrapper>
  );
};

export default PracticumAction;
