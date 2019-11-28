export const AppConstants = {
  // The name of the JWT key in local storage.
  JWT_STORAGE_NAME: 'qlack-base-application-ui_platform',

  // The date format to use.
  DATE_FORMAT: 'yyyy-MM-dd HH:mm:ss',

  // The root URL of the API.
  API_ROOT: '/api',
  API_SECURED_ROOT: 'api/secured',

  // The claims available in JWT.
  jwt: {
    claims: {
      USERNAME: 'sub'
    }
  },

  // User statuses.
  USER_STATUS: {
    DISABLED: 0,
    ENABLED: 1
  },

  // Available formatters for field values.
  FIELD_VALUE_FORMATTER: {
    DATE_SHORT: "DATE_SHORT",
    DATE_MEDIUM: "DATE_MEDIUM",
    DATE_LONG: "DATE_LONG",
    DATETIME_SHORT: "DATETIME_SHORT",
    DATETIME_MEDIUM: "DATETIME_MEDIUM",
    DATETIME_LONG: "DATETIME_LONG",
    DURATION_MSEC: "DURATION_MSEC",
    BYTES_TO_MB: "BYTES_TO_MB",
    BYTES_TO_GB: "BYTES_TO_GB",
    FAHRENHEIT_TO_CELCIUS: "FAHRENHEIT_TO_CELCIUS",
    CELCIUS_TO_FAHRENHEIT: "CELCIUS_TO_FAHRENHEIT",
  }
};

