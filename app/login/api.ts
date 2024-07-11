// services/api.ts
import axios from "axios";

const API_URL = process.env.NEXT_PUBLIC_API_URL; // Utilizamos NEXT_PUBLIC_API_URL para las variables de entorno públicas en Next.js

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
