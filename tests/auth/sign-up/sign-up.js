
import { API_ENDPOINTS } from "../../../utils/constants";

export async function signup(
  request,
  { name, email, password, passwordConfirmation },
) {
  try {
    const response = await request.post(API_ENDPOINTS.AUTH.SIGNUP.REGISTER, {
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      data: {
        name,
        email,
        password,
        password_confirmation: passwordConfirmation,
      },
    });

    const body = await response.json();

    return {
      ok: response.ok(),
      status: response.status(),
      data: body.data,
      errors: body.errors,
    };
  } catch (error) {
    console.log(`Error Occured: ${error}`);
    throw error;
  }
}

export async function verifyEmail(request, { email, code, token }) {
  try {
    const response = await request.post(
      API_ENDPOINTS.AUTH.SIGNUP.VERIFY_EMAIL,
      {
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        data: {
          email,
          verification_code: code,
        },
      },
    );

    const body = await response.json();

    console.log("Verify email response body:", body);

    return {
      ok: response.ok(),
      status: response.status(),
      data: body.data,
      errors: body.errors,
    };
  } catch (error) {
    console.log(`Error Occured: ${error}`);
    throw error;
  }
}