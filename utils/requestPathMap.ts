export default {
  app: "LMS v2 Web",
  projects: {
    hammer: {
      v1: {
        actions: {
          get_count: {
            url: "v1/offence/get-count",
            method: "get",
          },
          get_enums: {
            url: "v1/offence/get-enums",
            method: "get",
          },
          get_survey: {
            url: "v1/survey/get-survey",
            method: "get",
          },
          get_offence: {
            url: "v1/offence/get-offence",
            method: "get",
          },
          get_feedback: {
            url: "v1/feedback/get-feedback",
            method: "get",
          },
          change_status: {
            url: "v1/offence/change-status",
            method: "post",
          },
          get_complaint: {
            url: "v1/complaint/get-complaint",
            method: "get",
          },
          get_month_list: {
            url: "v1/ranking/get-month-list",
            method: "get",
          },
          get_filter_data: {
            url: "v1/offence/get-filter-data",
            method: "get",
          },
          get_my_offences: {
            url: "v1/offence/get-my-offences",
            method: "get",
          },
          create_complaint: {
            url: "v1/complaint/create-complaint",
            method: "post",
          },
          get_ranking_info: {
            url: "v1/ranking/get-ranking-info",
            method: "get",
          },
          get_my_complaints: {
            url: "v1/complaint/get-my-complaints",
            method: "get",
          },
          get_feedback_marks: {
            url: "v1/ranking/get-feedback-marks",
            method: "get",
          },
          get_survey_session: {
            url: "v1/survey/get-survey-session",
            method: "get",
          },
          save_result_survey: {
            url: "v1/survey/save-result-survey",
            method: "post",
          },
          get_complaint_enums: {
            url: "v1/complaint/get-enums",
            method: "get",
          },
          get_rating_by_class: {
            url: "v1/ranking/get-rating-by-class",
            method: "get",
          },
          get_my_offence_types: {
            url: "v1/offence/get-my-offence-types",
            method: "get",
          },
          get_offences_by_head: {
            url: "v1/offence/get-offences-by-head",
            method: "get",
          },
          save_feedback_result: {
            url: "v1/feedback/save-result",
            method: "post",
          },
          get_available_session: {
            url: "v1/survey/available-session",
            method: "get",
          },
          get_feedback_sessions: {
            url: "v1/feedback/get-sessions",
            method: "get",
          },
          save_result_survey_v2: {
            url: "v1/survey/save-result-survey-v2",
            method: "post",
          },
          complaint_change_status: {
            url: "v1/complaint/change-status",
            method: "post",
          },
          create_feedback_session: {
            url: "v1/feedback/create-session",
            method: "post",
          },
          get_complaint_categories: {
            url: "v1/complaint/get-complaint-categories",
            method: "get",
          },
          get_offence_type_by_role: {
            url: "v1/offence/get-offence-type-by-role",
            method: "get",
          },
          get_rating_by_survey_item: {
            url: "v1/ranking/get-rating-by-survey-item",
            method: "get",
          },
          get_feedback_question_item: {
            url: "v1/feedback/get-question-item",
            method: "get",
          },
          get_unread_complaint_count: {
            url: "v1/complaint/get-unread-count",
            method: "get",
          },
          client_get_feedback: {
            url: "client/v1/feedback/feedback/get-feedback",
            method: "get",
          },
          client_save_feedback_result: {
            url: "client/v1/feedback/feedback/save-result",
            method: "post",
          },
          client_get_feedback_sessions: {
            url: "client/v1/feedback/feedback/get-sessions",
            method: "get",
          },
          get_survey_result: {
            url: "admin/v1/survey/survey-result/index",
            method: "get",
          },
          get_survey_statistics: {
            url: "admin/v1/survey/survey-result/log-statistics",
            method: "get",
          },
          admin_offence_type_index: {
            url: "admin/v1/offence/offence-type/index",
            method: "get",
          },
          admin_offence_type_create: {
            url: "admin/v1/offence/offence-type/create",
            method: "post",
          },
          admin_offence_type_update: {
            url: "admin/v1/offence/offence-type/update",
            method: "post",
          },
          admin_offence_type_delete: {
            url: "admin/v1/offence/offence-types/delete",
            method: "get",
          },
          admin_offence_head_index: {
            url: "admin/v1/offence/offence-head/index",
            method: "get",
          },
          admin_offence_head_create: {
            url: "admin/v1/offence/offence-head/create",
            method: "post",
          },
          admin_offence_head_update: {
            url: "admin/v1/offence/offence-head/update",
            method: "post",
          },
          admin_offence_head_delete: {
            url: "admin/v1/offence/offence-head/delete",
            method: "get",
          },
          admin_offence_view_config_index: {
            url: "admin/v1/offence/offence-view-config/index",
            method: "get",
          },
          admin_offence_view_config_create: {
            url: "admin/v1/offence/offence-view-config/create",
            method: "post",
          },
          admin_offence_view_config_update: {
            url: "admin/v1/offence/offence-view-config/update",
            method: "post",
          },
          admin_offence_view_config_delete: {
            url: "admin/v1/offence/offence-view-config/delete",
            method: "get",
          },
          admin_offence_get_departments: {
            url: "admin/v1/offence/department-offences/get-departments",
            method: "get",
          },
          admin_department_offences_index: {
            url: "admin/v1/offence/department-offences/index",
            method: "get",
          },
          admin_department_offences_create: {
            url: "admin/v1/offence/department-offences/create",
            method: "post",
          },
          admin_department_offences_update: {
            url: "admin/v1/offence/department-offences/update",
            method: "post",
          },
          admin_department_offences_delete: {
            url: "admin/v1/offence/department-offences/delete",
            method: "get",
          },
          admin_offence_index: {
            url: "admin/v1/offence/offence/index",
            method: "get",
          },
          admin_get_offence_types: {
            url: "admin/v1/offence/offence/get-offence-types",
            method: "get",
          },
          admin_offence_create: {
            url: "admin/v1/offence/offence/create",
            method: "post",
          },
          admin_offence_get_description: {
            url: "admin/v1/offence/offence/get-description",
            method: "get",
          },
          admin_complaint_category_create: {
            url: "admin/v1/complaint/complaint-category/create",
            method: "post",
          },
          admin_complaint_category_update: {
            url: "admin/v1/complaint/complaint-category/update",
            method: "post",
          },
          admin_complaint_category_delete: {
            url: "admin/v1/complaint/complaint-category/delete",
            method: "get",
          },
          admin_complaint_category_index: {
            url: "admin/v1/complaint/complaint-category/index",
            method: "get",
          },
          admin_complaint_get_my_complaints: {
            url: "admin/v1/complaint/complaint/get-my-complaints",
            method: "get",
          },
          admin_complaint_get_complaint: {
            url: "admin/v1/complaint/complaint/get-complaint",
            method: "get",
          },
          admin_complaint_create: {
            url: "admin/v1/complaint/complaint/create",
            method: "post",
          },
          admin_complaint_update: {
            url: "admin/v1/complaint/complaint/upload",
            method: "post",
          },
          admin_complaint_change_status: {
            url: "admin/v1/complaint/complaint/change-status",
            method: "post",
          },
          admin_complaint_get_enums: {
            url: "admin/v1/complaint/complaint/get-enums",
            method: "get",
          },
          admin_feedback_question_item_create: {
            url: "admin/v1/feedback/feedback-question-item/create",
            method: "post",
          },
          admin_feedback_question_item_update: {
            url: "admin/v1/feedback/feedback-question-item/update",
            method: "post",
          },
          admin_feedback_question_item_delete: {
            url: "admin/v1/feedback/feedback-question-item/delete",
            method: "get",
          },
          admin_feedback_question_item_index: {
            url: "admin/v1/feedback/feedback-question-item/index",
            method: "get",
          },
          admin_feedback_question_create: {
            url: "admin/v1/feedback/feedback-question/create",
            method: "post",
          },
          admin_feedback_question_update: {
            url: "admin/v1/feedback/feedback-question/update",
            method: "post",
          },
          admin_feedback_question_delete: {
            url: "admin/v1/feedback/feedback-question/delete",
            method: "get",
          },
          admin_feedback_question_index: {
            url: "admin/v1/feedback/feedback-question/index",
            method: "get",
          },
          admin_feedback_result: {
            url: "admin/v1/feedback/feedback-result/index",
            method: "get",
          },
          admin_feedback_index: {
            url: "admin/v1/feedback/feedback/index",
            method: "get",
          },
          admin_feedback_delete: {
            url: "admin/v1/feedback/feedback/delete",
            method: "get",
          },
          admin_feedback_create: {
            url: "admin/v1/feedback/feedback/create",
            method: "post",
          },
          admin_feedback_update: {
            url: "admin/v1/feedback/feedback/update",
            method: "post",
          },
          admin_survey_item_create: {
            url: "admin/v1/survey/survey-item/create",
            method: "post",
          },
          admin_survey_item_update: {
            url: "admin/v1/survey/survey-item/update",
            method: "post",
          },
          admin_survey_item_delete: {
            url: "admin/v1/survey/survey-item/delete",
            method: "get",
          },
          admin_survey_item_index: {
            url: "admin/v1/survey/survey-item/index",
            method: "get",
          },
          admin_survey_result: {
            url: "admin/v1/survey/survey-result/index",
            method: "get",
          },
          admin_survey_index: {
            url: "admin/v1/survey/survey/index",
            method: "get",
          },
          admin_survey_delete: {
            url: "admin/v1/survey/survey/delete",
            method: "get",
          },
          admin_survey_create: {
            url: "admin/v1/survey/survey/create",
            method: "post",
          },
          admin_survey_update: {
            url: "admin/v1/survey/survey/update",
            method: "post",
          },
          client_ranking_get_month_list: {
            url: "client/v1/ranking/ranking/get-month-list",
            method: "get",
          },
          client_ranking_get_ranking_info: {
            url: "client/v1/ranking/ranking/get-ranking-info",
            method: "get",
          },
          client_ranking_get_rating_by_class: {
            url: "client/v1/ranking/ranking/get-rating-by-class",
            method: "get",
          },
          client_ranking_get_rating_by_survey_item: {
            url: "client/v1/ranking/ranking/get-rating-by-survey-item",
            method: "get",
          },
          client_feedback_available_session: {
            url: "client/v1/feedback/feedback/available-session",
            method: "get",
          },
          client_ranking_get_feedback_results: {
            url: "client/v1/ranking/ranking/get-feedback-results",
            method: "get",
          },
        },
      },
    },
    task: {
      v1: {
        actions: {
          create: {
            url: "task/task/create",
            method: "post",
          },
          get_task: {
            url: "task/task/get-task",
            method: "get",
          },
          get_enums: {
            url: "task/task/get-enums",
            method: "get",
          },
          get_tasks: {
            url: "task/task/get-tasks",
            method: "get",
          },
          change_state: {
            url: "task/task/change-state",
            method: "post",
          },
          upload_delete: {
            url: "task/task/upload-delete",
            method: "get",
          },
          get_statistics: {
            url: "task/task/get-statistics",
            method: "get",
          },
          change_responsible: {
            url: "task/task/change-responsible",
            method: "post",
          },
          get_task_categories: {
            url: "task/task-category/get-task-categories",
            method: "get",
          },
          get_responsible_users: {
            url: "task/task/get-responsible-users",
            method: "get",
          },
          can_assign_responsible: {
            url: "task/task/can-assign-responsible",
            method: "get",
          },
          update: {
            url: "task/task/update",
            method: "post",
          },
          system_create_task: {
            url: "system/v1/task/task/create",
            method: "post",
          },
          system_get_task_categories: {
            url: "system/v1/task/task-category/index",
            method: "get",
          },
          system_change_state: {
            url: "system/v1/task/task/change-state",
            method: "post",
          },
          admin_task_get_enums: {
            url: "admin/v1/task/task/get-enums",
            method: "get",
          },
          admin_task_get_tasks: {
            url: "admin/v1/task/task/get-tasks",
            method: "get",
          },
          admin_task_index: {
            url: "admin/v1/task/task/index",
            method: "get",
          },
          admin_task_get_task: {
            url: "admin/v1/task/task/get-task",
            method: "get",
          },
          admin_task_can_assign_responsible: {
            url: "admin/v1/task/task/can-assign-responsible",
            method: "get",
          },
          admin_task_change_responsible: {
            url: "admin/v1/task/task/change-responsible",
            method: "post",
          },
          admin_task_get_responsible_users: {
            url: "admin/v1/task/task/get-responsible-users",
            method: "get",
          },
          admin_task_create: {
            url: "admin/v1/task/task/create",
            method: "post",
          },
          admin_task_update: {
            url: "admin/v1/task/task/update",
            method: "post",
          },
          admin_task_change_state: {
            url: "admin/v1/task/task/change-state",
            method: "post",
          },
          admin_task_category_index: {
            url: "admin/v1/task/task-category/index",
            method: "get",
          },
          admin_task_category_get_task_categories: {
            url: "admin/v1/task/task-category/get-task-categories",
            method: "get",
          },
          admin_task_category_get_task_category: {
            url: "admin/v1/task/task-category/get-task-category",
            method: "get",
          },
          admin_task_category_delete: {
            url: "admin/v1/task/task-category/delete",
            method: "get",
          },
          admin_task_category_restore: {
            url: "admin/v1/task/task-category/restore",
            method: "get",
          },
          admin_task_category_create: {
            url: "admin/v1/task/task-category/create",
            method: "post",
          },
          admin_task_category_update: {
            url: "admin/v1/task/task-category/update",
            method: "post",
          },
          admin_task_category_reassignment: {
            url: "admin/v1/task/task-category/reassignment",
            method: "post",
          },
          admin_task_category_create_responsible: {
            url: "admin/v1/task/task-category/create-responsible",
            method: "post",
          },
          admin_task_category_update_responsible: {
            url: "admin/v1/task/task-category/update-responsible",
            method: "post",
          },
          client_task_get_enums: {
            url: "client/v1/task/task/get-enums",
            method: "get",
          },
          client_task_get_tasks: {
            url: "client/v1/task/task/get-tasks",
            method: "get",
          },
          client_task_index: {
            url: "client/v1/task/task/index",
            method: "get",
          },
          client_task_get_task: {
            url: "client/v1/task/task/get-task",
            method: "get",
          },
          client_task_can_assign_responsible: {
            url: "client/v1/task/task/can-assign-responsible",
            method: "get",
          },
          client_task_change_responsible: {
            url: "client/v1/task/task/change-responsible",
            method: "post",
          },
          client_task_get_responsible_users: {
            url: "client/v1/task/task/get-responsible-users",
            method: "get",
          },
          client_task_create: {
            url: "client/v1/task/task/create",
            method: "post",
          },
          client_task_update: {
            url: "client/v1/task/task/update",
            method: "post",
          },
          client_task_change_state: {
            url: "client/v1/task/task/change-state",
            method: "post",
          },
          client_task_category_get_task_categories: {
            url: "client/v1/task/task-category/get-task-categories",
            method: "get",
          },
          client_task_category_get_task_category: {
            url: "client/v1/task/task-category/get-task-category",
            method: "get",
          },
          client_task_category_index: {
            url: "client/v1/task/task-category/index",
            method: "get",
          },
          system_task_get_enums: {
            url: "system/v1/task/task/get-enums",
            method: "get",
          },
        },
      },
    },
    application: {
      v1: {
        actions: {
          get_faq: {
            url: "application-v2/application/get-faq",
            method: "get",
          },
          get_page: {
            url: "application-v2/application/get-page",
            method: "get",
          },
          send_bug: {
            url: "application-v2/send-notification/send-bug",
            method: "post",
          },
          get_enums: {
            url: "application-v2/application/get-enums",
            method: "get",
          },
          set_online: {
            url: "application-v2/online/set-online",
            method: "post",
          },
          get_onlines: {
            url: "application-v2/online/get-onlines",
            method: "get",
          },
          get_contacts: {
            url: "application-v2/application/get-contacts",
            method: "get",
          },
          get_last_active: {
            url: "application-v2/online/get-last-active",
            method: "get",
          },
          get_applications: {
            url: "application-v2/online/get-applications",
            method: "get",
          },
          is_stable_version: {
            url: "application-v2/version/is-stable-version",
            method: "get",
          },
          get_my_notifications: {
            url: "application-v2/notification/get-my-notifications",
            method: "get",
          },
          save_target_for_mobile: {
            url: "application-v2/target/save-target-for-mobile",
            method: "post",
          },
          get_my_notifications_v2: {
            url: "application-v2/notification/get-my-notifications-v2",
            method: "get",
          },
          send_notification_by_topic: {
            url: "application-v2/send-notification/by-topic",
            method: "post",
          },
          send_notification_by_user_id: {
            url: "application-v2/send-notification/by-user-id",
            method: "post",
          },
          send_notification_for_survey: {
            url: "application-v2/send-notification/for-survey",
            method: "post",
          },
          send_notification_by_department: {
            url: "application-v2/send-notification/by-department",
            method: "post",
          },
          send_notification_by_batch: {
            url: "application-v2/send-notification/by-batch",
            method: "post",
          },
          get_notification_by_id: {
            url: "application-v2/notification/get-notification-by-id",
            method: "get",
          },
        },
      },
    },
    hr: {
      v1: {
        actions: {
          get_profile: {
            url: "/candidate/get-profile",
            method: "get",
          },
          get_profiles: {
            url: "/candidate/get-profiles",
            method: "get",
          },
        },
      },
    },
    ars: {
      v1: {
        actions: {
          add_word: {
            url: "v1/vocabulary/added-words/create",
            method: "post",
          },
          get_orders: {
            url: "v1/shop/orders",
            method: "get",
          },
          delete_word: {
            url: "v1/vocabulary/added-words/delete",
            method: "post",
          },
          get_product: {
            url: "v1/shop/products",
            method: "get",
          },
          repeat_words: {
            url: "v1/vocabulary/repeat",
            method: "post",
          },
          search_words: {
            url: "v1/vocabulary/search",
            method: "get",
          },
          get_unit_info: {
            url: "v1/unit",
            method: "get",
          },
          movie_watched: {
            url: "v1/unit/activity/movie-watched",
            method: "get",
          },
          order_product: {
            url: "v1/shop/orders/create",
            method: "post",
          },
          get_unit_words: {
            url: "v1/vocabulary/unit/words",
            method: "get",
          },
          theory_watched: {
            url: "v1/unit/activity/theory-watched",
            method: "get",
          },
          get_group_units: {
            url: "v1/group/unit/index",
            method: "get",
          },
          get_round_words: {
            url: "v1/unit/round/words",
            method: "get",
          },
          get_topic_words: {
            url: "v1/vocabulary/topic/words",
            method: "get",
          },
          get_user_skills: {
            url: "v1/ranking/skills/index",
            method: "get",
          },
          get_failed_words: {
            url: "v1/vocabulary/failed-words",
            method: "get",
          },
          get_word_options: {
            url: "v1/vocabulary/train/word-options",
            method: "post",
          },
          open_group_units: {
            url: "v1/group/unit/open",
            method: "post",
          },
          get_unit_info_base: {
            url: "v1/unit/unit/view",
            method: "get",
          },
          train_unit_words: {
            url: "v1/vocabulary/train/unit-words",
            method: "post",
          },
          close_group_units: {
            url: "v1/group/unit/close",
            method: "post",
          },
          get_group_marking: {
            url: "v1/ranking/group/marking",
            method: "get",
          },
          report_about_word: {
            url: "v1/user/report/word",
            method: "post",
          },
          train_topic_words: {
            url: "v1/vocabulary/train/topic-words",
            method: "post",
          },
          delete_added_words: {
            url: "v1/vocabulary/added-words/delete-words",
            method: "post",
          },
          get_group_students: {
            url: "v1/group/student/index",
            method: "get",
          },
          get_resources_list: {
            url: "v1/library/resources/list",
            method: "get",
          },
          get_round_exercise: {
            url: "v1/unit/round/exercise",
            method: "get",
          },
          get_student_rating: {
            url: "v1/ranking/students/student",
            method: "get",
          },
          get_intro_video_url: {
            url: "v1/student/profile/intro-video-url",
            method: "get",
          },
          get_student_profile: {
            url: "v1/student/profile",
            method: "get",
          },
          get_group_date_units: {
            url: "v1/group/assign/units",
            method: "post",
          },
          get_student_progress: {
            url: "v1/student/profile/progress",
            method: "get",
          },
          get_students_ranking: {
            url: "v1/ranking/students",
            method: "get",
          },
          get_unit_words_count: {
            url: "v1/vocabulary/unit/words-count",
            method: "get",
          },
          save_exercise_result: {
            url: "v1/unit/activity/save-exercise-result",
            method: "post",
          },
          check_exercise_fields: {
            url: "v1/exercise/check/fields",
            method: "post",
          },
          get_popular_resources: {
            url: "v1/library/resources/popular",
            method: "get",
          },
          get_topic_words_count: {
            url: "v1/vocabulary/topic/words-count",
            method: "get",
          },
          report_about_exercise: {
            url: "v1/user/report/exercise",
            method: "post",
          },
          check_added_word_exist: {
            url: "v1/vocabulary/added-words/check-word-exist",
            method: "post",
          },
          get_topic_word_options: {
            url: "v1/vocabulary/train/topic-word-options",
            method: "post",
          },
          get_group_days: {
            url: "v1/group/unit/days",
            method: "get",
          },
          update_student_profile: {
            url: "v1/student/profile/update",
            method: "post",
          },
          get_added_words_by_year: {
            url: "v1/vocabulary/added-words",
            method: "get",
          },
          get_user_skills_by_unit: {
            url: "v1/ranking/skills/by-unit",
            method: "get",
          },
          get_level_units: {
            url: "v1/unit/unit/index",
            method: "get",
          },
          get_added_words_by_month: {
            url: "v1/vocabulary/added-words/by-month",
            method: "get",
          },
          get_products_by_category: {
            url: "v1/shop/products/by-category",
            method: "get",
          },
          get_recommended_products: {
            url: "v1/shop/products/recommended",
            method: "get",
          },
          get_student_transactions: {
            url: "v1/student/transactions/index",
            method: "get",
          },
          get_group_student_scores: {
            url: "v1/group/student/scores",
            method: "get",
          },
          get_recommended_resources: {
            url: "v1/library/resources/recommended",
            method: "get",
          },
          get_student_transactions_by_dates: {
            url: "v1/student/transactions/dates",
            method: "get",
          },
          get_robot_chats: {
            url: "v1/chat/robot/index",
            method: "get",
          },
          new_robot_question: {
            url: "v1/chat/robot/question",
            method: "post",
          },
          read_robot_messages: {
            url: "v1/chat/robot/read-messages",
            method: "post",
          },
          get_ielts_task_parts: {
            url: "v1/ielts/task-part/index",
            method: "get",
          },
          get_ielts_topics: {
            url: "v1/ielts/topic/index",
            method: "get",
          },
          get_student_tasks_by_part: {
            url: "v1/ielts/student/tasks-by-part",
            method: "get",
          },
          submit_ielts_task: {
            url: "v1/ielts/student/answer",
            method: "post",
          },
          get_student_ielts_tasks: {
            url: "v1/ielts/student/tasks",
            method: "get",
          },
          get_student_ielts_topic_progress: {
            url: "v1/ielts/progress/topic",
            method: "get",
          },
          get_waiting_battles: {
            url: "v1/battle/battle/waiting",
            method: "get",
          },
          join_battle: {
            url: "v1/battle/student/request",
            method: "get",
          },
          get_battle_units: {
            url: "v1/battle/battle/units",
            method: "get",
          },
          complete_battle: {
            url: "v1/battle/student/complete",
            method: "post",
          },
          get_battle_results: {
            url: "v1/battle/battle/results",
            method: "get",
          },
          exit_battle: {
            url: "v1/battle/student/exit",
            method: "get",
          },
          get_student_learned_words: {
            url: "v1/student/progress/learned-words",
            method: "get",
          },
          get_student_watched_videos: {
            url: "v1/student/progress/watched-videos",
            method: "get",
          },
          get_student_learned_exercises: {
            url: "v1/student/progress/learned-exercises",
            method: "get",
          },
          get_group_learned_words: {
            url: "v1/group/progress/learned-words",
            method: "get",
          },
          get_group_watched_videos: {
            url: "v1/group/progress/watched-videos",
            method: "get",
          },
          get_group_learned_exercises: {
            url: "v1/group/progress/learned-exercises",
            method: "get",
          },
          get_exercise_questions: {
            url: "v1/unit/unit/questions",
            method: "get",
          },
          get_words: {
            url: "v1/unit/unit/words",
            method: "get",
          },
          get_teacher_score: {
            url: "v1/teacher/score/index",
            method: "get",
          },
          get_group_info: {
            url: "v1/group/info/index",
            method: "get",
          },
          get_user_info: {
            url: "v1/user/profile/view",
            method: "get",
          },
          update_user_info: {
            url: "v1/user/profile/update",
            method: "post",
          },
          register_device: {
            url: "v1/exam/device/register",
            method: "post",
          },
          connect_to_process: {
            url: "v1/exam/device/connect-to-process",
            method: "post",
          },
          get_device_session: {
            url: "v1/exam/device/session",
            method: "post",
          },
          clear_device_session: {
            url: "v1/exam/device/clear",
            method: "post",
          },
          get_exam_dates: {
            url: "v1/exam/exam/dates",
            method: "get",
          },
          get_exam_groups: {
            url: "v1/exam/exam/groups",
            method: "get",
          },
          get_exam_stats: {
            url: "v1/exam/exam/stats",
            method: "get",
          },
          get_exam_group: {
            url: "v1/system/exam/exam/group",
            method: "get",
          },
          get_exam_need_checks: {
            url: "v1/exam/exam/need-checks",
            method: "get",
          },
          get_exam_paper: {
            url: "v1/exam/process/paper",
            method: "get",
          },
          start_exam: {
            url: "v1/exam/process/start",
            method: "get",
          },
          save_exam_answer: {
            url: "v1/exam/process/save-answer",
            method: "post",
          },
          stop_exam: {
            url: "v1/exam/process/stop",
            method: "get",
          },
          change_process_status: {
            url: "v1/exam/student/change-status",
            method: "post",
          },
          get_student_process: {
            url: "v1/exam/student/process",
            method: "get",
          },
          change_exam_score: {
            url: "v1/exam/student/change-score",
            method: "post",
          },
          rate_need_check: {
            url: "v1/exam/student/rate-need-check",
            method: "post",
          },
          get_exam_permissions: {
            url: "v1/exam/exam/permissions",
            method: "get",
          },
          get_exam_need_checks_by_group: {
            url: "v1/exam/exam/need-checks-by-group",
            method: "get",
          },
          save_word_activity: {
            url: "v1/unit/activity/save-words",
            method: "post",
          },
          set_attendance: {
            url: "v1/exam/student/set-attendance",
            method: "post",
          },
          get_exam_students: {
            url: "v1/exam/exam/students",
            method: "get",
          },
          system_exam_user_index: {
            url: "v1/system/exam/user/index",
            method: "get",
          },
          system_exam_exam_dates: {
            url: "v1/system/exam/exam/dates",
            method: "get",
          },
          system_student_homeworks: {
            url: "v1/system/student/homework/index",
            method: "get",
          },
          get_group_unit_assign_info: {
            url: "v1/group/assign/info",
            method: "post",
          },
          system_student_not_done: {
            url: "v1/system/student/homework/not-done",
            method: "post",
          },
          system_student_search_one: {
            url: "v1/system/student/search/one",
            method: "get",
          },
          system_stats_student_unit_progress: {
            url: "v1/system/stats/progress/student-unit",
            method: "get",
          },
          v1_system_exam_exam_stats: {
            url: "v1/system/exam/exam/stats",
            method: "get",
          },
          v1_system_exam_exam_groups: {
            url: "v1/system/exam/exam/groups",
            method: "get",
          },
          system_stats_academic_progress: {
            url: "v1/system/stats/progress/academic",
            method: "get",
          },
          v1_system_exam_process_change_comment: {
            url: "v1/system/exam/process/change-comment",
            method: "post",
          },
          v1_system_exam_process_change_status: {
            url: "v1/system/exam/process/change-status",
            method: "post",
          },
          system_group_index: {
            url: "v1/system/group/group/index",
            method: "get",
          },
          get_web_unit_info: {
            url: "v1/unit/default/web",
            method: "get",
          },
          v1_student_exam_index: {
            url: "v1/student/exam/index",
            method: "get",
          },
          v1_student_exam_view: {
            url: "v1/student/exam/view",
            method: "get",
          },
          teacher_progress_academic: {
            url: "v1/teacher/progress/academic",
            method: "get",
          },
          key_used: {
            url: "v1/unit/default/key-used",
            method: "post",
          },
          v1_exam_see: {
            url: "v1/exam/exam/see",
            method: "get",
          },
          system_student_unfinished_unit: {
            url: "v1/system/student/homework/unfinished-unit",
            method: "get",
          },
          unit_available_key: {
            url: "v1/unit/default/available-key",
            method: "get",
          },
          system_homework_unfinished_group: {
            url: "v1/system/student/homework/unfinished-group",
            method: "get",
          },
          system_group_preview_date: {
            url: "v1/system/group/group/preview-date",
            method: "post",
          },
          system_student_profile_shop: {
            url: "v1/system/student/profile/shop",
            method: "get",
          },
          system_student_profile_progress: {
            url: "v1/system/student/profile/progress",
            method: "get",
          },
          system_student_profile_exam: {
            url: "v1/system/student/profile/exam",
            method: "get",
          },
          system_student_profile_skill_by_unit: {
            url: "v1/system/student/profile/skill-by-unit",
            method: "get",
          },
          system_student_profile_topic_words_count: {
            url: "v1/system/student/profile/topic-words-count",
            method: "get",
          },
        },
      },
    },
    event: {
      v1: {
        actions: {
          get_enums: {
            url: "v1/event/get-enums",
            method: "get",
          },
          get_event: {
            url: "v1/event/get-event",
            method: "get",
          },
          get_events: {
            url: "v1/event/get-events",
            method: "get",
          },
          event_registration: {
            url: "v1/event/event-registration",
            method: "post",
          },
          admin_event_index: {
            url: "admin/v1/event/event/index",
            method: "get",
          },
          admin_event_create: {
            url: "admin/v1/event/event/create",
            method: "post",
          },
          admin_event_update: {
            url: "admin/v1/event/event/update",
            method: "post",
          },
          admin_event_get_event: {
            url: "admin/v1/event/event/get-event",
            method: "get",
          },
          admin_event_change_status: {
            url: "admin/v1/event/event/change-status",
            method: "get",
          },
          admin_event_send_notification: {
            url: "admin/v1/event/event/notification",
            method: "get",
          },
          admin_event_link_type_index: {
            url: "admin/v1/event/event-link-type/index",
            method: "get",
          },
          admin_event_link_type_create: {
            url: "admin/v1/event/event-link-type/create",
            method: "post",
          },
          admin_event_link_type_update: {
            url: "admin/v1/event/event-link-type/update",
            method: "post",
          },
          admin_event_link_type_delete: {
            url: "admin/v1/event/event-link-type/delete",
            method: "get",
          },
          admin_event_post_index: {
            url: "admin/v1/event/event-post/index",
            method: "get",
          },
          admin_event_post_create: {
            url: "admin/v1/event/event-post/create",
            method: "post",
          },
          admin_event_post_update: {
            url: "admin/v1/event/event-post/update",
            method: "post",
          },
          admin_event_post_delete: {
            url: "admin/v1/event/event-post/delete",
            method: "get",
          },
          system_event_get_enums: {
            url: "system/v1/event/event/get-enums",
            method: "get",
          },
        },
      },
    },
    "lms-v2": {
      v1: {
        actions: {
          admin_user_me: {
            url: "admin/v1/user/user/me",
            method: "get",
          },
          admin_lead_view: {
            url: "admin/v1/lead/lead/view",
            method: "get",
          },
          admin_auth_login: {
            url: "admin/v1/auth/login",
            method: "post",
          },
          admin_group_view: {
            url: "admin/v1/group/group/view",
            method: "get",
          },
          admin_lead_index: {
            url: "admin/v1/lead/lead/index",
            method: "get",
          },
          system_user_list: {
            url: "system/v1/user/user",
            method: "get",
          },
          admin_group_index: {
            url: "admin/v1/group/group/index",
            method: "get",
          },
          admin_lead_change: {
            url: "admin/v1/lead/lead/change",
            method: "put",
          },
          admin_lead_create: {
            url: "admin/v1/lead/lead/create",
            method: "post",
          },
          admin_lead_delete: {
            url: "admin/v1/lead/lead/delete",
            method: "delete",
          },
          admin_lead_update: {
            url: "admin/v1/lead/lead/update",
            method: "put",
          },
          admin_student_sms: {
            url: "admin/v1/student/sms/index",
            method: "get",
          },
          admin_expense_list: {
            url: "admin/v1/finance/expense",
            method: "get",
          },
          admin_expense_view: {
            url: "admin/v1/finance/expense/view",
            method: "get",
          },
          admin_group_create: {
            url: "admin/v1/group/group/create",
            method: "post",
          },
          admin_group_delete: {
            url: "admin/v1/group/group/delete",
            method: "delete",
          },
          admin_group_update: {
            url: "admin/v1/group/group/update",
            method: "put",
          },
          admin_lead_history: {
            url: "admin/v1/lead/lead/history",
            method: "get",
          },
          admin_student_list: {
            url: "admin/v1/student/student/index",
            method: "get",
          },
          admin_student_view: {
            url: "admin/v1/student/student/view",
            method: "get",
          },
          client_staff_login: {
            url: "client/v1/auth/auth/staff-login",
            method: "post",
          },
          system_group_dates: {
            url: "system/v1/group/group/dates",
            method: "get",
          },
          system_group_index: {
            url: "system/v1/group/group/index",
            method: "get",
          },
          admin_global_search: {
            url: "admin/v1/company/global/search",
            method: "get",
          },
          admin_lead_tab_view: {
            url: "admin/v1/lead/lead-tab/view",
            method: "get",
          },
          admin_sms_cron_save: {
            url: "admin/v1/sms/cron/save",
            method: "post",
          },
          admin_student_group: {
            url: "admin/v1/student/student/group",
            method: "get",
          },
          client_staff_get_me: {
            url: "client/v1/staff/user/get-me",
            method: "get",
          },
          system_company_room: {
            url: "system/v1/company/room",
            method: "get",
          },
          admin_expense_create: {
            url: "/admin/v1/finance/expense/create",
            method: "post",
          },
          admin_expense_delete: {
            url: "admin/v1/finance/expense/delete",
            method: "delete",
          },
          admin_expense_update: {
            url: "admin/v1/finance/expense/update",
            method: "put",
          },
          admin_lead_tab_index: {
            url: "admin/v1/lead/lead-tab/index",
            method: "get",
          },
          admin_rbac_role_view: {
            url: "admin/v1/rbac/role/view",
            method: "get",
          },
          admin_sms_cron_index: {
            url: "admin/v1/sms/cron/page-data",
            method: "get",
          },
          admin_student_create: {
            url: "admin/v1/student/student/create",
            method: "post",
          },
          admin_student_delete: {
            url: "admin/v1/student/student/delete",
            method: "post",
          },
          admin_student_update: {
            url: "admin/v1/student/student/update",
            method: "put",
          },
          client_student_login: {
            url: "client/v1/auth/auth/login",
            method: "post",
          },
          system_staff_teacher: {
            url: "system/v1/staff/teacher",
            method: "get",
          },
          admin_lead_add_to_tab: {
            url: "admin/v1/lead/lead/add-to-tab",
            method: "post",
          },
          admin_lead_tab_create: {
            url: "admin/v1/lead/lead-tab/create",
            method: "post",
          },
          admin_lead_tab_delete: {
            url: "admin/v1/lead/lead-tab/delete",
            method: "get",
          },
          admin_lead_tab_update: {
            url: "admin/v1/lead/lead-tab/update",
            method: "put",
          },
          admin_rbac_role_index: {
            url: "admin/v1/rbac/role/index",
            method: "get",
          },
          admin_rbac_shift_view: {
            url: "admin/v1/rbac/shift/view",
            method: "get",
          },
          admin_student_payment: {
            url: "admin/v1/student/student/payment",
            method: "get",
          },
          client_reset_password: {
            url: "client/v1/auth/password-reset/reset",
            method: "post",
          },
          system_company_branch: {
            url: "system/v1/company/branch",
            method: "get",
          },
          system_student_search: {
            url: "system/v1/student/student/search",
            method: "get",
          },
          admin_lead_change_name: {
            url: "admin/v1/lead/lead/change-name",
            method: "put",
          },
          admin_lead_mark_action: {
            url: "admin/v1/lead/lead/mark-action",
            method: "post",
          },
          admin_lead_search_data: {
            url: "admin/v1/lead/lead/search-data",
            method: "get",
          },
          admin_rbac_role_create: {
            url: "admin/v1/rbac/role/create",
            method: "post",
          },
          admin_rbac_role_delete: {
            url: "admin/v1/rbac/role/delete",
            method: "delete",
          },
          admin_rbac_role_update: {
            url: "admin/v1/rbac/role/update",
            method: "put",
          },
          admin_rbac_shift_index: {
            url: "admin/v1/rbac/shift/index",
            method: "get",
          },
          admin_student_send_sms: {
            url: "admin/v1/student/sms/send-sms",
            method: "post",
          },
          client_change_password: {
            url: "client/v1/auth/auth/change-password",
            method: "post",
          },
          system_company_details: {
            url: "system/v1/company/company/details",
            method: "get",
          },
          system_student_details: {
            url: "system/v1/student/student/details",
            method: "get",
          },
          admin_finance_cash_flow: {
            url: "admin/v1/finance/cash-flow",
            method: "get",
          },
          admin_finance_statistic: {
            url: "admin/v1/finance/statistic/index",
            method: "get",
          },
          admin_group_change_note: {
            url: "admin/v1/group/group/change-note",
            method: "post",
          },
          admin_rbac_shift_create: {
            url: "admin/v1/rbac/shift/create",
            method: "post",
          },
          admin_rbac_shift_delete: {
            url: "admin/v1/rbac/shift/delete",
            method: "delete",
          },
          admin_rbac_shift_update: {
            url: "admin/v1/rbac/shift/update",
            method: "put",
          },
          admin_sms_template_view: {
            url: "admin/v1/sms/template/view",
            method: "get",
          },
          admin_student_label_add: {
            url: "admin/v1/student/label/add",
            method: "post",
          },
          client_book_office_hour: {
            url: "client/v1/student/office-hour/book",
            method: "post",
          },
          client_group_attendance: {
            url: "client/v1/group/group/attendance",
            method: "get",
          },
          client_teacher_set_podo: {
            url: "client/v1/staff/mentor/set-podo",
            method: "post",
          },
          admin_group_change_state: {
            url: "admin/v1/group/group/change-state",
            method: "post",
          },
          admin_group_initial_page: {
            url: "admin/v1/group/group/group-initial-page",
            method: "get",
          },
          admin_lead_change_status: {
            url: "admin/v1/lead/lead/change-status",
            method: "put",
          },
          admin_sms_exclusion_save: {
            url: "admin/v1/sms/exclusion/save",
            method: "post",
          },
          admin_sms_exclusion_view: {
            url: "admin/v1/sms/exclusion/view",
            method: "get",
          },
          admin_sms_send_page_data: {
            url: "admin/v1/sms/sms/page-data",
            method: "get",
          },
          admin_sms_template_index: {
            url: "admin/v1/sms/template/index",
            method: "get",
          },
          admin_student_get_labels: {
            url: "admin/v1/student/label/get-labels",
            method: "get",
          },
          admin_student_life_cycle: {
            url: "admin/v1/student/student/life-cycle",
            method: "get",
          },
          client_teacher_blacklist: {
            url: "client/v1/staff/mentor/black-list",
            method: "get",
          },
          system_course_level_list: {
            url: "system/v1/course/level",
            method: "get",
          },
          system_user_filter_users: {
            url: "system/v1/user/user/filter-users",
            method: "get",
          },
          admin_finance_income_view: {
            url: "admin/v1/finance/income/view",
            method: "get",
          },
          admin_finance_salary_give: {
            url: "admin/v1/finance/salary/salary/give",
            method: "post",
          },
          admin_group_assign_mentor: {
            url: "admin/v1/group/group/assign-mentor",
            method: "post",
          },
          admin_group_schedule_data: {
            url: "admin/v1/group/group/schedule-data",
            method: "get",
          },
          admin_group_schedule_page: {
            url: "admin/v1/group/group/schedule-page",
            method: "get",
          },
          admin_lead_change_comment: {
            url: "admin/v1/lead/lead/change-comment",
            method: "put",
          },
          admin_rbac_role_page_data: {
            url: "admin/v1/rbac/role/page-data",
            method: "get",
          },
          admin_sms_exclusion_index: {
            url: "admin/v1/sms/exclusion/index",
            method: "get",
          },
          admin_sms_template_create: {
            url: "admin/v1/sms/template/create",
            method: "post",
          },
          admin_sms_template_delete: {
            url: "admin/v1/sms/template/delete",
            method: "delete",
          },
          admin_sms_template_update: {
            url: "admin/v1/sms/template/update",
            method: "post",
          },
          admin_student_change_note: {
            url: "admin/v1/student/student/change-note",
            method: "post",
          },
          admin_student_confirm_sms: {
            url: "admin/v1/student/sms/confirm-sms",
            method: "post",
          },
          client_company_group_enum: {
            url: "client/v1/company/company/group-enum",
            method: "get",
          },
          client_staff_change_photo: {
            url: "client/v1/staff/user/change-photo",
            method: "post",
          },
          client_student_search_one: {
            url: "client/v1/student/student/search-one",
            method: "get",
          },
          system_staff_teacher_view: {
            url: "system/v1/staff/teacher/view",
            method: "get",
          },
          system_student_search_one: {
            url: "system/v1/student/student/search-one",
            method: "get",
          },
          admin_auth_change_password: {
            url: "admin/v1/auth/change-password",
            method: "post",
          },
          admin_expense_batch_create: {
            url: "admin/v1/finance/expense/batch-create",
            method: "post",
          },
          admin_finance_expense_view: {
            url: "/admin/v1/finance/expense/view",
            method: "get",
          },
          admin_finance_income_index: {
            url: "admin/v1/finance/income",
            method: "get",
          },
          admin_group_get_attendance: {
            url: "admin/v1/group/group/attendance",
            method: "get",
          },
          admin_group_recommendation: {
            url: "admin/v1/group/group/recommendation",
            method: "get",
          },
          admin_grouped_move_perform: {
            url: "admin/v1/grouped/move/perform",
            method: "post",
          },
          admin_grouped_stop_perform: {
            url: "admin/v1/grouped/stop/perform",
            method: "post",
          },
          admin_rbac_assignment_view: {
            url: "admin/v1/rbac/assignment/view",
            method: "get",
          },
          admin_rbac_department_view: {
            url: "admin/v1/rbac/department/view",
            method: "get",
          },
          admin_sms_exclusion_delete: {
            url: "admin/v1/sms/exclusion/delete",
            method: "delete",
          },
          admin_sms_send_to_students: {
            url: "admin/v1/sms/sms/send-to-students",
            method: "post",
          },
          admin_student_archive_list: {
            url: "admin/v1/student/student/archive",
            method: "get",
          },
          admin_student_call_student: {
            url: "admin/v1/student/student/call-student",
            method: "post",
          },
          admin_student_change_label: {
            url: "admin/v1/student/student/change-label",
            method: "post",
          },
          admin_student_label_remove: {
            url: "admin/v1/student/label/remove",
            method: "post",
          },
          client_company_system_enum: {
            url: "client/v1/company/company/system-enum",
            method: "get",
          },
          system_company_system_enum: {
            url: "system/v1/company/company/system-enum",
            method: "get",
          },
          system_user_get_user_by_id: {
            url: "system/v1/user/user/get-user-by-id",
            method: "get",
          },
          admin_finance_expense_index: {
            url: "admin/v1/finance/expense",
            method: "get",
          },
          admin_finance_income_create: {
            url: "/admin/v1/finance/income/create",
            method: "post",
          },
          admin_finance_income_delete: {
            url: "/admin/v1/finance/income/delete",
            method: "delete",
          },
          admin_global_student_search: {
            url: "admin/v1/company/global/student-search",
            method: "get",
          },
          admin_group_get_mentor_type: {
            url: "admin/v1/group/group/get-mentor-type",
            method: "get",
          },
          admin_grouped_move_validate: {
            url: "admin/v1/grouped/move/validate",
            method: "post",
          },
          admin_grouped_stop_validate: {
            url: "admin/v1/grouped/stop/validate",
            method: "post",
          },
          admin_grouped_transfer_back: {
            url: "admin/v1/grouped/transfer/back",
            method: "post",
          },
          admin_rbac_assignment_index: {
            url: "admin/v1/rbac/assignment/index",
            method: "get",
          },
          admin_rbac_department_index: {
            url: "admin/v1/rbac/department/index",
            method: "get",
          },
          admin_rbac_permission_index: {
            url: "admin/v1/rbac/permission/index",
            method: "get",
          },
          admin_student_get_page_data: {
            url: "admin/v1/student/student/page-data",
            method: "get",
          },
          client_staff_teacher_groups: {
            url: "client/v1/group/group",
            method: "get",
          },
          admin_company_one_time_login: {
            url: "admin/v1/company/one-time/login",
            method: "get",
          },
          admin_finance_expense_create: {
            url: "admin/v1/finance/expense/create",
            method: "post",
          },
          admin_finance_expense_delete: {
            url: "admin/v1/finance/expense/delete",
            method: "delete",
          },
          admin_finance_expense_update: {
            url: "admin/v1/finance/expense/update",
            method: "put",
          },
          admin_grouped_move_page_data: {
            url: "admin/v1/grouped/move/page-data",
            method: "get",
          },
          admin_grouped_stop_page_data: {
            url: "admin/v1/grouped/stop/page-data",
            method: "get",
          },
          admin_rbac_assignment_create: {
            url: "admin/v1/rbac/assignment/create",
            method: "post",
          },
          admin_rbac_assignment_delete: {
            url: "admin/v1/rbac/assignment/delete",
            method: "delete",
          },
          admin_rbac_assignment_update: {
            url: "admin/v1/rbac/assignment/update",
            method: "post",
          },
          admin_rbac_department_create: {
            url: "admin/v1/rbac/department/create",
            method: "post",
          },
          admin_rbac_department_delete: {
            url: "admin/v1/rbac/department/delete",
            method: "delete",
          },
          admin_rbac_department_update: {
            url: "admin/v1/rbac/department/update",
            method: "put",
          },
          admin_rbac_permission_update: {
            url: "admin/v1/rbac/permission/update",
            method: "put",
          },
          admin_sms_cron_switch_status: {
            url: "admin/v1/sms/cron/switch-status",
            method: "get",
          },
          client_student_short_details: {
            url: "client/v1/student/student/short-detail",
            method: "get",
          },
          client_teacher_group_contact: {
            url: "client/v1/staff/mentor/group-contacts",
            method: "get",
          },
          admin_grouped_payment_perform: {
            url: "admin/v1/grouped/payment/perform",
            method: "post",
          },
          admin_sms_exclusion_page_data: {
            url: "admin/v1/sms/exclusion/page-data",
            method: "get",
          },
          system_user_get_user_by_token: {
            url: "system/v1/user/user/get-user-by-token",
            method: "get",
          },
          admin_company_get_initial_data: {
            url: "admin/v1/company/company/initial-data",
            method: "get",
          },
          admin_grouped_payment_validate: {
            url: "admin/v1/grouped/payment/validate",
            method: "post",
          },
          admin_grouped_stop_calculation: {
            url: "admin/v1/grouped/stop/calculation",
            method: "post",
          },
          admin_grouped_transfer_perform: {
            url: "admin/v1/grouped/transfer/perform",
            method: "post",
          },
          admin_student_get_student_type: {
            url: "admin/v1/student/student/get-student-type",
            method: "get",
          },
          admin_student_send_confirm_sms: {
            url: "admin/v1/student/sms/send-confirm-sms",
            method: "post",
          },
          client_staff_mentor_analystics: {
            url: "client/v1/staff/mentor/analytics",
            method: "get",
          },
          client_student_change_password: {
            url: "client/v1/auth/auth/change-password",
            method: "post",
          },
          client_student_profile_details: {
            url: "client/v1/student/student/student-detail-by-token",
            method: "get",
          },
          system_student_detail_by_token: {
            url: "system/v1/student/student/student-detail-by-token",
            method: "get",
          },
          admin_finance_salary_cover_save: {
            url: "admin/v1/finance/salary/cover/save",
            method: "post",
          },
          admin_finance_salary_cover_view: {
            url: "admin/v1/finance/salary/cover/view",
            method: "get",
          },
          admin_finance_salary_main_index: {
            url: "admin/v1/finance/salary/salary/index",
            method: "get",
          },
          admin_grouped_transfer_validate: {
            url: "admin/v1/grouped/transfer/validate-transfer",
            method: "post",
          },
          client_company_department_roles: {
            url: "client/v1/company/company/department-roles",
            method: "get",
          },
          client_company_department_users: {
            url: "client/v1/company/company/department-users",
            method: "get",
          },
          client_company_get_initial_data: {
            url: "client/v1/company/company/initial-data",
            method: "get",
          },
          client_get_student_office_hours: {
            url: "client/v1/student/office-hour/book-history",
            method: "get",
          },
          client_send_password_reset_code: {
            url: "client/v1/auth/password-reset/send-code",
            method: "post",
          },
          client_staff_support_time_table: {
            url: "client/v1/staff/support/time-table",
            method: "get",
          },
          client_staff_teacher_group_view: {
            url: "client/v1/group/group/view",
            method: "get",
          },
          client_student_profile_by_token: {
            url: "client/v1/student/student/profile-by-token",
            method: "get",
          },
          system_company_department_users: {
            url: "system/v1/company/company/department-users",
            method: "get",
          },
          system_company_role_assignments: {
            url: "system/v1/company/company/role-assignments",
            method: "get",
          },
          admin_finance_expense_group_view: {
            url: "admin/v1/finance/expense-group/view",
            method: "get",
          },
          admin_finance_salary_config_save: {
            url: "admin/v1/finance/salary/config/save",
            method: "post",
          },
          admin_finance_salary_cover_index: {
            url: "admin/v1/finance/salary/cover/index",
            method: "get",
          },
          admin_finance_salary_main_update: {
            url: "admin/v1/finance/salary/salary/update",
            method: "post",
          },
          admin_grouped_group_contact_stop: {
            url: "admin/v1/grouped/group-contact/stop",
            method: "post",
          },
          admin_grouped_transfer_page_data: {
            url: "admin/v1/grouped/transfer/page-data",
            method: "get",
          },
          admin_student_resend_confirm_sms: {
            url: "admin/v1/student/sms/resend-confirm-sms",
            method: "post",
          },
          client_check_password_reset_code: {
            url: "client/v1/auth/password-reset/check-code",
            method: "post",
          },
          system_user_get_user_by_username: {
            url: "system/v1/user/user/get-user-by-username",
            method: "get",
          },
          admin_finance_expense_group_index: {
            url: "/admin/v1/finance/expense-group/index",
            method: "get",
          },
          admin_finance_salary_cover_delete: {
            url: "admin/v1/finance/salary/cover/delete",
            method: "delete",
          },
          admin_grouped_group_contact_block: {
            url: "admin/v1/grouped/group-contact/block",
            method: "post",
          },
          admin_grouped_group_contact_index: {
            url: "admin/v1/grouped/group-contact/index",
            method: "get",
          },
          admin_grouped_payment_calculation: {
            url: "admin/v1/grouped/payment/calculation",
            method: "get",
          },
          admin_grouped_transfer_get_groups: {
            url: "admin/v1/grouped/transfer/allowed-groups",
            method: "get",
          },
          client_student_daily_office_hours: {
            url: "client/v1/student/office-hour/daily",
            method: "get",
          },
          admin_finance_expense_batch_create: {
            url: "admin/v1/finance/expense/batch-create",
            method: "post",
          },
          admin_finance_expense_group_create: {
            url: "admin/v1/finance/expense-group/create",
            method: "post",
          },
          admin_finance_expense_group_delete: {
            url: "admin/v1/finance/expense-group/delete",
            method: "delete",
          },
          admin_finance_expense_group_update: {
            url: "admin/v1/finance/expense-group/update",
            method: "put",
          },
          admin_grouped_group_contact_attend: {
            url: "admin/v1/grouped/group-contact/attend",
            method: "post",
          },
          admin_grouped_transfer_calculation: {
            url: "admin/v1/grouped/transfer/calculation",
            method: "get",
          },
          admin_student_back_to_waiting_list: {
            url: "admin/v1/student/student/back-to-waiting-list",
            method: "post",
          },
          client_staff_support_add_candidate: {
            url: "client/v1/staff/support/add-candidate",
            method: "post",
          },
          client_student_weekly_office_hours: {
            url: "client/v1/student/office-hour/weekly",
            method: "get",
          },
          admin_company_leaving_category_view: {
            url: "admin/v1/company/leaving-category/view",
            method: "get",
          },
          admin_finance_expense_category_view: {
            url: "/admin/v1/finance/expense-category/view",
            method: "get",
          },
          admin_grouped_group_contact_archive: {
            url: "admin/v1/grouped/group-contact/archive",
            method: "post",
          },
          admin_grouped_transfer_to_own_group: {
            url: "admin/v1/grouped/transfer/to-own-group",
            method: "post",
          },
          client_staff_mentor_mark_attendance: {
            url: "client/v1/staff/mentor/mark-attendance",
            method: "post",
          },
          admin_company_leaving_category_index: {
            url: "admin/v1/company/leaving-category/index",
            method: "get",
          },
          admin_finance_expense_category_index: {
            url: "admin/v1/finance/expense-category",
            method: "get",
          },
          admin_finance_salary_cover_page_data: {
            url: "admin/v1/finance/salary/cover/page-data",
            method: "get",
          },
          admin_company_leaving_category_create: {
            url: "admin/v1/company/leaving-category/create",
            method: "post",
          },
          admin_company_leaving_category_delete: {
            url: "admin/v1/company/leaving-category/delete",
            method: "delete",
          },
          admin_company_leaving_category_update: {
            url: "admin/v1/company/leaving-category/update",
            method: "put",
          },
          admin_finance_expense_category_create: {
            url: "admin/v1/finance/expense-category/create",
            method: "post",
          },
          admin_finance_expense_category_delete: {
            url: "admin/v1/finance/expense-category/delete",
            method: "delete",
          },
          admin_finance_expense_category_update: {
            url: "admin/v1/finance/expense-category/update",
            method: "put",
          },
          admin_finance_salary_component_create: {
            url: "admin/v1/finance/salary/salary-component/create",
            method: "post",
          },
          admin_finance_salary_component_delete: {
            url: "admin/v1/finance/salary/salary-component/delete",
            method: "delete",
          },
          admin_finance_salary_config_page_data: {
            url: "admin/v1/finance/salary/config/page-data",
            method: "get",
          },
          admin_grouped_group_contact_page_data: {
            url: "admin/v1/grouped/group-contact/page-data",
            method: "get",
          },
          client_staff_mentor_update_attendance: {
            url: "client/v1/staff/mentor/update-attendance",
            method: "post",
          },
          admin_company_leaving_category_reorder: {
            url: "admin/v1/company/leaving-category/reorder",
            method: "get",
          },
          admin_finance_expense_category_reorder: {
            url: "admin/v1/finance/expense-category/reorder",
            method: "put",
          },
          admin_finance_product_and_service_view: {
            url: "admin/v1/finance/product-and-service/view",
            method: "get",
          },
          admin_grouped_group_contact_attendance: {
            url: "admin/v1/grouped/group-contact/attendance",
            method: "post",
          },
          client_staff_mentor_attendance_claimed: {
            url: "client/v1/staff/mentor/attendance-claimed",
            method: "post",
          },
          admin_finance_product_and_service_enums: {
            url: "admin/v1/finance/product-and-service/enums",
            method: "get",
          },
          admin_finance_product_and_service_index: {
            url: "admin/v1/finance/product-and-service/index",
            method: "get",
          },
          admin_finance_product_and_service_create: {
            url: "admin/v1/finance/product-and-service/create",
            method: "post",
          },
          admin_finance_product_and_service_delete: {
            url: "admin/v1/finance/product-and-service/delete",
            method: "delete",
          },
          admin_finance_product_and_service_update: {
            url: "admin/v1/finance/product-and-service/update",
            method: "put",
          },
          admin_grouped_group_contact_add_to_group: {
            url: "admin/v1/grouped/group-contact/add-to-group",
            method: "post",
          },
          admin_grouped_group_contact_remove_attend: {
            url: "admin/v1/grouped/group-contact/remove-attend",
            method: "post",
          },
          client_staff_support_change_request_status: {
            url: "client/v1/staff/support/change-request-status",
            method: "post",
          },
          admin_grouped_group_contact_change_date_from: {
            url: "admin/v1/grouped/group-contact/change-date-from",
            method: "post",
          },
          admin_grouped_group_contact_remove_attendance: {
            url: "admin/v1/grouped/group-contact/remove-attendance",
            method: "delete",
          },
          admin_grouped_group_contact_update_attendance: {
            url: "admin/v1/grouped/group-contact/update-attendance",
            method: "put",
          },
          admin_grouped_group_contact_attendance_claimed: {
            url: "admin/v1/grouped/group-contact/attendance-claimed",
            method: "post",
          },
          admin_finance_salary_salary_component_page_data: {
            url: "admin/v1/finance/salary/salary-component/page-data",
            method: "get",
          },
          admin_grouped_group_contact_get_attendance_status: {
            url: "admin/v1/grouped/group-contact/get-attendance-status",
            method: "get",
          },
          admin_finance_student_balance_list: {
            url: "admin/v1/finance/student-balance/index",
            method: "get",
          },
          admin_finance_student_balance_dashboard: {
            url: "admin/v1/finance/student-balance/dashboard",
            method: "get",
          },
          admin_finance_student_balance_return_money: {
            url: "admin/v1/finance/student-balance/return-money",
            method: "post",
          },
          admin_finance_payment_statistics_index: {
            url: "admin/v1/finance/payment-statistics/index",
            method: "get",
          },
          admin_finance_payment_statistics_group: {
            url: "admin/v1/finance/payment-statistics/group",
            method: "get",
          },
          admin_company_file_index: {
            url: "admin/v1/company/company-file",
            method: "get",
          },
          admin_company_file_view: {
            url: "admin/v1/company/company-file/view",
            method: "get",
          },
          admin_company_file_create: {
            url: "admin/v1/company/company-file/create",
            method: "post",
          },
          admin_company_file_update: {
            url: "admin/v1/company/company-file/update",
            method: "put",
          },
          admin_company_file_private_create: {
            url: "admin/v1/company/company-file/private-create",
            method: "post",
          },
          admin_company_file_private_update: {
            url: "admin/v1/company/company-file/private-update",
            method: "put",
          },
          admin_finance_expense_change_color: {
            url: "admin/v1/finance/expense/change-color",
            method: "post",
          },
          admin_company_file_delete: {
            url: "admin/v1/company/company-file/delete",
            method: "delete",
          },
          admin_company_change_level_recommendation_date: {
            url: "admin/v1/company/tools/change-level-recommendation-date",
            method: "post",
          },
          admin_company_change_groups_date: {
            url: "admin/v1/company/tools/change-groups-date",
            method: "post",
          },
          admin_company_delete_groups_note: {
            url: "admin/v1/company/tools/delete-groups-note",
            method: "post",
          },
          admin_statistics_dashboard_statistics_main_card: {
            url: "admin/v1/statistics/dashboard-statistics/main-card",
            method: "get",
          },
          admin_statistics_dashboard_statistics_income: {
            url: "admin/v1/statistics/dashboard-statistics/income",
            method: "get",
          },
          admin_statistics_dashboard_statistics_teacher_lost: {
            url: "admin/v1/statistics/dashboard-statistics/teacher-lost",
            method: "get",
          },
          admin_statistics_dashboard_statistics_kpi: {
            url: "admin/v1/statistics/dashboard-statistics/kpi",
            method: "get",
          },
          admin_grouped_group_contact_attendance_control: {
            url: "admin/v1/grouped/group-contact/attendance-control",
            method: "get",
          },
          admin_grouped_group_contact_absent_student: {
            url: "admin/v1/grouped/group-contact/absent-student",
            method: "get",
          },
          client_staff_mentor_statistics_main_card: {
            url: "client/v1/staff/mentor-statistics/main-card",
            method: "get",
          },
          client_staff_mentor_statistics_students: {
            url: "client/v1/staff/mentor-statistics/students",
            method: "get",
          },
          admin_region_index: {
            url: "/admin/v1/company/region/index",
            method: "get",
          },
          admin_region_view: {
            url: "/admin/v1/company/region/view",
            method: "get",
          },
          admin_region_create: {
            url: "/admin/v1/company/region/create",
            method: "post",
          },
          admin_region_update: {
            url: "/admin/v1/company/region/update",
            method: "put",
          },
          admin_region_delete: {
            url: "/admin/v1/company/region/delete",
            method: "delete",
          },
          admin_branch_index: {
            url: "admin/v1/company/branch/index",
            method: "get",
          },
          admin_branch_view: {
            url: "admin/v1/company/branch/view",
            method: "get",
          },
          admin_branch_create: {
            url: "admin/v1/company/branch/create",
            method: "post",
          },
          admin_branch_update: {
            url: "admin/v1/company/branch/update",
            method: "put",
          },
          admin_branch_delete: {
            url: "admin/v1/company/branch/delete",
            method: "delete",
          },
          admin_room_index: {
            url: "admin/v1/company/room/index",
            method: "get",
          },
          admin_room_view: {
            url: "admin/v1/company/room/view",
            method: "get",
          },
          admin_room_create: {
            url: "admin/v1/company/room/create",
            method: "post",
          },
          admin_room_update: {
            url: "admin/v1/company/room/update",
            method: "put",
          },
          admin_room_delete: {
            url: "admin/v1/company/room/delete",
            method: "delete",
          },
          system_course_group_type_index: {
            url: "system/v1/course/group-type/index",
            method: "get",
          },
          system_course_lesson_day_index: {
            url: "system/v1/course/lesson-day/index",
            method: "get",
          },
          admin_abs_group_list: {
            url: "admin/v1/group/group/abs-groups",
            method: "get",
          },
          admin_course_create: {
            url: "admin/v1/course/course/create",
            method: "post",
          },
          admin_course_update: {
            url: "admin/v1/course/course/update",
            method: "post",
          },
          admin_course_set_prices: {
            url: "admin/v1/course/course/set-prices",
            method: "post",
          },
          admin_course_set_times: {
            url: "admin/v1/course/course/set-times",
            method: "post",
          },
          admin_course_delete: {
            url: "admin/v1/course/course/delete",
            method: "delete",
          },
          admin_course_view: {
            url: "admin/v1/course/course/view",
            method: "get",
          },
          admin_course_index: {
            url: "admin/v1/course/course/index",
            method: "get",
          },
          admin_course_group_type_create: {
            url: "admin/v1/course/group-type/create",
            method: "post",
          },
          admin_course_group_type_update: {
            url: "admin/v1/course/group-type/update",
            method: "post",
          },
          admin_course_group_type_delete: {
            url: "admin/v1/course/group-type/delete",
            method: "delete",
          },
          admin_course_group_type_view: {
            url: "admin/v1/course/group-type/view",
            method: "get",
          },
          admin_course_group_type_index: {
            url: "admin/v1/course/group-type/index",
            method: "get",
          },
          admin_course_level_create: {
            url: "admin/v1/course/level/create",
            method: "post",
          },
          admin_course_level_update: {
            url: "admin/v1/course/level/update",
            method: "post",
          },
          admin_course_level_delete: {
            url: "admin/v1/course/level/delete",
            method: "delete",
          },
          admin_course_level_view: {
            url: "admin/v1/course/level/view",
            method: "get",
          },
          admin_course_level_index: {
            url: "admin/v1/course/level/index",
            method: "get",
          },
          admin_course_lesson_day_create: {
            url: "admin/v1/course/lesson-day/create",
            method: "post",
          },
          admin_course_lesson_day_update: {
            url: "admin/v1/course/lesson-day/update",
            method: "post",
          },
          admin_course_lesson_day_delete: {
            url: "admin/v1/course/lesson-day/delete",
            method: "delete",
          },
          admin_course_lesson_day_view: {
            url: "admin/v1/course/lesson-day/view",
            method: "get",
          },
          admin_course_lesson_day_index: {
            url: "admin/v1/course/lesson-day/index",
            method: "get",
          },
          admin_student_recommendation: {
            url: "/admin/v1/student/recommendation",
            method: "get",
          },
          admin_course_level_re_order: {
            url: "admin/v1/course/level/re-order",
            method: "post",
          },
          admin_statistics_dashboard_statistics_freshman_lost: {
            url: "admin/v1/statistics/dashboard-statistics/freshman-lost",
            method: "get",
          },
          admin_statistics_freshman_lost_freshman_list: {
            url: "admin/v1/statistics/freshman-lost/freshman",
            method: "get",
          },
          admin_statistics_freshman_lost_lost_list: {
            url: "admin/v1/statistics/freshman-lost/lost",
            method: "get",
          },
          admin_company_get_holiday_list: {
            url: "admin/v1/company/holiday/index",
            method: "get",
          },
          admin_company_get_holiday_one: {
            url: "admin/v1/company/holiday/view",
            method: "get",
          },
          admin_company_holiday_create: {
            url: "admin/v1/company/holiday/create",
            method: "post",
          },
          admin_company_holiday_update: {
            url: "admin/v1/company/holiday/update",
            method: "put",
          },
          admin_company_holiday_delete: {
            url: "admin/v1/company/holiday/delete",
            method: "delete",
          },
          admin_statistics_podo_index: {
            url: "admin/v1/statistics/podo/index",
            method: "get",
          },
          admin_statistics_dashboard_statistics_student: {
            url: "admin/v1/statistics/dashboard-statistics/student",
            method: "get",
          },
          admin_statistics_dashboard_statistics_new_student: {
            url: "admin/v1/statistics/dashboard-statistics/new-student",
            method: "get",
          },
          admin_missed_attendance_group: {
            url: "admin/v1/group/group/missed-attendance-group",
            method: "get",
          },
          admin_statistics_sms_delivery: {
            url: "admin/v1/statistics/sms/sms-delivery",
            method: "get",
          },
          admin_statistics_dashboard_statistics_lead: {
            url: "admin/v1/statistics/dashboard-statistics/lead",
            method: "get",
          },
          admin_statistics_dashboard_statistics_waiting_list: {
            url: "admin/v1/statistics/dashboard-statistics/waiting-list",
            method: "get",
          },
          admin_statistics_dashboard_statistics_sms: {
            url: "admin/v1/statistics/dashboard-statistics/sms",
            method: "get",
          },
          admin_group_study_types: {
            url: "admin/v1/group/group/study-types",
            method: "get",
          },
          admin_student_change_password: {
            url: "admin/v1/student/student/change-password",
            method: "post",
          },
          system_rbac_role_view: {
            url: "system/v1/rbac/role/view",
            method: "get",
          },
          system_course_lesson_time_index: {
            url: "system/v1/course/lesson-time/index",
            method: "get",
          },
          admin_tools_route_params: {
            url: "admin/v1/company/tools/route-params",
            method: "get",
          },
          admin_student_un_ban: {
            url: "admin/v1/student/student/un-ban",
            method: "post",
          },
          admin_grouped_group_contact_un_block: {
            url: "admin/v1/grouped/group-contact/un-block",
            method: "post",
          },
          admin_lead_sms_template_view: {
            url: "admin/v1/lead/lead/view-sms-template",
            method: "get",
          },
          admin_lead_create_sms_template: {
            url: "admin/v1/lead/lead/create-sms-template",
            method: "post",
          },
          admin_lead_update_sms_template: {
            url: "admin/v1/lead/lead/update-sms-template",
            method: "post",
          },
          admin_lead_delete_sms_template: {
            url: "admin/v1/lead/lead/delete-sms-template",
            method: "delete",
          },
          admin_company_get_source_list: {
            url: "admin/v1/company/source/index",
            method: "get",
          },
          admin_company_get_source_view: {
            url: "admin/v1/company/source/view",
            method: "get",
          },
          admin_company_source_create: {
            url: "admin/v1/company/source/create",
            method: "post",
          },
          admin_company_source_update: {
            url: "admin/v1/company/source/update",
            method: "post",
          },
          admin_company_source_delete: {
            url: "admin/v1/company/source/delete",
            method: "delete",
          },
          admin_lead_send_sms: {
            url: "admin/v1/lead/lead/send-sms",
            method: "post",
          },
          admin_room_reorder: {
            url: "admin/v1/company/room/reorder",
            method: "post",
          },
          admin_lead_sms_template_list: {
            url: "admin/v1/lead/lead/sms-template-list",
            method: "get",
          },
          admin_lead_sms_delivery_list: {
            url: "admin/v1/lead/lead/sms-delivery-list",
            method: "get",
          },
          system_company_role_shifts: {
            url: "system/v1/company/company/role-shifts",
            method: "get",
          },
          system_staff_create_admin: {
            url: "system/v1/staff/staff/create-admin",
            method: "post",
          },
          system_staff_update_admin: {
            url: "system/v1/staff/staff/update-admin",
            method: "post",
          },
          system_staff_fire_staff: {
            url: "system/v1/staff/staff/fire-staff",
            method: "post",
          },
          system_user_get_users_by_id: {
            url: "system/v1/user/user/get-users-by-id",
            method: "get",
          },
          admin_finance_payment_config_page_data: {
            url: "admin/v1/finance/payment-config/page-data",
            method: "get",
          },
          admin_finance_payment_config_save: {
            url: "admin/v1/finance/payment-config/save",
            method: "post",
          },
          client_mentor_login: {
            url: "client/v1/auth/auth/mentor-login",
            method: "post",
          },
          admin_finance_expense_separate: {
            url: "admin/v1/finance/expense/separate-expense",
            method: "post",
          },
          admin_student_validate_phone: {
            url: "admin/v1/student/student/validate-phone",
            method: "post",
          },
          system_finance_product_create_invoice: {
            url: "system/v1/finance/product/create-invoice",
            method: "post",
          },
          admin_grouped_stop_new_student: {
            url: "admin/v1/grouped/stop/stop-new-student",
            method: "post",
          },
          admin_lead_change_color: {
            url: "admin/v1/lead/lead/change-color",
            method: "put",
          },
          admin_student_validate_dob: {
            url: "/admin/v1/student/student/validate-student-dob",
            method: "post",
          },
          client_user_change_avatar: {
            url: "client/v1/user/profile/change-avatar",
            method: "post",
          },
          client_user_delete_avatar: {
            url: "client/v1/user/profile/delete-avatar",
            method: "post",
          },
          admin_student_flow_update: {
            url: "/admin/v1/student/flow/update",
            method: "post",
          },
          admin_statistics_dashboard_statistics_staff_motivation: {
            url: "/admin/v1/statistics/dashboard-statistics/staff-motivation",
            method: "get",
          },
          admin_finance_income_get_check: {
            url: "admin/v1/finance/income/check",
            method: "get",
          },
          admin_lead_validate_phone: {
            url: "admin/v1/lead/lead/validate-phone",
            method: "post",
          },
          admin_grouped_group_contact_black_list: {
            url: "/admin/v1/grouped/group-contact/black-list",
            method: "get",
          },
          admin_company_life_cycle: {
            url: "/admin/v1/company/company/life-cycle",
            method: "get",
          },
          client_staff_user_salary: {
            url: "client/v1/staff/user/salary",
            method: "get",
          },
          admin_finance_service_sell_url: {
            url: "admin/v1/finance/service/sell-url",
            method: "get",
          },
          admin_call_index: {
            url: "admin/v1/call/call/index",
            method: "get",
          },
          admin_call_get_staff: {
            url: "admin/v1/call/call/staff",
            method: "get",
          },
          client_student_group_contact: {
            url: "/client/v1/student/student/group-contacts",
            method: "get",
          },
          client_student_group_attendance: {
            url: "/client/v1/student/student/group-attendance",
            method: "get",
          },
          admin_company_life_cycle_page_data: {
            url: "/admin/v1/company/company/life-cycle-page-data",
            method: "get",
          },
          admin_company_life_cycle_view: {
            url: "/admin/v1/company/company/life-cycle-view",
            method: "get",
          },
          get_teachers_analytics: {
            url: "system/v1/staff/teacher/get-teachers-analytics",
            method: "get",
          },
          admin_company_holiday_view_with_group: {
            url: "/admin/v1/company/holiday/view-with-group",
            method: "get",
          },
          admin_company_holiday_batch_create: {
            url: "/admin/v1/company/holiday/batch-create",
            method: "post",
          },
          admin_call_history: {
            url: "admin/v1/call/call/call-history",
            method: "get",
          },
          admin_call_operator_list: {
            url: "admin/v1/call/operator",
            method: "get",
          },
          admin_call_operator_view: {
            url: "/admin/v1/call/operator/view",
            method: "get",
          },
          admin_call_operator_create: {
            url: "/admin/v1/call/operator/create",
            method: "post",
          },
          admin_call_operator_update: {
            url: "admin/v1/call/operator/update",
            method: "put",
          },
          admin_call_operator_delete: {
            url: "/admin/v1/call/operator/delete",
            method: "delete",
          },
          admin_call_operator_get_with_user: {
            url: "/admin/v1/call/operator/get-with-user",
            method: "get",
          },
          admin_statistics_call_index: {
            url: "/admin/v1/statistics/call",
            method: "get",
          },
          admin_statistics_dashboard_statistics_call: {
            url: "/admin/v1/statistics/dashboard-statistics/call",
            method: "get",
          },
          system_student_group_contact: {
            url: "/system/v1/student/group-contact",
            method: "get",
          },
          admin_finance_income_get_product_check: {
            url: "admin/v1/finance/income/product-check",
            method: "get",
          },
          system_group_set_attribute: {
            url: "system/v1/group/attribute/set",
            method: "post",
          },
          system_group_delete_attribute: {
            url: "system/v1/group/attribute/delete",
            method: "post",
          },
          admin_v1_sms_sms_send: {
            url: "admin/v1/sms/sms/send",
            method: "post",
          },
          client_refresh_login: {
            url: "client/v1/auth/auth/refresh-login",
            method: "post",
          },
          admin_statistics_freshman_lost_freshman_page_data: {
            url: "/admin/v1/statistics/freshman-lost/freshman-page-data",
            method: "get",
          },
          admin_student_ban: {
            url: "admin/v1/student/student/ban",
            method: "put",
          },
          admin_v1_grouped_payment_send_payment_request: {
            url: "admin/v1/grouped/payment/send-payment-request",
            method: "post",
          },
          system_user_add_to_red_list: {
            url: "/system/v1/user/label/add-to-red-list",
            method: "post",
          },
          system_user_remove_from_red_list: {
            url: "/system/v1/user/label/remove-from-red-list",
            method: "post",
          },
          admin_finance_cash_flow_expense: {
            url: "/admin/v1/finance/cash-flow/expense",
            method: "get",
          },
          system_get_company_holidays: {
            url: "/system/v1/company/holiday",
            method: "get",
          },
          admin_finance_student_balance_get_dispersion_by_month: {
            url: "admin/v1/finance/student-balance/get-dispersion-by-month",
            method: "get",
          },
          admin_grouped_group_contact_red_list: {
            url: "/admin/v1/grouped/group-contact/red-list",
            method: "get",
          },
          admin_company_change_red_list_count: {
            url: "admin/v1/company/tools/change-red-list-count",
            method: "post",
          },
          admin_student_send_sms_metrics: {
            url: "admin/v1/sms/sms/metrics",
            method: "get",
          },
          admin_grouped_group_contact_last_attendance: {
            url: "admin/v1/grouped/group-contact/last-attendance",
            method: "get",
          },
          client_student_last_attendance: {
            url: "client/v1/student/student/last-attendance",
            method: "get",
          },
          admin_academic_home_work_not_done: {
            url: "/admin/v1/academic/academic/home-work-not-done",
            method: "get",
          },
          admin_academic_home_work_not_done_by_group: {
            url: "/admin/v1/academic/academic/home-work-not-done-by-group",
            method: "get",
          },
          admin_academic_red_list_by_teacher: {
            url: "admin/v1/academic/academic/red-list-by-teacher",
            method: "get",
          },
          admin_company_switch_black_list: {
            url: "admin/v1/company/tools/switch-black-list",
            method: "post",
          },
          admin_v1_finance_salary_detailed_cover_config_page_data: {
            url: "admin/v1/finance/salary/detailed-cover-config/page-data",
            method: "get",
          },
          admin_v1_finance_salary_detailed_cover_config_save: {
            url: "admin/v1/finance/salary/detailed-cover-config/save",
            method: "post",
          },
          admin_academic_missed_attendance: {
            url: "admin/v1/academic/academic/missed-attendance",
            method: "get",
          },
          admin_v1_finance_salary_detailed_cover_index: {
            url: "admin/v1/finance/salary/detailed-cover/index",
            method: "get",
          },
          admin_v1_finance_salary_detailed_cover_delete: {
            url: "admin/v1/finance/salary/detailed-cover/delete",
            method: "get",
          },
          admin_v1_finance_salary_detailed_cover_save: {
            url: "admin/v1/finance/salary/detailed-cover/save",
            method: "post",
          },
          admin_v1_finance_salary_detailed_cover_form_data: {
            url: "admin/v1/finance/salary/detailed-cover/form-data",
            method: "post",
          },
          admin_student_dob: {
            url: "admin/v1/student/student/dob",
            method: "get",
          },
          admin_grouped_group_contact_attendance_filter: {
            url: "/admin/v1/grouped/group-contact/attendance-filter",
            method: "get",
          },
          admin_homework_not_done_by_date: {
            url: "/admin/v1/academic/academic/homework-not-done-by-date",
            method: "get",
          },
          admin_payment_ratio: {
            url: "/admin/v1/finance/income/payment-ratio",
            method: "get",
          },
          system_v1_staff_support_index: {
            url: "system/v1/staff/support/index",
            method: "get",
          },
          client_group_students: {
            url: "/client/v1/group/group/students",
            method: "get",
          },
          system_exam_group_user_ids: {
            url: "system/v1/group/group/exam-user-ids",
            method: "post",
          },
          admin_finance_salary_component_change_description: {
            url: "admin/v1/finance/salary/salary-component/change-description",
            method: "post",
          },
          admin_staff_support_time_table: {
            url: "/admin/v1/staff/support/time-table",
            method: "get",
          },
          system_login_student: {
            url: "system/v1/student/student/student-detail-by-username-password",
            method: "post",
          },
          client_stundent_get_one_office_hour: {
            url: "client/v1/student/office-hour/view",
            method: "get",
          },
          admin_grouped_group_contact_start_date_calculation: {
            url: "/admin/v1/grouped/group-contact/start-date-calculate",
            method: "get",
          },
          client_group_update: {
            url: "client/v1/group/group/update",
            method: "post",
          },
          admin_company_tools_save_will_pay_config: {
            url: "admin/v1/company/tools/save-will-pay-config",
            method: "post",
          },
          client_student_pay_from_balance: {
            url: "/client/v1/student/student/pay-from-balance",
            method: "post",
          },
          client_student_transaction: {
            url: "/client/v1/student/student/transaction",
            method: "get",
          },
          admin_grouped_payment_student_balance: {
            url: "admin/v1/grouped/payment/student-balance",
            method: "post",
          },
          admin_finance_student_balance_withdraw_confirmation: {
            url: "admin/v1/finance/student-balance/withdraw-confirmation",
            method: "post",
          },
          admin_finance_student_balance_confirm_withdraw: {
            url: "admin/v1/finance/student-balance/confirm-withdraw",
            method: "post",
          },
          system_rbac_role_roles: {
            url: "system/v1/rbac/role/index",
            method: "get",
          },
        },
      },
    },
    "call-center": {
      v1: {
        actions: {
          sms_send: {
            url: "v1/sms/send",
            method: "post",
          },
          tab_view: {
            url: "v1/tab/view",
            method: "get",
          },
          lead_view: {
            url: "v1/lead/view",
            method: "get",
          },
          sms_index: {
            url: "v1/sms/index",
            method: "get",
          },
          tab_index: {
            url: "v1/tab/index",
            method: "get",
          },
          lead_index: {
            url: "v1/lead/index",
            method: "get",
          },
          tab_create: {
            url: "v1/tab/create",
            method: "post",
          },
          tab_delete: {
            url: "v1/tab/delete",
            method: "delete",
          },
          tab_update: {
            url: "v1/tab/update",
            method: "put",
          },
          lead_change: {
            url: "v1/lead/change",
            method: "put",
          },
          lead_create: {
            url: "v1/lead/create",
            method: "post",
          },
          lead_delete: {
            url: "v1/lead/delete",
            method: "delete",
          },
          source_view: {
            url: "v1/source/view",
            method: "get",
          },
          lead_history: {
            url: "v1/lead/history",
            method: "get",
          },
          source_index: {
            url: "v1/source/index",
            method: "get",
          },
          lead_register: {
            url: "v1/lead/register",
            method: "post",
          },
          lead_sync_pbx: {
            url: "v1/lead/sync-pbx",
            method: "post",
          },
          source_create: {
            url: "v1/source/create",
            method: "post",
          },
          source_delete: {
            url: "v1/source/delete",
            method: "delete",
          },
          lead_add_to_tab: {
            url: "v1/lead/add-to-tab",
            method: "post",
          },
          lead_get_action: {
            url: "v1/lead/get-action",
            method: "get",
          },
          lead_get_status: {
            url: "v1/lead/get-status",
            method: "get",
          },
          lead_change_name: {
            url: "v1/lead/change-name",
            method: "put",
          },
          lead_mark_action: {
            url: "v1/lead/mark-action",
            method: "post",
          },
          sms_send_by_excel: {
            url: "v1/sms/send-by-excel",
            method: "post",
          },
          lead_change_status: {
            url: "v1/lead/change-status",
            method: "put",
          },
          lead_change_comment: {
            url: "v1/lead/change-comment",
            method: "put",
          },
        },
      },
    },
    ielts: {
      v1: {
        actions: {
          get_popular_resources: {
            url: "v1/library/resources/popular",
            method: "get",
          },
          get_group_marking: {
            url: "v1/ranking/group/marking",
            method: "get",
          },
          get_user_skills: {
            url: "v1/ranking/skills/index",
            method: "get",
          },
          get_user_skills_by_unit: {
            url: "v1/ranking/skills/by-unit",
            method: "get",
          },
          get_students_ranking: {
            url: "v1/ranking/students",
            method: "get",
          },
          get_topic_words_count: {
            url: "v1/vocabulary/topic/words-count",
            method: "get",
          },
          get_unit_words_count: {
            url: "v1/vocabulary/unit/words-count",
            method: "get",
          },
          get_student_profile: {
            url: "v1/student/profile",
            method: "get",
          },
          get_student_progress: {
            url: "\tv1/student/profile/progress",
            method: "get",
          },
          add_word: {
            url: "v1/vocabulary/added-words/create",
            method: "post",
          },
          delete_word: {
            url: "v1/vocabulary/added-words/delete",
            method: "post",
          },
          get_group_units: {
            url: "v1/group/unit/index",
            method: "get",
          },
          open_group_units: {
            url: "v1/group/unit/open",
            method: "post",
          },
          close_group_units: {
            url: "v1/group/unit/close",
            method: "post",
          },
          get_group_students: {
            url: "v1/group/student/index",
            method: "get",
          },
          get_unit_info: {
            url: "v1/unit",
            method: "get",
          },
          get_round_exercise: {
            url: "v1/unit/round/exercise",
            method: "get",
          },
          save_exercise_result: {
            url: "v1/unit/activity/save-exercise-result",
            method: "post",
          },
          get_round_words: {
            url: "v1/unit/round/words",
            method: "get",
          },
          save_word_activity: {
            url: "v1/unit/activity/save-words",
            method: "post",
          },
          get_topic_words: {
            url: "v1/vocabulary/topic/words",
            method: "get",
          },
          get_unit_words: {
            url: "v1/vocabulary/unit/words",
            method: "get",
          },
          check_exercise_fields: {
            url: "v1/exercise/check/fields",
            method: "post",
          },
          get_resources_list: {
            url: "v1/library/resources/list",
            method: "get",
          },
          search_words: {
            url: "v1/vocabulary/search",
            method: "get",
          },
          movie_watched: {
            url: "v1/unit/activity/movie-watched",
            method: "get",
          },
          theory_watched: {
            url: "v1/unit/activity/theory-watched",
            method: "get",
          },
          get_word_options: {
            url: "v1/vocabulary/train/word-options",
            method: "post",
          },
          train_unit_words: {
            url: "v1/vocabulary/train/unit-words",
            method: "post",
          },
          get_added_words_by_year: {
            url: "v1/vocabulary/added-words",
            method: "get",
          },
          get_failed_words: {
            url: "v1/vocabulary/failed-words",
            method: "get",
          },
          get_added_words_by_month: {
            url: "v1/vocabulary/added-words/by-month",
            method: "get",
          },
          get_exam_process_data: {
            url: "v1/exam/process/get-data",
            method: "get",
          },
          report_about_word: {
            url: "v1/student/report/word",
            method: "post",
          },
          get_recommended_resources: {
            url: "v1/library/resources/recommended",
            method: "get",
          },
          exam_process_start_exam: {
            url: "v1/exam/process/start-exam",
            method: "get",
          },
          exam_process_save_answer: {
            url: "v1/exam/process/save-answer",
            method: "post",
          },
          exam_get_exam_dates: {
            url: "v1/exam/exam/get-dates",
            method: "get",
          },
          exam_get_exam_groups: {
            url: "v1/exam/exam/get-groups",
            method: "get",
          },
          exam_get_exam_group: {
            url: "v1/exam/exam/get-group",
            method: "get",
          },
          exam_set_properties: {
            url: "v1/exam/process/set-properties",
            method: "post",
          },
          repeat_words: {
            url: "v1/vocabulary/train/repeat",
            method: "post",
          },
          exam_device_register: {
            url: "v1/exam/device/register",
            method: "post",
          },
          exam_device_connect_to_process: {
            url: "v1/exam/device/connect-to-process",
            method: "post",
          },
          exam_device_get_session: {
            url: "v1/exam/device/get-session",
            method: "post",
          },
          exam_process_stop_exam: {
            url: "v1/exam/process/stop-exam",
            method: "post",
          },
          update_student_profile: {
            url: "v1/student/profile/update",
            method: "post",
          },
          exam_device_clear: {
            url: "v1/exam/device/clear",
            method: "post",
          },
          check_added_word_exist: {
            url: "v1/vocabulary/added-words/check-word-exist",
            method: "post",
          },
          delete_added_words: {
            url: "v1/vocabulary/added-words/delete-words",
            method: "post",
          },
          train_topic_words: {
            url: "v1/vocabulary/train/topic-words",
            method: "post",
          },
          get_topic_word_options: {
            url: "v1/vocabulary/train/topic-word-options",
            method: "post",
          },
          get_student_rating: {
            url: "v1/ranking/students/student",
            method: "get",
          },
          get_intro_video_url: {
            url: "v1/student/profile/intro-video-url",
            method: "get",
          },
          get_recommended_products: {
            url: "v1/shop/products/recommended",
            method: "get",
          },
          get_products_by_category: {
            url: "v1/shop/products/by-category",
            method: "get",
          },
          get_product: {
            url: "v1/shop/products",
            method: "get",
          },
          order_product: {
            url: "v1/shop/orders/create",
            method: "post",
          },
          get_orders: {
            url: "v1/shop/orders",
            method: "get",
          },
          get_student_transactions: {
            url: "v1/student/transactions/index",
            method: "get",
          },
          report_about_exercise: {
            url: "v1/student/report/exercise",
            method: "post",
          },
          get_group_date_units: {
            url: "\tv1/group/assign/units",
            method: "post",
          },
          get_level_units: {
            url: "v1/unit/unit/index",
            method: "get",
          },
          get_unit_info_base: {
            url: "v1/unit/unit/view",
            method: "get",
          },
          get_group_days: {
            url: "v1/group/unit/days",
            method: "get",
          },
          get_group_student_scores: {
            url: "v1/group/student/scores",
            method: "get",
          },
          get_student_learned_words: {
            url: "v1/student/progress/learned-words",
            method: "get",
          },
          get_student_watched_videos: {
            url: "v1/student/progress/watched-videos",
            method: "get",
          },
          get_student_learned_exercises: {
            url: "v1/student/progress/learned-exercises",
            method: "get",
          },
          get_group_learned_words: {
            url: "v1/group/progress/learned-words",
            method: "get",
          },
          get_group_watched_videos: {
            url: "v1/group/progress/watched-videos",
            method: "get",
          },
          get_group_learned_exercises: {
            url: "v1/group/progress/learned-exercises",
            method: "get",
          },
          get_words: {
            url: "v1/unit/unit/words",
            method: "get",
          },
          get_exercise_questions: {
            url: "v1/unit/unit/questions",
            method: "get",
          },
          get_teacher_score: {
            url: "v1/teacher/score",
            method: "get",
          },
          get_student_transactions_by_dates: {
            url: "v1/student/transactions/dates",
            method: "get",
          },
          get_robot_chats: {
            url: "v1/chat/robot/index",
            method: "get",
          },
          new_robot_question: {
            url: "v1/chat/robot/question",
            method: "post",
          },
          get_create_ticket_url: {
            url: "candidate/create-ticket",
            method: "get",
          },
          get_ticket_by_payment_token: {
            url: "candidate/get-ticket-by-payment-token",
            method: "get",
          },
        },
      },
    },
    "hr-v2": {
      v1: {
        actions: {
          admin_v1_config_vacancy_index: {
            url: "admin/v1/config/vacancy/index",
            method: "get",
          },
          admin_v1_config_vacancy_switch_vacancy: {
            url: "admin/v1/config/vacancy/switch-vacancy",
            method: "post",
          },
          admin_v1_config_vacancy_vacancy_form_save: {
            url: "admin/v1/config/vacancy/vacancy-form-save",
            method: "post",
          },
          admin_v1_config_vacancy_vacancy_page_data: {
            url: "admin/v1/config/vacancy/vacancy-page-data",
            method: "post",
          },
          admin_v1_config_pixel_pixel_form_save: {
            url: "admin/v1/config/pixel/pixel-form-save",
            method: "post",
          },
          admin_v1_config_pixel_pixel_form_page_data: {
            url: "admin/v1/config/pixel/pixel-form-page-data",
            method: "post",
          },
          admin_v1_main_general_index: {
            url: "admin/v1/main/general/index",
            method: "get",
          },
          admin_v1_main_general_get_model_data: {
            url: "admin/v1/main/general/get-model-data",
            method: "get",
          },
          admin_v1_main_general_api: {
            url: "admin/v1/main/general/api",
            method: "post",
          },
          admin_v1_main_general_check_candidate_by_phone: {
            url: "admin/v1/main/general/check-candidate-by-phone",
            method: "get",
          },
          admin_v1_main_general_get_candidate_life_cycle: {
            url: "admin/v1/main/general/get-candidate-life-cycle",
            method: "get",
          },
          admin_v1_main_general_save_form: {
            url: "admin/v1/main/general/save-form",
            method: "post",
          },
          admin_v1_main_general_delete_applicant: {
            url: "admin/v1/main/general/delete-applicant",
            method: "delete",
          },
          admin_v1_main_general_get_status_list: {
            url: "admin/v1/main/general/get-status-list",
            method: "get",
          },
          admin_v1_main_general_create: {
            url: "admin/v1/main/general/create",
            method: "post",
          },
          admin_v1_main_general_change_comment: {
            url: "admin/v1/main/general/change-comment",
            method: "post",
          },
          admin_v1_main_general_save_call_request_label: {
            url: "admin/v1/main/general/save-call-request-label",
            method: "post",
          },
          admin_v1_main_general_set_meeting: {
            url: "admin/v1/main/general/set-meeting",
            method: "post",
          },
          admin_v1_main_general_get_meeting: {
            url: "admin/v1/main/general/get-meeting",
            method: "post",
          },
          admin_v1_main_general_get_day_meetings: {
            url: "admin/v1/main/general/get-day-meetings",
            method: "post",
          },
          admin_v1_main_general_absent: {
            url: "admin/v1/main/general/absent",
            method: "post",
          },
          admin_v1_main_general_save_not_answered_label: {
            url: "admin/v1/main/general/save-not-answered-label",
            method: "post",
          },
          admin_v1_main_general_change_color: {
            url: "admin/v1/main/general/change-color",
            method: "post",
          },
          admin_v1_main_general_get_move_info: {
            url: "admin/v1/main/general/get-move-info",
            method: "get",
          },
          admin_v1_main_general_get_stage_list: {
            url: "admin/v1/main/general/get-stage-list",
            method: "get",
          },
          admin_v1_main_general_move: {
            url: "admin/v1/main/general/move",
            method: "post",
          },
          admin_v1_main_general_rejected: {
            url: "admin/v1/main/general/rejected",
            method: "post",
          },
        },
      },
    },
  },
};
