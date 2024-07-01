import React from "react";
import { CandidateProfile as CandidateProfileComp } from "components";

const CandidateProfile = () => {
  const data = {
    id: 1763,
    company_id: 1,
    source_id: null,
    vacancy_id: 4,
    first_name: "Gulnoza",
    last_name: "Inamjonova",
    description: "Age 20 IELTS no",
    comment:
      "Morning shift. Strong candidate, will take IELTS if she is successful. Comes from Namangan, dad does manufacturing business. Mom is a housewife. She lives in Uchtepa with coursemates. Studies at UzSWLU in the final year. Wants to do MA for better teaching. Speaks Russian and Uzbek",
    dob: "2002-03-05",
    bonus_for: "",
    color: null,
    system_user_id: null,
    last_action_time: "2023-09-25 19:07:38",
    gender: 1,
    stage: 500,
    status: 300,
    rejection_type: null,
    created_at: "2022-04-09 12:33:38",
    deleted_at: null,
    responsible_id: 41,
    is_archived: 0,
    bonus_for_type: null,
    bonus_for_id: null,
    updated_by: null,
    candidateAvatar: null,
    candidateDocuments: [
      {
        id: 29319,
        company_id: 1,
        candidate_id: 1763,
        file_storage_item_id: 1982,
        type: 200,
        url: "https://d3ibx938r8pde.cloudfront.net/1/nZXOD5DcO8rIpEYYH99AGiqakUWPahCl.jpg",
        name: "photo_2023-09-05_18-51-16.jpg",
      },
    ],
    candidateLabels: [
      {
        id: 1876,
        company_id: null,
        candidate_id: 1763,
        type: 100,
        datetime: "2023-12-26 11:00:00",
        responsible_id: null,
        comment: null,
        options: null,
        created_by: 35,
        createdBy: {
          id: 35,
          username: "Dostonbek_Muminov",
          email: "Dostonbek_Muminov@example.com",
          status: 100,
          created_at: "2023-12-13 13:38:23",
          updated_at: "2023-12-13 13:46:10",
          userProfile: {
            user_id: 35,
            firstname: "Dostonbek",
            middlename: null,
            lastname: "Muminov",
            locale: "ru-RU",
            gender: 1,
          },
          avatar:
            "https://d3ibx938r8pde.cloudfront.net/1/56GWMm-nh7z6aWdaBh2vTCiScHQOxyNi.jpg",
          fullName: "Dostonbek Muminov",
          role: "Quality Assurance",
          role_id: 41,
          base_user_id: 104698,
        },
        responsible: null,
      },
    ],
    candidatePhoneNumbers: [
      {
        id: 2273,
        company_id: 1,
        candidate_id: 1763,
        type: 100,
        phone_number: "998880341304",
        is_confirmed: null,
      },
      {
        id: 2274,
        company_id: 1,
        candidate_id: 1763,
        type: 100,
        phone_number: "998999707608",
        is_confirmed: null,
      },
    ],
    trainingStages: [],
    responsible: {
      id: 41,
      username: "Muniraxon_Hamidova",
      email: "Muniraxon_Hamidova@example.com",
      status: 100,
      created_at: "2023-12-13 13:38:23",
      updated_at: "2023-12-13 13:46:12",
      userProfile: {
        user_id: 41,
        firstname: "Hamidova",
        middlename: null,
        lastname: "Muniraxon",
        locale: "ru-RU",
        gender: 2,
      },
      avatar:
        "https://d3ibx938r8pde.cloudfront.net/1/ug9r3Pgf4mMGa4gG6rrRlSTM_xB1k2R8.jpeg",
      fullName: "Hamidova Muniraxon",
      role: null,
      role_id: 36,
      base_user_id: 105199,
    },
    vacancy: {
      id: 4,
      title: "Academic Support",
      slug: "academic-support",
      status: 100,
      description: {
        en: "<p>Test en</p>",
        ru: "<p>Test uz</p>",
        uz: "",
      },
      color: "#dd7e6b",
      description_template: null,
      vacancy_url: null,
      order: 4,
      department_id: 1,
      role_id: 5,
      file_storage_item_id: 4,
      require_ielts: 1,
      is_bonus_for: 1,
      terms_and_conditions_link: null,
    },
    actionPermissions: {
      edit: true,
      delete: false,
      take: false,
      sms: true,
      call: true,
      create: true,
      approve: true,
      rejected: true,
    },
    labelPermissions: {
      call_request: true,
      not_answered: true,
      change_color: true,
      meeting: false,
      life_cycle: true,
      absent: false,
      ceo_confirmed: true,
    },
    own_phone_number: "998880341304",
    age: 22,
    abs: [],
    ceo_approved: false,
    meeting: null,
    hired_date: null,
  };
  return (
    <div>
      <CandidateProfileComp
        data={data as any}
        width={40}
        height={40}
        index={1}
        hideCreatedInfo={false}
      />
    </div>
  );
};

export default CandidateProfile;
