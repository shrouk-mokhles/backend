import { test, expect } from "@playwright/test";
import {
  resetPassword,
  resetPasswordRequest,
  resetPasswordCode,
} from "./reset-password";
import { USERS } from "../../../utils/constants";

test.describe.serial("[Reset Password]", () => {
  test("Reset password Successfully", async ({ request }) => {
    const passwordRequsetResponse = await resetPasswordRequest(request, {
      email: "shrouk.mokhles@creiden.com",
    });

    expect(passwordRequsetResponse.ok).toBeTruthy();

    const OTP = passwordRequsetResponse.data.code;

    const verifyResponse = await resetPasswordCode(request, {
      email: "shrouk.mokhles@creiden.com",
      code: OTP,
    });
    expect(verifyResponse.ok).toBeTruthy();

    const resetpasswordResponse = await resetPassword(request, {
      password: USERS.PASSWORDS.VALID_PASSWORD,
      passwordconfirmation: USERS.PASSWORDS.VALID_PASSWORD,
      code: OTP,
    });
    console.log(resetpasswordResponse.data.errors);
    expect(resetpasswordResponse.ok).toBeTruthy();
  });

    test("Reset With Unregistered Email", async ({ request }) => {
      const passwordRequsetResponse = await resetPasswordRequest(request, {
        email: "shrouk.mokhleSs@creiden.com",
      });

      expect(passwordRequsetResponse.status).toBe(422);
    });
  
  test("empty Email field", async ({ request }) => {
    const passwordRequsetResponse = await resetPasswordRequest(request, {
      email: "",
    });

    expect(passwordRequsetResponse.status).toBe(422);
  });
  
   test("Reset With invalid otp", async ({ request }) => {
     const passwordRequsetResponse = await resetPasswordRequest(request, {
       email: "shrouk.mokhles@creiden.com",
     });
     expect(passwordRequsetResponse.ok).toBeTruthy();

     const verifyResponse = await resetPasswordCode(request, {
       email: "shrouk.mokhles@creiden.com",
       code: "888888",
     });
     

     expect(verifyResponse.status).toBe(401);
   });
  
   test("empty otp field", async ({ request }) => {
     const passwordRequsetResponse = await resetPasswordRequest(request, {
       email: "shrouk.mokhles@creiden.com",
     });
     expect(passwordRequsetResponse.ok).toBeTruthy();

     const verifyResponse = await resetPasswordCode(request, {
       email: "shrouk.mokhles@creiden.com",
       code: "",
     });

     expect(verifyResponse.status).toBe(422);
   });
  
   test("The password confirmation does not match", async ({request,
   }) => {
     const passwordRequsetResponse = await resetPasswordRequest(request, {
       email: "shrouk.mokhles@creiden.com",
     });

     expect(passwordRequsetResponse.ok).toBeTruthy();

     const OTP = passwordRequsetResponse.data.code;

     const verifyResponse = await resetPasswordCode(request, {
       email: "shrouk.mokhles@creiden.com",
       code: OTP,
     });
     expect(verifyResponse.ok).toBeTruthy();

     const resetpasswordResponse = await resetPassword(request, {
       password: USERS.PASSWORDS.VALID_PASSWORD,
       passwordconfirmation: "Wlcome2creiden***",
       code: OTP,
     });
     expect(resetpasswordResponse.status).toBe(422);
   });
});
