import { API_ENDPOINTS } from "../../../utils/constants";

export async function initiateLogin(request, { email, password }) {
  const response = await request.post(API_ENDPOINTS.AUTH.LOGIN.INITIATE_LOGIN, {
    data: {
      email: email,
      password: password,
      captcha: "",
    },
  });

  if (!response.ok()) {
    const body = await response.text();
    throw new Error(`Login API failed: ${response.status()} - ${body}`);
  }

  return response.json();
}

export async function completeLogin(request, { email, code }) {
  const response = await request.post(API_ENDPOINTS.AUTH.LOGIN.COMPLETE_LOGIN, {
    data: {
      email,
      verification_code: code
    }
});
  
    if (!response.ok()) {
    const body = await response.text();
    throw new Error(`Login API failed: ${response.status()} - ${body}`);
  }

  return response.json();
}
