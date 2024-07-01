import React from "react";
import { Wrapper } from "./style";
import Blog from "../common/blog";
import { useStudentEvents } from "hooks";
import Router from "next/router";
import moment from "moment";
import { AntdTable } from "components";

const Blogs = () => {
  const { data } = useStudentEvents({
    query_params: {
      student_id: Router.query.studentId,
    },
  });
  return (
    <Wrapper>
      {data && data.length > 0 ? (
        data?.map((item, key) => {
          return (
            <Blog
              key={`student_${key}_`}
              title={item?.title}
              type="Free"
              date={moment(item.started_at).format("D MMMM • HH:ss")}
              place={item?.branch?.name}
              url={item.img_url}
            />
          );
        })
      ) : (
        <AntdTable columns={[]} dataSource={[]} />
      )}
    </Wrapper>
  );
};

export default Blogs;
