export const USERS = {
  VALID: { EMAIL: "user@test.com", PASSWORD: "12345678" },
  INVALID: {
    EMAIL: "wrong@test.com",
    PASSWORD: "wrongpass",
  },
};

export const API_ENDPOINTS = {
  AUTH: {
    LOGIN: {
      INITIATE_LOGIN: "auth/initiate-login",
      COMPLETE_LOGIN: "auth/complete-login",
    },
  },
};
