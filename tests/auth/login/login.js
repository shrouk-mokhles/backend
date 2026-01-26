import { API_ENDPOINTS } from "../../../utils/constants";

export async function initiateLogin(request, { email, password }) {
  try {
    const response = await request.post(
      API_ENDPOINTS.AUTH.LOGIN.INITIATE_LOGIN,
      {
        data: {
          email: email,
          password: password,
          captcha: "",
        },
      },
    );

    const body = await response.json();

    return {
      ok: response.ok(),
      status: response.status(),
      data: body.data,
    };
  } catch (error) {
    console.log(`Error Occured: ${error}`);
    throw error;
  }
}

export async function completeLogin(request, { email, code }) {
  try {
    const response = await request.post(
      API_ENDPOINTS.AUTH.LOGIN.COMPLETE_LOGIN,
      {
        data: {
          email,
          verification_code: code,
        },
      },
    );
    const body = await response.json();
    return {
      status: response.status(),
      ok: response.ok(),
      data: body.data,
    };
  } catch (error) {
    console.log(`Error Occured: ${error}`);
    throw error;
  }
}