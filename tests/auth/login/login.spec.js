import { test, expect } from "@playwright/test";
import { completeLogin, initiateLogin } from "./login.js";
import { USERS } from "../../../utils/constants";

test.describe.serial("[Login API]", () => {
  test("Login Successfly", async ({ request }) => {
    const initiateLoginResponse = await initiateLogin(request, {
      email: USERS.VALID.EMAIL,
      password: USERS.VALID.PASSWORD,
    });
    expect(initiateLoginResponse.data).toHaveProperty("code");

    const verificationCode = initiateLoginResponse.data.code;
    const completeLoginResponse = await completeLogin(request, {
      email: USERS.VALID.EMAIL,
      code: verificationCode,
    });
    expect(completeLoginResponse.data).toHaveProperty("token");
  });

  test("Invalid Credentials", async ({ request }) => {
    const initiateLoginResponse = await initiateLogin(request, {
      email: USERS.INVALID.EMAIL,
      password: USERS.INVALID.PASSWORD,
    });
    expect(initiateLoginResponse.status).toBe(422);
  });

  test("Missing Fields", async ({ request }) => {
    const initiateLoginResponse = await initiateLogin(request, {
      email: "",
      password: "",
    });
    expect(initiateLoginResponse.status).toBe(422);
  });

  test("Wrong or Expired OTP", async ({ request }) => {
    await initiateLogin(request, {
      email: USERS.VALID.EMAIL,
      password: USERS.VALID.PASSWORD,
    });

    const completeLoginResponse = await completeLogin(request, {
      email: USERS.VALID.EMAIL,
      code: "000000",
    });
    expect(completeLoginResponse.status).toBe(404);
  });

  test("Empty OTP", async ({ request }) => {
    await initiateLogin(request, {
      email: USERS.VALID.EMAIL,
      password: USERS.VALID.PASSWORD,
    });

    const completeLoginResponse = await completeLogin(request, {
      email: USERS.VALID.EMAIL,
      code: "",
    });
    expect(completeLoginResponse.status).toBe(422);
  });
});

