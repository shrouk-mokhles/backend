import { API_ENDPOINTS } from "../../../utils/constants";
export async function resetPasswordRequest(request, { email }) {
  try {
    const response = await request.post(
      API_ENDPOINTS.AUTH.RESET_PASSWORD.REQUEST_RESET_PASSWORD,
      {
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        data: {
          email: email,
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

export async function resetPasswordCode(request, { email, code }) {
  try {
    const response = await request.post(
      API_ENDPOINTS.AUTH.RESET_PASSWORD.CHECK_RESET_PASSWORD_CODE,
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

export async function resetPassword(
  request,
  { password, passwordconfirmation, code },
) {
  try {
    console.log(password, passwordconfirmation, code);
    const response = await request.post(
      API_ENDPOINTS.AUTH.RESET_PASSWORD.RESET_PASSWORD,
      {
        data: {
          password,
          password_confirmation: passwordconfirmation,
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