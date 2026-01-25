export const USERS = {
  VALID: { EMAIL: "user@test.com", PASSWORD: "12345678" },
  INVALID: {
    EMAIL: "wrong@test.com",
    PASSWORD: "wrongpass",
  },
};

import dotenv from "dotenv";
dotenv.config();

const BASE_URL = process.env.API_BASE_URL;

export const API_ENDPOINTS = {
  AUTH: {
    LOGIN: {
      INITIATE_LOGIN: `${BASE_URL}/auth/initiate-login`,
      COMPLETE_LOGIN: `${BASE_URL}/auth/complete-login`,
    },
  },
};

