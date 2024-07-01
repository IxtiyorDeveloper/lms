// import Dotenv from "dotenv";
//
// Dotenv.config({ path: "../.env" });

export default {
  fileUpload: process.env.NEXT_PUBLIC_FILE_UPLOAD_URL,
  fileUploadHR: process.env.NEXT_PUBLIC_HR_FILE_UPLOAD_URL,
  fileUploadAvatarHR: process.env.NEXT_PUBLIC_HR_UPLOAD_AVATAR_URL,
  fileUploadTask: process.env.NEXT_PUBLIC_FILE_UPLOAD_TASK,
  anythingUpload: process.env.NEXT_PUBLIC_FILE_UPLOAD_FILE_URL,
  fileUploadToken: process.env.NEXT_PUBLIC_FILE_UPLOAD_TOKEN,
  task_upload_token: process.env.NEXT_PUBLIC_TASK_UPLOAD_TOKEN,
  api: process.env.NEXT_PUBLIC_API_URL,
  device_host: process.env.NEXT_PUBLIC_DEVICE_API_URL,
  device_auth: process.env.NEXT_PUBLIC_DEVICE_API_AUTH_TOKEN,
  auth: process.env.NEXT_PUBLIC_API_AUTH,
  token: process.env.NEXT_PUBLIC_COMPANY_TOKEN,
  key: process.env.NEXT_PUBLIC_PRIVATE_KEY,
  site_key_recaptcha: process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY,
  apiKey: process.env.NEXT_PUBLIC_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_APP_ID,
  measurementId: process.env.NEXT_PUBLIC_MEASUREMENT_ID,
  sipSocket: process.env.NEXT_PUBLIC_SIP_SOCKET,
  generateFile: process.env.NEXT_PUBLIC_FILE_GENRATE_URL,
  login_url: process.env.NEXT_PUBLIC_LOGIN_URL,
  projectUrls: process.env.NEXT_PUBLIC_PROJECT_URLS as string,
  firebase: process.env.NEXT_PUBLIC_FIREBASE as string,
  notification_interval: process.env
    .NEXT_PUBLIC_NOTIFICATION_INTERVAL as string,
  stockUpload: process.env.NEXT_PUBLIC_STOCK_UPLOAD as string,
  pbxUrl: process.env.NEXT_PUBLIC_PBX_URL as string,
  callCount: parseInt(process.env.NEXT_PUBLIC_CALL_COUNT || "0"),
  pbxProxy: process.env.NEXT_PUBLIC_PBX_PROXY as string,
  yandex_api_key: process.env.NEXT_PUBLIC_YANDEX_API_KEY as string,
  taxDeviceConnectInterval: process.env.NEXT_PUBLIC_TAX_DEVICE_CONNECT_INTERVAL
    ? parseInt(process.env.NEXT_PUBLIC_TAX_DEVICE_CONNECT_INTERVAL)
    : 30000,
};
