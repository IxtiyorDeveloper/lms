import React from "react";
import { ExpenseFiles as ExpenseFilesComp } from "components";

const ExpenseFiles = () => {
  const data = [
    {
      id: 1458,
      name: "5-у от 05.02.2024.pdf",
      file: {
        id: 476968,
        base_url: "https://d38pzfvpoaatp4.cloudfront.net",
        path: "2/K64Uyqsh_fxxl8b_Kg51E764w-xZp8jQ.pdf",
        resolution: null,
        name: "5-у от 05.02.2024.pdf",
        full_url:
          "https://d38pzfvpoaatp4.cloudfront.net/2/K64Uyqsh_fxxl8b_Kg51E764w-xZp8jQ.pdf",
      },
    },
    {
      id: 1459,
      name: "1.jpg",
      file: {
        id: 476969,
        base_url: "https://d38pzfvpoaatp4.cloudfront.net",
        path: "2/gUCkLn2pbelcgqQ7qpoQS5MgYrQswQ-G.jpg",
        resolution: null,
        name: "1.jpg",
        full_url:
          "https://d38pzfvpoaatp4.cloudfront.net/2/gUCkLn2pbelcgqQ7qpoQS5MgYrQswQ-G.jpg",
      },
    },
    {
      id: 1460,
      name: "2.jpg",
      file: {
        id: 476970,
        base_url: "https://d38pzfvpoaatp4.cloudfront.net",
        path: "2/QktG0VL3gy6hGHqHd_7kGwMMb-QnP-hT.jpg",
        resolution: null,
        name: "2.jpg",
        full_url:
          "https://d38pzfvpoaatp4.cloudfront.net/2/QktG0VL3gy6hGHqHd_7kGwMMb-QnP-hT.jpg",
      },
    },
  ];
  return (
    <div>
      <ExpenseFilesComp expenseFiles={data as any} />
    </div>
  );
};

export default ExpenseFiles;
