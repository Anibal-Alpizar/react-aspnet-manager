import { client } from "./axios";

export const loginRequest = async (formData: FormData) =>
  client.post("usuario/login", formData);

export const signOutRequest = async (token: string) =>
  client.post("usuario/SignOut", null, {
    headers: { Authorization: `Bearer ${token}` },
  });

export const meRequest = async (token: string) => {
  try {
    const response = await client.get("usuario/InformacionUsuario", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const resetPasswordRequest = async (email: string) => {
  try {
    const response = await client.post("usuario/ResetPassword", `"${email}"`, {
      headers: {
        "Content-Type": "application/json",
      },
    });

    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const changePasswordRequest = async (
  email: string,
  resetToken: string,
  newPassword: string
) => {
  try {
    const response = await client.post(
      "usuario/ChangePassword",
      {
        email,
        resetToken,
        newPassword,
      },
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const preRegistrationRequest = async (formData: FormData) => {
  try {
    const response = await client.post("usuario/Preregistration", formData);
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};
