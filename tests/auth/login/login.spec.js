import { test,expect } from "@playwright/test";
import { completeLogin, initiateLogin } from "./login.js";
import { USERS } from "../../../utils/constants";

test.describe("[Login API]",() => {
    // 1. Login Successfully
    test("[Login API] Login Successfly", async ({ request }) => {
        const initiateLoginResponse = await initiateLogin(request, {
          email: USERS.VALID.EMAIL,
          password: USERS.VALID.PASSWORD,
        }); 
        expect(initiateLoginResponse.data).toHaveProperty("code");

        const verificationCode = initiateLoginResponse.data.code;
       const completeLoginResponse= await completeLogin(request, { email: USERS.VALID.EMAIL, code: verificationCode })
        expect(completeLoginResponse.data).toHaveProperty("token");
    });

    });
    // 2.  

    // 3. 
    
    //4. 
