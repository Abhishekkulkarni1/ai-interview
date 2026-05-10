import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:3000",
  withCredentials: true,
});

export const registerUser = async ({ username, email, password }) => {
  try {
    const response = await api.post("/api/auth/register", {
      username,
      email,
      password,
    });
    return response.data;
  } catch (error) {
    console.log(error, "Error occured while registering the user");
  }
};

export const loginUser = async ({ username, email, password }) => {
  try {
    const response = await api.post("/api/auth/login", {
      username,
      email,
      password,
    });
    return response.data;
  } catch (error) {
    console.log(error, "Error occured while logging in the user");
  }
};

export const logoutUser = async () => {
  try {
    const response = await api.get("/api/auth/logout");
    return response.data;
  } catch (error) {
    console.log(error, "Error occured while logging out the user");
  }
};

export const userDetails = async () => {
  try {
    const response = await api.get("/api/auth/userDetails");
    return response.data;
  } catch (error) {
    console.log(error, "Error occured while getting user details");
  }
};
