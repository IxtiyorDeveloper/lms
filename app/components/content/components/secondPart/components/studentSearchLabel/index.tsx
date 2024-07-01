import React from "react";
import { StudentSearchLabel as StudentSearchLabelComponent } from "components";

const StudentSearchLabel = () => {
  return (
    <div>
      <StudentSearchLabelComponent
        props={
          {
            id: "188535",
            user_id: "101859",
            group_id: "2479",
            branch_name: "Westminster",
            branch_id: "2",
            note: "done will study told s.madina 20.12/\nFrom GE 749",
            group_name: "GE 771",
            group_note:
              "Muborak Abdufattokhova after final 20.01\nMurodjon Akhmadjonov after final 20.01\nShakhzoda Tojiboeva after final 20.01\nTEACHER SAID TO ADD THESE STUDENTS Azizbek Saliyev asap 01.02 ",
            level_name: "IELTS Start",
            paren_level_id: "6",
            teacher_firstname: "Yusupov",
            teacher_lastname: "Hojimurod",
            status: "300",
            firstname: "Jasmina",
            lastname: "Alisherova",
            avatar_url:
              "https://d38pzfvpoaatp4.cloudfront.net/1/SzLzybbQykk318f2k-bgqNZb-onDlRBh.jpg",
            phones: "600:998909896359:1,600:998909213203:0",
          } as any
        }
      />
    </div>
  );
};

export default StudentSearchLabel;
