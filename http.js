import { config } from "./config.js";
const { SERVER_API } = config;
export const requestLogin = async (data) => {
  try {
    const response = await fetch(`${SERVER_API}/auth/login`, {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify(data),
    });
    if (!response.ok) {
      throw new Error("Unauthenticated");
    }
    return response.json();
  } catch {
    return false;
  }
};
