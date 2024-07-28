import axios from "axios";

const host = process.env.REACT_APP_BACKEND_HOST;

export function login(email, password, rememberMe, controller) {
  const body = { email, password, rememberMe };
  const url = `${host}apiv1/auth/login`;

  return axios.post(url, body, {
    signal: controller.signal,
  });
}

export function register(email, password, phone_number, controller) {
  const body = { email, password, phone_number };
  const url = `${host}apiv1/auth/register`;

  return axios.post(url, body, {
    signal: controller.signal,
  });
}

export function forgotPass(email, newPassword , controller) {
  const body = { email, newPassword };
  const url = `${host}apiv1/auth/forgotPass`;

  return axios.post(url, body, {
    signal: controller.signal,
  });
}

export function verifyResetPass(verify, code, controller) {
  const url = `${host}apiv1/auth/resetPass?verify=${verify}&code=${code}`;

  return axios.get(url, {
    signal: controller.signal,
  });
}

export function resetPass(verify, code, password, controller) {
  const url = `${host}apiv1/auth/resetPass?verify=${verify}&code=${code}`;

  return axios.patch(
    url,
    { newPassword: password },
    {
      signal: controller.signal,
    }
  );
}

export function logoutUser(token) {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  const url = `${host}apiv1/auth/logout`;
  return axios.delete(url, config);
}

export async function sendAuthCode(email, authCodeRef, Mode, controller) {
  const body = { email, authCodeRef, Mode };
  const url = `${host}apiv1/auth/sendAuthCode`;

  try {
    const response = await axios.post(url, body, {
      signal: controller.signal,
    });
    return response.data;
  } catch (error) {
    console.error("Error sending authentication code:", error);
    throw error; // You can handle the error further up the call stack
  }
}
