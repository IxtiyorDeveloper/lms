import Head from "next/head";
import { FC } from "react";

const MainHeadWithTitle: FC<{ title?: string }> = ({ title }) => {
  return (
    <Head>
      <link rel="icon" href="/icon.png" />
      {title === `undefined undefined` ? (
        "Student"
      ) : (
        <title>{title || "LMS"}</title>
      )}
    </Head>
  );
};

export default MainHeadWithTitle;
