import { test, expect } from "@playwright/test";
import { signup, verifyEmail } from "./sign-up";
import { USERS } from "../../../utils/constants";

test.describe.serial("[Sign Up API]", () => {
  test("Sign Up Successfully", async ({ request }) => {
    const email = USERS.RANDOM_EMAIL;

    const signupResponse = await signup(request, {
      name: USERS.VALID_NAME,
      email: USERS.RANDOM_EMAIL,
      password: USERS.PASSWORDS.VALID_PASSWORD,
      passwordConfirmation: USERS.PASSWORDS.VALID_PASSWORD,
    });

    expect(signupResponse.ok).toBeTruthy();
    expect(signupResponse.data).toHaveProperty("code");

    const OTP = signupResponse.data.code;
    const TOKEN = signupResponse.data.token;

    const verifyResponse = await verifyEmail(request, {
      email: USERS.RANDOM_EMAIL,
      code: OTP,
      token: TOKEN,
    });
    expect(verifyResponse.ok).toBeTruthy();
  });

  test("signup WITH wrong email", async ({ request }) => {
    const signupResponse = await signup(request, {
      name: USERS.VALID_NAME,
      email: "shrouk.com",
      password: USERS.PASSWORDS.VALID_PASSWORD,
      passwordConfirmation: USERS.PASSWORDS.VALID_PASSWORD,
    });

    expect(signupResponse.status).toBe(422);
  });

  test("SIGNUP WITH INVALID PASSWORD", async ({ request }) => {
    const signupResponse = await signup(request, {
      name: USERS.VALID_NAME,
      email: "shrouk.com",
      password: USERS.INVALID.PASSWORD,
      passwordConfirmation: USERS.INVALID.PASSWORD,
    });

    expect(signupResponse.status).toBe(422);
  });

  test("SIGNUP WITH EMPTY FIELDS ", async ({ request }) => {
    const signupResponse = await signup(request, {
      name: "",
      email: "",
      password: "",
      passwordConfirmation: "",
    });

    expect(signupResponse.status).toBe(422);
  });

  test("SIGNUP WITH INVALID NAME", async ({ request }) => {
    const email = USERS.RANDOM_EMAIL;

    const signupResponse = await signup(request, {
      name: USERS.INVALID_NAME_NUMBERS,
      email,
      password: USERS.PASSWORDS.VALID_PASSWORD,
      passwordConfirmation: USERS.PASSWORDS.VALID_PASSWORD,
    });

    expect(signupResponse.status).toBe(422);

    const signupResponseWithSpecialCharecters = await signup(request, {
      name: USERS.INVALID_NAME_SPECIALCHARACTERS,
      email,
      password: USERS.PASSWORDS.VALID_PASSWORD,
      passwordConfirmation: USERS.PASSWORDS.VALID_PASSWORD,
    });

    expect(signupResponseWithSpecialCharecters.status).toBe(422);
  });
});
