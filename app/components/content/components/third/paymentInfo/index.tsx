import React from "react";
import { PaymentInfo as PaymentInfoComp } from "components";

const PaymentInfo = () => {
  const user = {
    id: 240252,
    status: 300,
    user: {
      id: 135408,
      username: "a.avazov8",
      email: "a.avazov8@gmail.com",
      status: 100,
      created_at: "2023-10-16 13:17:22",
      updated_at: "2024-02-02 10:55:36",
      userProfile: {
        user_id: 135408,
        firstname: "Azizbek",
        middlename: null,
        lastname: "Avazov",
        locale: "uz-UZ",
        gender: 1,
        description: null,
        bio: null,
        dob: "2006-09-14",
        avatar: {
          full_url: "https://www.w3schools.com/howto/img_avatar.png",
          base_url: "",
          path: "",
          id: null,
          children: [],
        },
      },
      balance: null,
      student: {
        user_id: 135408,
        note: null,
        status: 200,
        type: 200,
        branch_id: 9,
        source_id: 35,
        updated_at: "2023-10-16 13:17:22",
        isBlackList: true,
        permissionLabels: {
          start_date: false,
          coming: false,
          will_pay: true,
          checked: false,
          dont_take_mot: true,
          call_request: false,
          not_answered: true,
          podo: true,
          colour_change: false,
          lifecycle: true,
        },
      },
      userLabels: [
        {
          id: 524111,
          type: 800,
          datetime: null,
          note: null,
          color: null,
          user: {
            id: 135408,
            username: "a.avazov8",
            email: "a.avazov8@gmail.com",
            status: 100,
            created_at: "2023-10-16 13:17:22",
            updated_at: "2024-02-02 10:55:36",
            userProfile: {
              user_id: 135408,
              firstname: "Azizbek",
              middlename: null,
              lastname: "Avazov",
              locale: "uz-UZ",
              gender: 1,
              description: null,
              bio: null,
              dob: "2006-09-14",
            },
            balance: null,
          },
          left_units_count: 23,
          createdBy: null,
        },
      ],
      userPhones: [
        {
          id: 63812,
          type: 100,
          phone_number: "998913220233",
          is_confirmed: 1,
        },
        {
          id: 63813,
          type: 600,
          phone_number: "998904449900",
          is_confirmed: 0,
        },
      ],
    },
    start_date: "2023-10-18",
    added_date: "2023-10-18 00:00:00",
    finish_date: null,
    deleted_at: null,
    actualPayment: {
      id: 201216,
      start_date: "2024-04-01",
      finish_date: "2024-04-29",
      debt: "888000.00",
      balance: "0.00",
      status: 300,
      lesson_count: 12,
      absence_count: null,
      virtual: false,
      group_contact_id: 240252,
      year: "2024",
      month: "04",
      deleted_at: null,
    },
    group_id: 3561,
    contactResponsibles: [
      {
        id: 82126,
        type: 100,
        user: {
          id: 113709,
          username: "x.odina",
          email: "a@gmail.com",
          status: 300,
          created_at: "2023-05-03 13:38:31",
          updated_at: "2023-11-03 17:55:55",
          userProfile: {
            user_id: 113709,
            firstname: "Xaydarova",
            middlename: null,
            lastname: "Odina",
            locale: "ru-RU",
            gender: 0,
            description: null,
            bio: null,
            dob: "2005-04-01",
          },
          balance: null,
        },
        contact_id: 240252,
        user_id: 113709,
        datetime: "2023-10-16 13:17:43",
      },
    ],
    student_next_status: null,
    isRedList: true,
    isBlackList: true,
    is_progress: 0,
    group: {
      id: 3561,
      status: 100,
      state: 300,
      note: "",
      start_date: "2023-10-02",
      finish_date: "2023-12-31",
      version_id: 25634,
      lesson_time_id: 2,
      lesson_day_id: 1,
      group_type_id: 1,
      level_id: 18,
      name: "ENG 730",
      created_at: "2023-09-07 10:27:35",
      updated_at: "2023-10-18 14:10:04",
      closing_reason: null,
      group_share: null,
      groupMentors: [
        {
          id: 30621,
          type: 100,
          user_id: 95990,
          version_id: 30621,
          user: {
            id: 95990,
            username: "m.islom",
            email: "a@gmail.com",
            status: 100,
            created_at: "2022-11-19 14:57:02",
            updated_at: "2024-03-02 18:50:25",
            userProfile: {
              user_id: 95990,
              firstname: "Islom",
              middlename: null,
              lastname: "Maxmutxonov",
              locale: "ru-RU",
              gender: 1,
              description: null,
              bio: null,
              dob: "1999-08-13",
            },
            balance: null,
          },
        },
        {
          id: 30622,
          type: 200,
          user_id: 125566,
          version_id: 30622,
          user: {
            id: 125566,
            username: "s.dinara",
            email: "s.dinaragmail.com",
            status: 100,
            created_at: "2023-07-27 13:33:09",
            updated_at: "2024-02-19 07:53:26",
            userProfile: {
              user_id: 125566,
              firstname: "Salimova",
              middlename: null,
              lastname: "Dinara",
              locale: "en-US",
              gender: 0,
              description: null,
              bio: null,
              dob: "2004-06-28",
            },
            balance: null,
          },
        },
      ],
      level: {
        id: 18,
        order: 420000,
        name: "Middle",
        duration: 2592000,
        parent_id: 4,
        data: {
          has_exam: true,
          should_assign_units: true,
          calculate_unit_progress: true,
        },
        parent: {
          id: 4,
          order: 400000,
          name: "Intermediate",
          duration: 7776000,
          parent_id: null,
          data: {
            has_exam: true,
            should_assign_units: true,
            calculate_unit_progress: true,
          },
        },
      },
      groupType: {
        id: 1,
        name: "Groups ",
        min_age: 13,
        max_age: 30,
        min_count: 14,
        max_count: 14,
        additional_seat: 4,
        color: null,
        group_form: 200,
        status: 100,
        lesson_duration: 4800,
      },
      lessonDay: {
        id: 1,
        name: "Odd days",
        status: 100,
        lessonWeekDayIndexes: ["1", "3", "5"],
      },
      lessonDays: [
        "2024-04-01",
        "2024-04-03",
        "2024-04-05",
        "2024-04-08",
        "2024-04-10",
        "2024-04-12",
        "2024-04-15",
        "2024-04-17",
        "2024-04-19",
        "2024-04-22",
        "2024-04-24",
        "2024-04-26",
        "2024-04-29",
      ],
      lessonTime: {
        id: 2,
        time: "09:00:00",
        duration: null,
      },
      room: {
        id: 271,
        name: "X Room-15",
        capacity: null,
        status: 100,
        type: 100,
        branch: {
          id: 9,
          name: "Xalqlar Do’stligi",
          address: null,
          landmark: null,
          latitude: null,
          longitude: null,
          description: null,
          location_url: null,
          status: 100,
          region_id: 1,
          deleted_at: null,
        },
      },
      teacher: {
        id: 30621,
        type: 100,
        user_id: 95990,
        version_id: 30621,
        user: {
          id: 95990,
          username: "m.islom",
          email: "a@gmail.com",
          status: 100,
          created_at: "2022-11-19 14:57:02",
          updated_at: "2024-03-02 18:50:25",
          userProfile: {
            user_id: 95990,
            firstname: "Islom",
            middlename: null,
            lastname: "Maxmutxonov",
            locale: "ru-RU",
            gender: 1,
            description: null,
            bio: null,
            dob: "1999-08-13",
          },
          balance: null,
        },
      },
      support: {
        id: 30622,
        type: 200,
        user_id: 125566,
        version_id: 30622,
        user: {
          id: 125566,
          username: "s.dinara",
          email: "s.dinaragmail.com",
          status: 100,
          created_at: "2023-07-27 13:33:09",
          updated_at: "2024-02-19 07:53:26",
          userProfile: {
            user_id: 125566,
            firstname: "Salimova",
            middlename: null,
            lastname: "Dinara",
            locale: "en-US",
            gender: 0,
            description: null,
            bio: null,
            dob: "2004-06-28",
          },
          balance: null,
        },
      },
    },
    actualTransfers: [],
    permissionActions: {
      can_work_balance: false,
      can_stop: false,
    },
    buttonActions: {
      attend: false,
      transfer: true,
      transfer_back: false,
      stop: true,
      activate: false,
      delete: false,
      account_block: true,
      account_unblock: false,
      recommendation: false,
      back_to_waiting_list: false,
      attend_back: false,
      call: true,
      sms: true,
      can_single_pass: true,
      can_register_ielts_practicum: true,
      can_change_start_date: true,
    },
  };
  const group = {
    id: 2288,
    status: 100,
    state: 300,
    note: "",
    start_date: "2023-06-07",
    finish_date: "2023-08-30",
    version_id: 24851,
    lesson_time_id: 2,
    lesson_day_id: 1,
    group_type_id: 1,
    level_id: 25,
    name: "GE 181",
    created_at: null,
    updated_at: null,
    closing_reason: null,
    group_share: null,
    groupMentors: [
      {
        id: 28958,
        type: 100,
        user_id: 106051,
        version_id: 28958,
        user: {
          id: 106051,
          username: "k.sarbinaz",
          email: "a@gmail.com",
          status: 100,
          created_at: "2023-02-18 14:24:49",
          updated_at: "2024-02-19 20:20:23",
          userProfile: {
            user_id: 106051,
            firstname: "Sarbinaz",
            middlename: null,
            lastname: "Koshanova",
            locale: "ru-RU",
            gender: 0,
            description: null,
            bio: null,
            dob: "1998-11-25",
          },
          balance: null,
        },
      },
      {
        id: 28959,
        type: 200,
        user_id: 61490,
        version_id: 28959,
        user: {
          id: 61490,
          username: "b.abdirimov",
          email: "a@gmail.com",
          status: 100,
          created_at: "2022-01-12 16:13:21",
          updated_at: "2024-03-27 17:17:46",
          userProfile: {
            user_id: 61490,
            firstname: "Bekhruz",
            middlename: null,
            lastname: "Abdirimov",
            locale: "ru-RU",
            gender: 1,
            description: null,
            bio: null,
            dob: "2001-10-27",
          },
          balance: null,
        },
      },
    ],
    level: {
      id: 25,
      order: 630000,
      name: "Final",
      duration: 2592000,
      parent_id: 6,
      data: {
        has_exam: false,
        should_assign_units: false,
        calculate_unit_progress: false,
      },
      parent: {
        id: 6,
        order: 600000,
        name: "IELTS",
        duration: 7776000,
        parent_id: null,
        data: {
          has_exam: false,
          should_assign_units: false,
          calculate_unit_progress: false,
        },
      },
    },
    groupType: {
      id: 1,
      name: "Groups ",
      min_age: 13,
      max_age: 30,
      min_count: 14,
      max_count: 14,
      additional_seat: 4,
      color: null,
      group_form: 200,
      status: 100,
      lesson_duration: 4800,
    },
    lessonDay: {
      id: 1,
      name: "Odd days",
      status: 100,
      lessonWeekDayIndexes: ["1", "3", "5"],
    },
    lessonDays: [
      "2024-04-01",
      "2024-04-03",
      "2024-04-05",
      "2024-04-08",
      "2024-04-10",
      "2024-04-12",
      "2024-04-15",
      "2024-04-17",
      "2024-04-19",
      "2024-04-22",
      "2024-04-24",
      "2024-04-26",
      "2024-04-29",
    ],
    lessonTime: {
      id: 2,
      time: "09:00:00",
      duration: null,
    },
    room: {
      id: 131,
      name: "ROOM-12",
      capacity: null,
      status: 100,
      type: 100,
      branch: {
        id: 2,
        name: "Westminster",
        address: "City, Uzbekistan, 14 Istikbol Street, Tashkent 100017",
        landmark: "Международный Вестминстерский Университет в Ташкенте",
        latitude: null,
        longitude: null,
        description: null,
        location_url: "https://g.page/inter_nation_english_school",
        status: 100,
        region_id: 1,
        deleted_at: null,
      },
    },
    teacher: {
      id: 28958,
      type: 100,
      user_id: 106051,
      version_id: 28958,
      user: {
        id: 106051,
        username: "k.sarbinaz",
        email: "a@gmail.com",
        status: 100,
        created_at: "2023-02-18 14:24:49",
        updated_at: "2024-02-19 20:20:23",
        userProfile: {
          user_id: 106051,
          firstname: "Sarbinaz",
          middlename: null,
          lastname: "Koshanova",
          locale: "ru-RU",
          gender: 0,
          description: null,
          bio: null,
          dob: "1998-11-25",
        },
        balance: null,
      },
    },
    support: {
      id: 28959,
      type: 200,
      user_id: 61490,
      version_id: 28959,
      user: {
        id: 61490,
        username: "b.abdirimov",
        email: "a@gmail.com",
        status: 100,
        created_at: "2022-01-12 16:13:21",
        updated_at: "2024-03-27 17:17:46",
        userProfile: {
          user_id: 61490,
          firstname: "Bekhruz",
          middlename: null,
          lastname: "Abdirimov",
          locale: "ru-RU",
          gender: 1,
          description: null,
          bio: null,
          dob: "2001-10-27",
        },
        balance: null,
      },
    },
  };
  return (
    <div>
      <PaymentInfoComp user={user as any} group={group as any} />
    </div>
  );
};

export default PaymentInfo;
