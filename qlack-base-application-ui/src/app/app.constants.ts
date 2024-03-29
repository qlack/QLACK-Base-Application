export const AppConstants = {
  // The name of the JWT key in local storage.
  JWT_STORAGE_NAME: "qlack-base-application-ui",

  // The date format to use.
  DATETIME_FORMAT: "yyyy-MM-dd HH:mm:ss",
  DATE_FORMAT: "yyyy-MM-dd",

  // The root URL of the API.
  API_ROOT: "/api",

  // The claims available in JWT.
  jwt: {
    claims: {
      EMAIL: "email"
    }
  },

  // A reserved word to be used in place of an ID to indicate a new record creation.
  NEW_RECORD_ID: "new",

  // Language settings.
  DEFAULT_LANGUAGE: "en",

  // Local storage keys.
  LOCAL_STORAGE_THEME: "theme",
  LOCAL_STORAGE_SIDEBAR: "sidebar"
};
