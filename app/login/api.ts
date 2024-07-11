import axios from "axios";

const API_URL = process.env.NEXT_PUBLIC_API_URL_AUTH;
const api = axios.create({
  baseURL: API_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

export const login = async (email: string, password: string) => {
  const response = await api.post("/login", { email, password });
  return response.data;
};
