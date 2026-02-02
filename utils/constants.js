export const USERS = {
  VALID: { EMAIL: "user@test.com", PASSWORD: "12345678" },
  INVALID: {
    EMAIL: "wrong@test.com",
    PASSWORD: "wrongpass",
  },
  RANDOM_EMAIL: `user_${Date.now()}@test.com`,
  PASSWORDS: {
    MISSING_LOWERCASE: "WELCOME2CREIDEN",
    MISSING_UPPERCASE: "welcome2creiden",
    MISSING_DIGIT: "Welcomecreiden*",
    MISSING_SPECIAL_CHAR: "Welcome2creiden",
    VALID_PASSWORD: "Welcome2creiden*",
  },
  VALID_NAME: "test user",
  INVALID_NAME_NUMBERS: "12344",
  INVALID_NAME_SPECIALCHARACTERS: "*&^&*",
};

export const API_ENDPOINTS = {
  AUTH: {
    LOGIN: {
      INITIATE_LOGIN: "auth/initiate-login",
      COMPLETE_LOGIN: "auth/complete-login"
    },
    SIGNUP: {
      REGISTER:"auth/register",
      VERIFY_EMAIL: "users/verify_mail",
    },
  },
};


