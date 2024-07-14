import axios from "axios";

const API_URL = process.env.NEXT_PUBLIC_API_URL_AUTH;
const API_URL_DOMAINS_ASSIGNED = process.env.NEXT_PUBLIC_DOMAINS_ASSIGNED;
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

export const getDomain = async () => {
  const token = localStorage.getItem('token');
  const response = await axios.get(`${API_URL_DOMAINS_ASSIGNED}`, {
    headers: {
      'Authorization': `Bearer ${token}`,
    },
  });
  return response.data;
};