import React from "react";
import { DetailedStudentCard as DetailedStudentCardComp } from "components";

const DetailedStudentCard = () => {
  const data = {
    id: 261893,
    status: 300,
    user: {
      id: 142272,
      username: "a.rakhmatxodjayev",
      email: "a.rakhmatxodjayev@gmail.com",
      status: 100,
      created_at: "2024-01-11 14:43:43",
      updated_at: "2024-02-15 23:02:16",
      userProfile: {
        user_id: 142272,
        firstname: "Abdugofir",
        middlename: null,
        lastname: "Rakhmatxodjayev",
        locale: "uz-UZ",
        gender: 1,
        description: null,
        bio: null,
        dob: "1987-07-01",
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
        user_id: 142272,
        note: "Added 22.01.with Nasrulloh Abdusattorov and \nMuhammadamin Abbosov ",
        status: 200,
        type: 200,
        branch_id: 9,
        source_id: 35,
        updated_at: "2024-01-11 14:43:43",
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
      userLabels: [],
      userPhones: [
        {
          id: 78462,
          type: 100,
          phone_number: "998998445008",
          is_confirmed: 1,
        },
        {
          id: 78463,
          type: 600,
          phone_number: "998983085008",
          is_confirmed: 0,
        },
      ],
    },
    start_date: "2024-01-22",
    added_date: "2024-01-19 00:00:00",
    finish_date: null,
    deleted_at: null,
    actualPayment: {
      id: 206839,
      start_date: "2024-04-01",
      finish_date: "2024-04-29",
      debt: "1500000.00",
      balance: "0.00",
      status: 300,
      lesson_count: 12,
      absence_count: null,
      virtual: false,
      group_contact_id: 261893,
      year: "2024",
      month: "04",
      deleted_at: null,
    },
    group_id: 4138,
    contactResponsibles: [
      {
        id: 118755,
        type: 100,
        user: {
          id: 92843,
          username: "a.said",
          email: "a@gmail.com",
          status: 100,
          created_at: "2022-10-24 20:06:05",
          updated_at: "2024-02-19 21:57:26",
          userProfile: {
            user_id: 92843,
            firstname: "Azimjanov",
            middlename: null,
            lastname: "Said",
            locale: "ru-RU",
            gender: 1,
            description: null,
            bio: null,
            dob: "2001-04-11",
          },
          balance: null,
        },
        contact_id: 261893,
        user_id: 92843,
        datetime: "2024-01-19 11:08:04",
      },
    ],
    student_next_status: null,
    isRedList: false,
    isBlackList: true,
    is_progress: 0,
    group: {
      id: 4138,
      status: 100,
      state: 300,
      note: "FROM FEBRUARY Ikbol Sultonov QOSHILISHI KERE 26.01\n",
      start_date: "2024-01-22",
      finish_date: null,
      version_id: 26073,
      lesson_time_id: 1,
      lesson_day_id: 1,
      group_type_id: 4,
      level_id: 8,
      name: " IND 7:30   Dilobar",
      created_at: "2024-01-19 11:02:04",
      updated_at: "2024-01-22 19:59:37",
      closing_reason: null,
      group_share: null,
      groupMentors: [
        {
          id: 32301,
          type: 100,
          user_id: 71467,
          version_id: 32301,
          user: {
            id: 71467,
            username: "d.yavmutdinova",
            email: "a@gmail.com",
            status: 100,
            created_at: "2022-04-28 18:24:17",
            updated_at: "2024-02-22 13:36:41",
            userProfile: {
              user_id: 71467,
              firstname: "Yavmutdinova",
              middlename: null,
              lastname: "Dilobar",
              locale: "ru-RU",
              gender: 0,
              description: null,
              bio: null,
              dob: "2001-08-04",
            },
            balance: null,
          },
        },
        {
          id: 32302,
          type: 200,
          user_id: 2066,
          version_id: 32302,
          user: {
            id: 2066,
            username: "n.support3",
            email: "a@gmail.com",
            status: 100,
            created_at: "2018-09-04 17:08:48",
            updated_at: "2023-11-11 14:16:51",
            userProfile: {
              user_id: 2066,
              firstname: "NO",
              middlename: null,
              lastname: "SUPPORT",
              locale: "ru-RU",
              gender: null,
              description: null,
              bio: null,
              dob: null,
            },
            balance: null,
          },
        },
      ],
      level: {
        id: 8,
        order: 110000,
        name: "Start",
        duration: 2592000,
        parent_id: 1,
        data: {
          has_exam: true,
          should_assign_units: true,
          calculate_unit_progress: true,
        },
        parent: {
          id: 1,
          order: 100000,
          name: "Beginner",
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
        id: 4,
        name: "Individual 3",
        min_age: 1,
        max_age: 99,
        min_count: 3,
        max_count: 3,
        additional_seat: 0,
        color: null,
        group_form: 100,
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
        id: 1,
        time: "07:30:00",
        duration: null,
      },
      room: {
        id: 216,
        name: "X Room-25",
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
        id: 32301,
        type: 100,
        user_id: 71467,
        version_id: 32301,
        user: {
          id: 71467,
          username: "d.yavmutdinova",
          email: "a@gmail.com",
          status: 100,
          created_at: "2022-04-28 18:24:17",
          updated_at: "2024-02-22 13:36:41",
          userProfile: {
            user_id: 71467,
            firstname: "Yavmutdinova",
            middlename: null,
            lastname: "Dilobar",
            locale: "ru-RU",
            gender: 0,
            description: null,
            bio: null,
            dob: "2001-08-04",
          },
          balance: null,
        },
      },
      support: {
        id: 32302,
        type: 200,
        user_id: 2066,
        version_id: 32302,
        user: {
          id: 2066,
          username: "n.support3",
          email: "a@gmail.com",
          status: 100,
          created_at: "2018-09-04 17:08:48",
          updated_at: "2023-11-11 14:16:51",
          userProfile: {
            user_id: 2066,
            firstname: "NO",
            middlename: null,
            lastname: "SUPPORT",
            locale: "ru-RU",
            gender: null,
            description: null,
            bio: null,
            dob: null,
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
  return (
    <div>
      <DetailedStudentCardComp data={data as any} />
    </div>
  );
};

export default DetailedStudentCard;
